#!/usr/bin/env python
# coding: utf-8

import vipster as vp
import re
import json

from ipywidgets import DOMWidget, register

from traitlets import Unicode, validate, TraitError, Any


def mol_from_json(val, widget):
    val = json.loads(val)
    if type(val) is dict and len(val) == 1:
        if "idx" in val:
            return (widget.mol[0], int(val['idx']))
    return widget.mol


@register
class vpWidget(DOMWidget):
    _view_name = Unicode('VipsterView').tag(sync=True)
    _view_module = Unicode('vipster-js-widget').tag(sync=True)
    _view_module_version = Unicode('0.1.3').tag(sync=True)
    _json_config = vp.Presets[vp.Plugins.json]['default']
    _json_config['trajectory'] = False
    _json_config['cell'] = True
    _json_config['bonds'] = True
    _json_config['fmt'] = 'active'
    _json_config['elements'] = 'all'

    mol = Any((vp.Molecule(), 0), help="The rendered step", allow_none=False)\
        .tag(sync=True,
             from_json=mol_from_json,
             to_json=lambda value, widget:
                 '{{"step": "{}", "idx": {}, "len": {}}}'.format(
                     re.sub('"', '\\"',
                            vp.writeString(vp.Plugins.json,
                                           molecule=value[0],
                                           index=value[1],
                                           config=vpWidget._json_config)),
                     value[1], len(value[0])))

    @validate('mol')
    def _valid_value(self, proposal):
        tmp = proposal['value']
        if(type(tmp) is tuple and len(tmp) == 2
           and type(tmp[0]) in (vp.Molecule, vp.Step)
           and type(tmp[1]) == int):
            mol = vp.Molecule(tmp[0])
            if tmp[1] >= len(mol):
                raise TraitError("Step index out of range")
            return (mol, *tmp[1:])
        elif type(tmp) in (vp.Molecule, vp.Step):
            mol = vp.Molecule(tmp)
            return (mol, len(mol) - 1)
        else:
            raise TraitError("Invalid value for Molecule")
