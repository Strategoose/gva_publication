[![Travis-CI Build Status](https://travis-ci.org/DCMSstats/eegva.svg?branch=master)](https://travis-ci.org/DCMSstats/eegva)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/DCMSstats/eegva?branch=master&svg=true)](https://ci.appveyor.com/project/DCMSstats/eegva)
[![Coverage Status](https://img.shields.io/codecov/c/github/DCMSstats/eegva/master.svg)](https://codecov.io/github/DCMSstats/eegva?branch=master)
[![GitHub release](https://img.shields.io/github/release/DCMSstats/eegva.svg)](https://github.com/DCMSstats/eeegva/releases)
<img src="https://github.com/ukgovdatascience/rap_companion/raw/master/images/rap_hex.png" align="right" width="150" height="150"/>
# Reproducible Analytical Pipeline
### DCMS Sector Ecomonic Estimates: GVA
https://www.gov.uk/government/collections/dcms-sectors-economic-estimates

## About
This package is part of GDS's [RAP](https://ukgovdatascience.github.io/rap_companion/) (Reproducible Analytical Pipeline) initiative, which aims to create higher quality data analysis pipelines within government.

The code is published in the [open](https://www.gov.uk/service-manual/technology/making-source-code-open-and-reusable), and aligns with the [Open Government National Action Plan](https://www.gov.uk/government/publications/uk-open-government-national-action-plan-2016-18/uk-open-government-national-action-plan-2016-18). This helps make the information provided in statistical publications more transparent, for example by sharing how anonymisation and rounding has taken place.

This repo follows a template that that is suitable for most python projects in the department, providing consistency across repos. The package template is loosely based on the [Cookiecutter Data Science](https://drivendata.github.io/cookiecutter-data-science/) template. The package is structured to be modular, to allow code to be more easily maintained and reused - see [here](https://realpython.com/python-modules-packages/) for more explanation.

In this repo we use a [Jupyter](http://jupyter.org/) notebook for each publication to run the package source code and create the publications's outputs. Jupyter benefits include:
* Easy visualisation and documentation for [literate programming](https://en.wikipedia.org/wiki/Literate_programming).
* Adoption by most tech companies, including: [Google](https://cloud.google.com/datalab/) [(also)](https://research.google.com/colaboratory/), Microsoft, Bloomberg, [Netflix](https://medium.com/@NetflixTechBlog/notebook-innovation-591ee3221233), [IBM](https://www.ibm.com/cloud/pixiedust)

## Using the package
In most cases, users will want to clone the package so that they add updates to the package and save the changes to github. For following steps should be used as a workflow for making updates to the package.

#### Clone the repository
1. Install [Git](https://git-scm.com/downloads)
1. Navigate to the folder where you want to store the repo on your machine. For Windows users - open the 'Git Bash' application, for Mac users open the terminal. Then use pwd to find the current directory, ls to display the folders within the current directory, and cd to enter one of those directories, then pwd again to confirm the new current directory. For example:
   ```bash
   user$ pwd
   C:/user.name/documents/
   user$ ls
   myprojects/ otherfolder/ anotherfolder/
   user$ cd myprojects/
   user$ pwd
   C:/user.name/documents/myprojects/
   ```
   This shows sucessfully navigating to the myprojects/ directory. 
 1. Download the repo from github using by running:
    ```bash
    user$ git clone https://github.com/DCMSstats/gva.git
    ```
    This will create a folder called gva within the myprojects/ folder.
 
#### Updating and running the code
1. Install [Anaconda](https://anaconda.org/), which can be installed via the DCMS software centre.
1. Open the Anconda Navigator application and then launch jupyterlab.
1. To run an existing publication, in the left hand pane, navigate to myprojects/gva/publications/Nov_2016 and open the notebook 'publication_2016.ipynb'. To run a code block, click on it and hit shift + enter.
1. To produce a new publication, create a copy of publications/Nov_2016, rename for example to publications/Nov_2017 (the name must not start with a number), and then update the notebook accordingly - for example point to new data.
1. If you need to make changes to the package functions used by the notebook, for example changing what data is read in by the read_abs() function, open the file /src/functions.py, update the read_abs() function, save the notebook, and rerun the code in the notebook. The code:
   ```python
   %load_ext autoreload
   %autoreload 2
   ```
   at the top of the notebook ensures the package is reloaded so that any changes made are included. You might find it easiest to copy the code from the function into a new notebook to experiment with, before copying back to functions.py.

#### QA, git commit, and git push to github.
Use `git commit` to [log a snapshot](https://github.com/DCMSstats/gva/commits/master) of the code, once you are happy with it. However, will only be recorded on your machine, use `git push origin master` to add your commit to the Github repository. Software carpentary has a good [tutorial](https://swcarpentry.github.io/git-novice/) on using Git. Before pushing to Github where everything is publically viewable, QA needs to take place to ensure the files you are committing do not contain any sensitive data.

#### Other
To run the code without cloning the repository or using raw data, run pip install dcms_gva, and download this example notebook. - not yet implemented.


## Design philosophy/requirements:
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
   * Including sensitive data as output cells in jupyter notebooks. Currently, this relies on users not printing out sensitive data to output cells and then commiting the notebook with the output cells. The output in ouput cells is clearly displayed in notebooks so this is easily avoided, however, still relies on the user which is not ideal. In future implementations, git hooks could be used to ensure [output is stripped from notebooks](https://github.com/kynan/nbstripout) on commit, however a more sophisticated implementation of the repo will be necessary to ensure git hooks are used, probably using [docker](https://www.docker.com/).
   * Including sensitve data in aggregate data csv. The data in this file should be at sector level and anonymised, however it is still conceiveably possible to include senstive sic level data in the csv which is then committed to the repo. As with the previous point, the same QA checks that are usually applied to statistical publications before they are published, can be applied here. Also, code can be written that will check the form of the data and stop the code with and error before the CSV is written, reducing the chance of creating and then comitting a CSV containing sensitive data.
<!--- https://conferences.oreilly.com/jupyter/jup-ny/public/schedule/detail/69986 --->

#### Approach
* Separate source code from publications. We want to use the same code (source code) each time a publication is produced, so that we know that statistics are being calculated on the same basis for every publication. However, each publication will require different inputs, settings, and outputs. We use a Jupyter notebook for each individual publication to store the code specific to that publication, which reads in the 'source code' which is consistent across all publication. Notebooks are used for documenting and explaining functionality and any logic or notes about that publication. Source code will be for things like how the raw data is cleaned and merged together, etc. The jupyter notebook publication code will contain things like what years we want to display, paths to the relevant year's raw data, etc.
* Make .py python script copy of publication notebook, to allow easier integration with pytest and easy debugging.

#### Future developments
Use docker to allow sharing of config files e.g.jupyter_notebook_config.py which would allow for things like automatically creating .py scripts upon .ipynb saves, and extra safety measure to be put in place. Also it will remove the need for users to install packages or set up virtual environments. Also could possibly have jupyterlab image hosted on GCP so users can remote in without needing ANY software installed locally.


## Description of the contents of this repo
#### README.md
It is convention to include this markdown document in repositories to provide an explanation of the repo. Also, for repos hosted on Github, the README is rendered and displayed on the repo's page (this is what you are reading!). For the most part, markdown syntax is universal, however there are different implementations with slight difference. Github uses (Github Flavored Markdown)[https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet].

#### .gitignore

#### src/
This directory contains the packages source code.

#### publications/
This directory contains different folders for each publication. Within the individual publication folders are the jupyter notebook used to run the source code in src and create the various outputs for that publication. There is also a copy of the notebook as a regular python script, this is to make it more simple to run the tests in the tests/ folder. The test/ folder contains tests which check that when the publication script is run, it matches the previously produced outputs for the publications. This is useful for when we update the source code, we can check that the code will still accurately reproduce outputs for previous publications.


## Glossary
Source code  
package  
repo  
tests  
publication  
jupyter notebook  

## Notes
The raw data is provided in £m's and the cleaned output data is also given in £m's to preserve as much numerical precision as possible. For example, this is necessary for testing against excel publications, as converting to actual values then back to millions for testing looses too much precision and tests do not pass.

  
## Other points
Where possible I have linked to reputable sources to explain ideas or make cases for use of a particular tool/approach. This is in order to make the reasoning more convincing and help paint the repo in a wider context.

As this repo is replicated for other publications, a lot of the information in this README will be stripped out and stored somewhere more centrally.

