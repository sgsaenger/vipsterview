# coding=utf-8

from setuptools import setup


setup(name="vipsterview",
      version="0.1.4",
      author="Sebastian Gsänger",
      url="https://github.com/sgsaenger/vipsterview",
      description="Jupyter integration for Vipster",
      classifiers=[
          "Development Status :: 3 - Alpha",
          "Intended Audience :: Science/Research",
          "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
          "Framework :: Jupyter",
          "Programming Language :: C++",
          "Programming Language :: Javascript",
          "Programming Language :: Python :: 3",
          "Programming Language :: Python :: 3.6",
          "Programming Language :: Python :: 3.7",
          "Programming Language :: Python :: 3.8",
          "Topic :: Multimedia :: Graphics",
          "Topic :: Scientific/Engineering :: Chemistry",
          "Topic :: Scientific/Engineering :: Physics",
          "Topic :: Scientific/Engineering :: Visualization",
      ],
      data_files=[('share/jupyter/nbextensions/vipster-js-widget', [
          'vipsterview/static/extension.js'
      ])],
      install_requires=['vipster>=1.19'],
      packages=['vipsterview'],
      python_requires='>=3.6',
      keywords=['chemistry'],
      license="GPL",
      )
