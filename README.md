[![Travis-CI Build Status](https://travis-ci.org/DCMSstats/eegva.svg?branch=master)](https://travis-ci.org/DCMSstats/eegva)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/DCMSstats/eegva?branch=master&svg=true)](https://ci.appveyor.com/project/DCMSstats/eegva)
[![Coverage Status](https://img.shields.io/codecov/c/github/DCMSstats/eegva/master.svg)](https://codecov.io/github/DCMSstats/eegva?branch=master)
[![GitHub release](https://img.shields.io/github/release/DCMSstats/eegva.svg)](https://github.com/DCMSstats/eeegva/releases)
<img src="https://github.com/ukgovdatascience/rap_companion/raw/master/images/rap_hex.png" align="right" width="150" height="150"/>
# Reproducible Analytical Pipeline
### DCMS Sector Ecomonic Estimates: GVA
https://www.gov.uk/government/collections/dcms-sectors-economic-estimates

## Quick Start
Below is a quick guide to producing output with the package.

## About
This package is part of GDS's [RAP](https://ukgovdatascience.github.io/rap_companion/) (Reproducible Analytical Pipeline) initiative, which aims to create higher quality data analysis pipelines within government.

The code is published in the [open](https://www.gov.uk/service-manual/technology/making-source-code-open-and-reusable), and aligns with the [Open Government National Action Plan](https://www.gov.uk/government/publications/uk-open-government-national-action-plan-2016-18/uk-open-government-national-action-plan-2016-18). This helps make the information provided in statistical publications more transparent, for example by sharing how anonymisation and rounding has taken place.

This repo follows a template that that is suitable for most python projects in the department, providing consistency across repos. The package template is loosely based on the [Cookiecutter Data Science](https://drivendata.github.io/cookiecutter-data-science/) template. The package is structured to be modular, to allow code to be more easily maintained and reused - see [here](https://realpython.com/python-modules-packages/) for more explanation.

In this repo we use a [Jupyter](http://jupyter.org/) notebook for each publication to run the package source code and create the publications's outputs. Jupyter benefits include:
* Easy visualisation and documentation for [literate programming](https://en.wikipedia.org/wiki/Literate_programming).
* Adoption by most tech companies, including: [Google](https://cloud.google.com/datalab/) [(also)](https://research.google.com/colaboratory/), Microsoft, Bloomberg, [Netflix](https://medium.com/@NetflixTechBlog/notebook-innovation-591ee3221233), [IBM](https://www.ibm.com/cloud/pixiedust)

### Design philosophy/requirements:
* Reproducibility  
  Individual notebooks or scripts that can be rerun to accurately reproduce ALL outputs for ANY given publication. Recording version number for where breakding changes are made to code and version number is incremented. For example provide requirements.txt specifying what packages are used.
* Testing  
  Functionality to confirm that previous publication outputs can be accurately reproduced, and alterting when a breaking change has been made, requiring an increment in version number.
* Outputs
  Functionality to produce excel, csv, html/pdf, outputs.
* Simplicity
  Make project as simple as possible in order to make it as easy as possible be understood users and get up to speed.
* Reliability
  Ensure publication code can be reliably run by users without errors. Use best practices to improve reliability of code, for example using code that will work across operating systems.
* Modularisation
  Make code modular to allow code to be more easily maintained and reused. This includes splitting code different purposes into separate scripts, e.g. testing code in a separate script. Also, where sensible, break code with scripts into functions
* Safety/security
  Remove the posibility of commiting sensitive data to the public github repository. 
  Cases:
   * Committing raw data excel file: Designing the repo so that the sensitive data is referenced in place rather than copied to the repo itself, and git ignoring all xlsx and xls files unless specifically exempt.
   * Including sensitive data as output cells in jupyter notebooks. Currently, this relies on users not printing out sensitive data to output cells and then commiting the notebook with the output cells. The output in ouput cells is clearly displayed in notebooks so this is easily avoided, however, still relies on the user which is not ideal. In future implementations, git hooks could be used to ensure [output is stripped from notebooks](https://github.com/kynan/nbstripout) on commit, however a more sophisticated implementation of the repo will be necessary to ensure git hooks are used, probably using [docker](https://www.docker.com/)
   * Including sensitve data in aggregate data csv. The data in this file should be at sector level and anonymised, however it is still conceiveably possible to include senstive sic level data in the csv which is then committed to the repo. As with the previous point, the same QA checks that are usually applied to statistical publications before they are published, can be applied here. Also, code can be written that will check the form of the data and stop the code with and error before the CSV is written, reducing the chance of creating and then comitting a CSV containing sensitive data.
<!--- https://conferences.oreilly.com/jupyter/jup-ny/public/schedule/detail/69986 --->

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


