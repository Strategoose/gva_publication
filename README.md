[![Coverage Status](https://img.shields.io/codecov/c/github/DCMSstats/eegva/master.svg)](https://codecov.io/github/DCMSstats/eegva?branch=master)
[![GitHub release](https://img.shields.io/github/release/DCMSstats/eegva.svg)](https://github.com/DCMSstats/eeegva/releases)
<img src="https://github.com/ukgovdatascience/rap_companion/raw/master/images/rap_hex.png" align="right" width="150" height="150"/>
# [DCMS Sector Ecomonic Estimates Publications: GVA](https://www.gov.uk/government/collections/dcms-sectors-economic-estimates)

## Contents
* [About](#about)
* [Using the package](#using-the-package)
  * [Installation]
* [Design Philosphy]
  * [Versioning]

## About
This package stems from GDS's [RAP](https://ukgovdatascience.github.io/rap_companion/) (Reproducible Analytical Pipeline) initiative, which aims to create higher quality, reproducible, data analysis pipelines within government.

The code is published in the [open](https://www.gov.uk/service-manual/technology/making-source-code-open-and-reusable), and aligns with the [Open Government National Action Plan](https://www.gov.uk/government/publications/uk-open-government-national-action-plan-2016-18/uk-open-government-national-action-plan-2016-18). This helps make the information provided in statistical publications more transparent, for example by showing how anonymisation and rounding has taken place.

In this repo we use a [Jupyter/Ipython?](http://jupyter.org/) notebook for each publication to run source code contained in separate packages and create the publications's outputs. Jupyter allows for easy visualisation and documentation for [literate programming](https://en.wikipedia.org/wiki/Literate_programming), and has been adopted by major tech companies, including: [Google](https://cloud.google.com/datalab/) [(also)](https://research.google.com/colaboratory/), Microsoft, Bloomberg, [Netflix](https://medium.com/@NetflixTechBlog/notebook-innovation-591ee3221233), [IBM](https://www.ibm.com/cloud/pixiedust). Storing the source separately allows different aspects of the publications to be independtly version controlled.

Each publication will generally follow the following format:

Create a new folder in the publications/ directory (for example by duplicating a previous publication) which contains a publication.ipynb.

In publication.ipynb:
  part 1 - Processes raw, sensitive, data to produces the aggregated, non-sensitive CSV, using the [gva_data_processing package](https://github.com/DCMSstats/gva/tree/master/gva_data_processing). Access to the sensitive, raw data is required to perform this step. However, the rest of the notebook can still be run using the aggregate CSV once it has been published.

  Part 2 - Produce written reports from the aggregate CSV, using the [report_maker](https://github.com/DCMSstats/gva/tree/master/report_maker) package.

  Part 3 - Produce spreadsheet files from the aggregate CSV, using the [spreadsheet_maker](www.spreadsheet_maker.com) package.

  Part 4 - Pass data to test scripts which ensure all outputs from all publications can be reproduced - according to the [Versioning](#versioning) section.

Test [dashboard](https://gva-dot-dcms-statistics-internal.appspot.com/) with aggregate CSV in local development environment.

Publish all outputs, tool automatically points to most up to date CSV so automatically updates.

## Using the package
### package structure
This structure does not exactly match the contents of the repo and is simply for illustrative purposes. For example, it fakes a longer time period to help illustrate how the structure will grow over time. Notice that there is no folder for raw data, since it should never be stored in the package.

```
gva_data_processing/
    read_data.py
    clean_data.py
    make_summaries.py
    ...

README.md
requirements.txt
publications/
    Nov16/
        run_publication.ipynb
        reports/
            templates/
                index.html
                svg/
                markdown/
                js/
            static/
                css/
                js/
            output/
                index.html
                css/
                js/
        spreadsheets/
            templates/
            output/
        processed_data/
            gva_2016.csv
        tests/
    Sep15/
      ...
    Nov14/
      ...
```

#### Versioning
each publicatino has a it's own requiments.txt. 

Notice how the publications requirements.txt records the versions of public, and dcms_packages to be used. This way future improvements and breaking changes to

Since reproducibility tests require access to raw data and therefore cannot be run online in a straight forward way using services like TravisCI, we will have two branches. There is the main development branch which is pushed to. Then, periodically, the test suite is run locally for the current state of this branch, and if it passes, then is merged into the master branch. Developers should be testing locally before commiting so this process should be straight forward, and is simply a means of avoiding situations caused by developers forgetting to test locally before pushing. Whilst this system is manual and imperfect, it works for now, and once our systems and data are moved to cloud services, we will have the opportunity to implement automated secure testing on our own cloud servers, with sensitive data.

When developing a publication, we need all packages to be using the same versions of dependencies, so should use the same requirements.txt. However, each publication needs it's own requirements.txt, which will specify the different versions of our dcms packages.


### Installation and pre-requisites

#### Prerequisites and dependencies
Ensure git and python 3.6 (or Anaconda) or higher are installed.

The following guide assumes a basic understand of git, bash, and python. See below for tutorials. If you have never used these tools before, it is strongly recommend that you first gain some experience through completing tutorials, to provide some context, before continuing.
[Anaconda](https://docs.anaconda.com/anaconda/)
[Anaconda on Windows](https://www.datacamp.com/community/tutorials/installing-anaconda-windows)
[Using the command line, git, and github](https://github.com/DCMSstats/gva_publication/blob/master/step_by_step_guides.md)
pip
virtual environments
jupyterlab (recommended) or another IDE that can run notebooks e.g. jupyter, ipython, vscode, spyder, pycharm.

#### Installation
In most cases, users will want to clone the package so that they add updates to the package and save the changes to github. 
clone this repo and navigate to

git clone
step 1 - Installation
```
git clone https://github.com/DCMSstats/gva_publication.git
```

step 2
naviagte to directory then create and activate a virtual environment
```
cd gva_publication/
python3 -m venv env
source env/bin/activate
```

step 3
if rerunning a publication or continuing development of an existing publication, install it's dependencies with
pip install -r path/to/publication/requirements.txt

or

if starting a new publication, create a new directory in publications/ and install the latest version of dependency packages used in the previous publication with
pip install -r -U path/to/latest/publication/requirements.txt
then save these dependencies to a requirements.txt file with
pip freeze > path/to/new/publication/requirements.txt

step 4
install ipython kernel so it can be used in IDE
ipython kernel install --user --name=publication_name


#### Develop/run a publication
For following steps should be used as a workflow for developing a publication and making updates to the package.
Step 1
If not already done so, navigate to, and activate the virtual environment that should have been created in step 2 of the installtion instructions.

Step 2
Open the project in the IDE of your choice - jupyterlab is recommended. Ensure that the notebook is using the kernel created in step 4 of the installation instructions. If using jupyterlab this can be selected in the top right 

<!--- To develop a publication:
to develop publication packages such as gva_cleaning and report_maker, clone local copies of these and add containing directory to python system path, as described at the top of the notebooks. Use requirements_dev.txt? -->

To run an existing publication simply run all cells in the `publication.ipynb` notebook, and outputs will be written to the output folders in `processed_data/`, `reports/`, and `spreadsheets/`. To develop a publication continue with the following steps.

Step 3
Update data cleaning source code
To change the data cleaning and processing code, open the relevant file in the `gva_data_processing/` folder.

Step 4
Run source code from `publication.ipynb` notebook.


Step 4
Write tests.
 
   

## Package design:

### Requirements
* Reproducibility  
  Individual notebooks that can be run to accurately reproduce ALL outputs for ANY given publication. 
  This requires:
    * Version controlling the publication package and it's dependencies.
    * Automated testing to confirm that previous publication outputs can still be accurately reproduced after updating source code, and alterting when a breaking change has been made, requiring an increment in version number.
* Outputs
  Functionality to produce excel, csv, and html/pdf outputs.
* Simplicity
  Make project as simple as possible in order to make it as easy as possible be understood by users.
* Reliability
  Ensure publication code can be reliably run by users without errors. Use best practices to improve reliability of code, for example using code that will work across operating systems.
* Modularisation
  Make code modular to allow code to be more readable, easily maintained, and reused. This includes splitting code different purposes into separate scripts, e.g. testing code in a separate script. Also, where sensible, break code with scripts into functions
* Safety/security
  Minimise posibility of commiting sensitive data to the public github repository. 
  Cases:
   * Committing raw data files  
     Designing the repo so that the sensitive data is referenced in place rather than copied to the repo itself, and git ignoring all xlsx and xls files unless specifically exempt.
   * Including sensitive data as output cells in jupyter notebooks. Currently, this relies on users not printing out sensitive data to output cells and then commiting the notebook with the output cells. The output in ouput cells is clearly displayed in notebooks so this is easily avoided, however, still relies on the user which is not ideal. In future implementations, git hooks could be used to ensure [output is stripped from notebooks](https://github.com/kynan/nbstripout) on commit, however a more sophisticated implementation of the repo will be necessary to ensure git hooks are used, probably using [docker](https://www.docker.com/).
   * Including sensitve data in aggregate data csv. The data in this file should be at sector level and anonymised, however it is still conceiveably possible to include senstive sic level data in the csv which is then committed to the repo. As with the previous point, the same QA checks that are usually applied to statistical publications before they are published, can be applied here. Also, code can be written that will check the form of the data and stop the code with and error before the CSV is written, reducing the chance of creating and then comitting a CSV containing sensitive data.
<!--- https://conferences.oreilly.com/jupyter/jup-ny/public/schedule/detail/69986 --->

### Outputs
[html](https://gds.blog.gov.uk/2018/07/16/why-gov-uk-content-should-be-published-in-html-and-not-pdf/)

### Rounding
All outputs from the source code should be unrounded, and all rounding should be done within the publication notebook since rounding should be considered presentational and not part of the analysis that needs to be versioned.

### Testing
The test command (pytest) runs the test for all publications where tests have been created. This will typically be published publications, where after publication, tests are written to compare output with the published results. The test scripts download publication outputs directly from distribution channel (and cached to imporve test run times?) e.g. gov.uk and publication code is run and then both copies are compared to check they are identical.

### Versioning
Important motivations for bundling statistical publication production into a Python repo, is that we can ensure reproducibility, and consistency of data processing method between publications. Reproducibility is critical to ensure publications are auditable and trustworty. Consistency of approach for each publication is also critical to ensure statistics are accurate, transparent, reliable, trustworthy etc.
Problems with traditional approaches:
Reproducibility: Data processing with excel files means that files might be stored in different places, there can be errors in the excel files, if someone changes something in a dependent excel file unknowlingly, it could alter the output of the pipeline.
Consistency: If we add new functionality for a new publication which is built on top of the existing functionality, we have no way of rerunning previous publications to check that numbers produced are the same, so we have no way of knowing if the new functionality is calculating statistics on the same basis as previous publications.

The solution is to use the same code for every publication. The code should be comprised of generalised functions that can be re-used for every publication. This code is referred to as source code and is resued for every publication. We then have separate jupyter notebooks for each publication. Each publication notebook has different inputs specific to that publication, for example file paths to the latest raw data. This way we know that the stats for each publication are being calculated on the same basis, as the same source code is being used. 
Once a publication has been released, we write automated tests that mean with a single command we can rerun the publication notebook, and check the outputs are the same as those produced for the released publication. This means that when new functionaility is added to the source code for future publications, we can run the automated tests using the upadted source code to ensure that the same outputs are being produced and therefore statistics in the new publication are being calculated on the same basis as previously. What if there is a change in methodology or another reason that updates to the source mean that we don't expect it to produce previous publications on the same basis? We increment the major release number of the [repos version number](https://github.com/DCMSstats/gva/releases). Using [software versioning](https://en.wikipedia.org/wiki/Software_versioning) is a standard software development practice and helps us clearly record the different version of our repo.
Say the current iteration of our code is v1.0.2 can be read as major.minor.patch
the version number represents major: breaking change, minor: feature number, 2: bug fix number

If we fix a bug in our code, we can then release this as v1.0.3. Note that if the bug affects the actual value of the statistics being produced, we would either want to re-release previous publications with the bug fixed - and update automated tests accordingly, or if not re-releasing, you should increment the major version number to v2.0.2 to signify that this source code is on a different basis to versions for previous publications and is not expected to proudce the same results. Typically this might be a formatting issue that is rectified but doesn't affect the statistical output that is checked by the automated tests.

If we add a new feature to our code we increment the minor number giving us v1.1.2.

If we update the source code so that calculations are on a different basis, so that we do not expect the code to be able to accurately reproduce statistics in previous publications (for example because of a change in methodology) then we increment the the major number and reset minor and patch numbers: v2.0.0.

This may seem complicated but it is a very widely used, standised approach to managing software versioning.

What if we are just adding an extra column? this won't pass test for previous releases but doesn't seem like a good enough reason for a major release since the rest of the information will still be accurate? maybe it is a good enough reason? or maybe the tests should know to just check whatever information was actually included in the release - yes.

### Approach
* Separate source code from publications. We want to use the same code (source code) each time a publication is produced, so that we know that statistics are being calculated on the same basis for every publication. However, each publication will require different inputs, settings, and outputs. We use a Jupyter notebook for each individual publication to store the code specific to that publication, which reads in the 'source code' which is consistent across all publication. Notebooks are used for documenting and explaining functionality and any logic or notes about that publication. Source code will be for things like how the raw data is cleaned and merged together, etc. The jupyter notebook publication code will contain things like what years we want to display, paths to the relevant year's raw data, etc.
* Make .py python script copy of publication notebook, to allow easier integration with pytest and easy debugging.

### Future developments
Use docker to allow sharing of config files e.g.jupyter_notebook_config.py which would allow for things like automatically creating .py scripts upon .ipynb saves, and extra safety measure to be put in place. Also it will remove the need for users to install packages or set up virtual environments. Also could possibly have jupyterlab image hosted on GCP so users can remote in without needing ANY software installed locally.

To run the code without cloning the repository or using raw data, run pip install dcms_gva, and download this example notebook. - not yet implemented.


## Other Information
### Glossary
Source code  
package  
repo  
tests  
publication  
jupyter notebook  

### Assumptions
That every publication has a ipython notebook called publication.ipynb.

### Notes
The raw data is provided in £m's and the cleaned output data is also given in £m's to preserve as much numerical precision as possible. For example, this is necessary for testing against excel publications, as converting to actual values then back to millions for testing looses too much precision and tests do not pass.

### Design decisions
report_maker - copy all outputs to output/ which is inline with other similar packages like pelican.

avoid file names unique to publication, so that publication folders can be easily duplicated for subsequent releases.
strip output cells from outptus notebook also, since might have accidently processed data incorrectly and so could be commiting this, although this would mean the output csv is also bad. solution is to find a way to ensure we never commit/work with a sensitive csv.
also, we won't necessarily want to publish csv straight away so need some sort of flag to say if pub is in development
store csv locally if required, don't commit csv, and strip output from all notebooks
if pub is live, commit csv, run tests, keep cell outputs in output notebook.
would be nice to have unique names for when we have two publication notebooks open, but is not necessary.

would we ever want to run flask from notebook, since this probably depends heavily an the IDE being used? just accept it needs to be run from terminal in virtual environment?

  
### Other points
Where possible I have linked to reputable sources to explain ideas or make cases for use of a particular tool/approach. This is in order to make the reasoning more convincing and help paint the repo in a wider context.

As this repo is replicated for other publications, a lot of the information in this README will be stripped out and stored somewhere more centrally.

We keep the notebooks, tests etc, and the source code in the same repository to make the code base easier for developers to work with.

What is the purpose of this? Why do statistical publications even need to be reproducible? Arguably, it is more important that the analysis that is based on statistical data and goes on to inform policy decisions is reproducible - for accuracy, transparency, QA etc, to ensure that policy decisions are and were made based on quality analysis. Is it important for the underlying statistical to be reproducible? Less so. But there are other reasons to use RAP for statistical publications: 
Its sets a standard of reproducibility for the analysis that uses it. 
Some statistical publications are actually closer to analysis pieces themselves, so require reproducibility for the reasons listed for analysis.
As statistical outputs become more tecnhologically sophisticated, for example creating HTML report websites, and interactive web applications, it is important that statistical outputs that the services rely on are produced in an automated, tested way, to ensure the consistency, metadata etc, that these sorts of services require. Manually produced outputs are to automated outputs, what free text fields are to dropdown boxes on forms - far less usable and harder to work with, but just as flexible given the proper design.

### Help
It is convention to include this markdown document in repositories to provide an explanation of the repo. Also, for repos hosted on Github, the README is rendered and displayed on the repo's page (this is what you are reading!). For the most part, markdown syntax is universal, however there are different implementations with slight difference. Github uses (Github Flavored Markdown)[https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet].
