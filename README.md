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

### Python library (necessary)
Use one of these two commands to install the python part:
```bash
# recommended as soon as published to PyPI
pip install vipster-jupyter
# for development versions or as long as it is in alpha-stage
git clone https://github.com/sgsaenger/vipsterview
cd vipsterview
pip install .
```

### Jupyter Notebook extension (if needed)
To use the widgets in `jupyter notebook` (that is, the classical notebook interface),
install the nbextension:

```bash
jupyter nbextension enable vipsterview --py
```

### JupyterLab extension (if needed)

For the `jupyter lab` interface, a separate extension needs to be installed:

```bash
jupyter labextension install vipster-js-widget
```

**Note**:
As long as this is in alpha and not published to NPM, execute this command in the checked out git folder.

**Note**:
It may be necessary to execute this with `sudo`, depending on how you installed JupyterLab.
Be careful!
Make sure you trust this extension!

**Note**
It may also be useful to clean yarn caches after building.
Check e.g. `~/.cache/yarn` and `/usr/local/share/.cache/yarn`.
