# Jupyter widget for Vipster

A [Jupyter](http://jupyter.org) widget to interactively visualize molecular structures loaded by [Vipster](https://github.com/sgsaenger/vipster).
Currently supports the python bindings via IPython.

## How to use

Open a python-based notebook and try the following code

```python
import vipster as vp # load regular vipster bindings
from vipsterview import vpWidget # widget for visualization
mol = vp.Molecule(*args) # create a Molecule instance
view = vpWidget(mol=mol) # create a Widget instance displaying `mol`
view # trigger display
```

## Installation

### Python library (necessary)
This is not published on PyPI, so please install from git:
```bash
# direct install:
pip install git+https://github.com/sgsaenger/vipsterview
# from local repo:
git clone https://github.com/sgsaenger/vipsterview
cd vipsterview
pip install .
```

### Jupyter Notebook extension
To use the widgets in `jupyter notebook` (that is, the classical notebook interface),
install the python library and then activate the nbextension:

```bash
jupyter nbextension enable vipsterview --py
```

### JupyterLab extension

For the `jupyter lab` interface, a separate extension needs to be installed:

```bash
jupyter labextension install vipster-js-widget
```

**Note**:
It may be necessary to execute this with `sudo`, depending on how you installed JupyterLab.
Be careful!
Make sure you trust this extension!

**Note**
It may also be useful to clean yarn caches after building.
Check e.g. `~/.cache/yarn` and `/usr/local/share/.cache/yarn`.
