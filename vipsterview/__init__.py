from .widget import vpWidget

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'vipster-js-widget',
        'require': 'vipster-js-widget/extension'
    }]
