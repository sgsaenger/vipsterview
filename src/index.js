import { DOMWidgetView } from '@jupyter-widgets/base';
import Module from 'vipster';

// load emscripten module
var Vipster = {};
Module().then(function(m){Vipster = m;});

var VipsterView = DOMWidgetView.extend({
    render: function() {
        // wait until emscripten runtime is ready
        if(Vipster.Molecule === undefined){
            setTimeout(this.render.bind(this), 500);
        }else {
            this.render_actual();
        }
    },

    render_actual: function() {
        // containing div
        this.container = document.createElement("div");
        this.container.style.width = "500px";
        this.container.style.height = "300px";
        this.container.style.border = "black solid 1px";
        this.container.style.overflow = "hidden";
        this.container.style.resize = "both";
        this.container.style.position = "relative";
        this.el.appendChild(this.container);
        // canvas
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas" + ++count;
        this.container.appendChild(this.canvas);
        // step slider
        this.slide = document.createElement("input");
        this.slide.type = "range";
        this.slide.step = 1;
        this.slide.min = 0;
        this.slide.max = 0;
        this.slide.style.width = "100%";
        this.slide.style.position = "absolute";
        this.slide.style.top = "0px";
        this.slide.oninput = this.idx_changed.bind(this);
        this.container.appendChild(this.slide);
        // register resize handler
        this.ro = new ResizeObserver(entries => {
            entries.forEach(entry => {
                let container = entry.target;
                let canvas = container.children[0];
                let slide = container.children[1];
                canvas.style.width = container.clientWidth+"px";
                canvas.style.height = container.clientHeight+"px";
            });
        });
        this.ro.observe(this.container);
        // register state handler
        this.model.on("change:mol", this.mol_changed, this);
        // initialize with current molecule
        this.state = JSON.parse(this.model.get("mol"));
        this.mol = new Vipster.Molecule(this.state.step);
        this.slide.max = this.state.len-1;
        this.slide.value = this.state.idx;
        if(this.state.len <= 1){
            this.slide.style.display = "none";
        }else {
            this.slide.style.display = "block";
        }
        // create and setup view
        window.requestAnimationFrame(()=>{
            this.view = new Vipster.VipsterView("#"+this.canvas.id);
            if(!this.mol.getStep(0).hasBonds()){
                this.mol.getStep(0).setBonds();
            }
            this.view.setStep(this.mol.getStep(0));
        });
    },

    idx_changed: function() {
        this.model.set("mol", `{"idx": ${parseInt(this.slide.value)}}`);
        this.model.save_changes();
    },

    mol_changed: function() {
        let tmp = JSON.parse(this.model.get("mol"));
        if ("step" in tmp) {
            this.state.step = tmp.step;
            this.mol.delete();
            this.mol = new Vipster.Molecule(this.state.step);
            if(!this.mol.getStep(0).hasBonds()){
                this.mol.getStep(0).setBonds();
            }
        }
        if ("len" in tmp){
            this.state.len = tmp.len;
            this.slide.max = this.state.len-1;
            if(this.state.len <= 1){
                this.slide.style.display = "none";
            }else {
                this.slide.style.display = "block";
            }
        }
        if ("idx" in tmp){
            this.state.idx = tmp.idx;
            this.slide.value = this.state.idx;
        }
        this.view.setStep(this.mol.getStep(0));
    },
});

var count = 0;

export { VipsterView };
