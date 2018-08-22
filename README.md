[![Travis-CI Build Status](https://travis-ci.org/DCMSstats/eegva.svg?branch=master)](https://travis-ci.org/DCMSstats/eegva)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/DCMSstats/eegva?branch=master&svg=true)](https://ci.appveyor.com/project/DCMSstats/eegva)
[![Coverage Status](https://img.shields.io/codecov/c/github/DCMSstats/eegva/master.svg)](https://codecov.io/github/DCMSstats/eegva?branch=master)
[![GitHub release](https://img.shields.io/github/release/DCMSstats/eegva.svg)](https://github.com/DCMSstats/eeegva/releases)
<img src="man/figures/rap_hex.png" align="right" width="150" height="150"/>
# Reproducible Analytical Pipeline
### DCMS Sector Ecomonic Estimates: GVA
https://www.gov.uk/government/collections/dcms-sectors-economic-estimates

## Quick Start
Below is a quick guide to producing output with the package.

## About
this package is part of GDS's RAP initiative, to create higher quality data pipelines within government.

The package makes use of notebooks for litterate programming and easy visualisation, an approach also taken by large tech companies such as netflix https://medium.com/@NetflixTechBlog/notebook-innovation-591ee3221233

This package follows a template that that is suitable for most python projects in the department. This means that whilst the structure may seem overkill for smaller projects, it all allows for consistency across ALL project. The package template is loosely based on the cookiecutter data science template.

The code is published in the open, in accordance with the open governement iniative.

The package is designed to be modular - see https://realpython.com/python-modules-packages/ for an explanation.

### Functionality requirements:
save individual scripts that can be rerun to reproduce ALL outputs for ANY given publication. Recording version number for where breakding changes are made to code and version number is incremented.
tests - to confirm that previous publication outputs can be accurately reproduced, and alterting when a breaking change has been made, requiring an increment in version number
python environment - requirements.txt specifying what packages are used - necessary for testing accuracy.
outputs - produce excel, csv, html and api/function outputs

### other requirements:
reliability and simplicity - as simple as possible in order to be understood by less technical users
modularisation
version controlling
debugging
unit/integration testing
literate programming, transparency, clean code - ideally presenting code logic in jupyter notebook with markdown cells explaining logic.
removing the posibility of commiting sensitive data to the public github repository - https://conferences.oreilly.com/jupyter/jup-ny/public/schedule/detail/69986

### Approach

want to use the same code (source code) each year, but with different inputs

everything that is distributed as part of the package, eg lookups, are defined in python scripts and imported to the publication notebooks. anything that is not distributed in the package like raw data, or is specific to that publication, like what tables to make, is defined in the notebook.

We want the same code to be used for each publication (where reasonable) so that we can be sure the same methodology/calculation is used for every publication. We will then use a jupyter notebook to import the functionality from the code and run it, with documentation. However, each publication might require different outputs, input variables, and documenting, so we need a different notebook for each publication.


#### Future developments
use docker to allow sharing of config files e.g.jupyter_notebook_config.py which would allow for things like automatically creating .py scripts upon .ipynb saves, and safety measure to be put in place. Also it will remove the need for users to install packages or set up virtual environments. Also can have jupyterlab image hosted on GCP so users can remote in without needing ANY software installed locally.

The main functionality is kept in python scripts for reliablity, version controlling, easy debugging, and unit/integration testing. Notebooks are used for documenting and explaining functionality and import the functionality from python scripts to avoid needing to duplicate code.

## Using the package
In most cases, users will want to clone the package so that they add updates to the package and save the changes to github. For following steps should be used as a workflow for making updates to the package.

1. clone the repository. 
Navigate to the folder where you want to store the repo on your machine. For Windows


Installation
Running - To simple run the code
pip install gva



Useage
either run make_publication 2016
or
open walkthrough.ipynb and run cells

## Description of the contents of this repo
### README.md
It is convention to include this markdown document in repositories to provide an explanation of the repo. Also, for repos hosted on Github, the README is rendered and displayed on the repo's page (this is what you are reading!). For the most part, markdown syntax is universal, however there are different implementations with slight difference. Github uses (Github Flavored Markdown)[https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet].

### .gitignore

### src/
This directory contains the packages source code.

### publications/
This directory contains different folders for each publication. Within the individual publication folders are the jupyter notebook used to run the source code in src and create the various outputs for that publication. There is also a copy of the notebook as a regular python script, this is to make it more simple to run the tests in the tests/ folder. The test/ folder contains tests which check that when the publication script is run, it matches the previously produced outputs for the publications. This is useful for when we update the source code, we can check that the code will still accurately reproduce outputs for previous publications.


