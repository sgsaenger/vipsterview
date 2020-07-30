# Jupyter widget for Vipster

**NOTE: Alpha-release**
Please ensure you are using the latest `testing` branch of vipster to be compatible with this project.

A [Jupyter](http://jupyter.org) widget to interactively visualize molecular structures loaded by [Vipster](https://github.com/sgsaenger/vipster).
Currently supports the python bindings via IPython.

## How to use

Open a python-based notebook and try the following code

```python
import vipster as vp # load regular vipster bindings
from vipster-jupyter import vpWidget # widget for visualization
mol = vp.Molecule(*args) # create a Molecule instance
view = vpWidget(mol=mol) # create a Widget instance displaying `mol`
view # trigger display
```

## Installation

```
pip install vipster-jupyter
jupyter nbextension install vipster-jupyter --py
```
