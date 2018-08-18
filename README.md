# gva

about
this package is part of GDS's RAP initiative, to create higher quality data pipelines within government.

The package makes use of notebooks for litterate programming and easy visualisation, an approach also taken by large tech companies such as netflix https://medium.com/@NetflixTechBlog/notebook-innovation-591ee3221233

This package follows a template that that is suitable for most python projects in the department. This means that whilst the structure may seem overkill for smaller projects, it all allows for consistency across ALL project. The package template is loosely based on the cookiecutter data science template.

The package is designed to be modular - see https://realpython.com/python-modules-packages/ for an explanation.

Functionality requirements:
save individual scripts that can be rerun to reproduce ALL outputs for ANY given publication. Recording version number for where breakding changes are made to code and version number is incremented.
tests - to confirm that previous publication outputs can be accurately reproduced, and alterting when a breaking change has been made, requiring an increment in version number
python environment - requirements.txt specifying what packages are used - necessary for testing accuracy.
outputs - produce excel, csv, html and api/function outputs


other requirements:
reliability and simplicity - as simple as possible in order to be understood by less technical users
modularisation
version controlling
debugging
unit/integration testing
literate programming, transparency, clean code - ideally presenting code logic in jupyter notebook with markdown cells explaining logic.
removing the posibility of commiting sensitive data to the public github repository - https://conferences.oreilly.com/jupyter/jup-ny/public/schedule/detail/69986

solution: keep code in

future:
use docker to allow sharing of config files e.g.jupyter_notebook_config.py which would allow for things like automatically creating .py scripts upon .ipynb saves, and safety measure to be put in place. Also it will remove the need for users to install packages or set up virtual environments. Also can have jupyterlab image hosted on GCP so users can remote in without needing ANY software installed locally.

The main functionality is kept in python scripts for reliablity, version controlling, easy debugging, and unit/integration testing. Notebooks are used for documenting and explaining functionality and import the functionality from python scripts to avoid needing to duplicate code.

The code is published in the open, in accordance with the open governement iniative.

Installation
Running - To simple run the code
pip install gva

Development - if you need to update/make changes to the code
git clone ...


Useage
either run make_publication 2016
or
open walkthrough.ipynb and run cells
