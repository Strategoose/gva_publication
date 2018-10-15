# RAP tool guides

## Git

Git is simply version control software installed on your laptop that allows you to take snapshots of the files in your projects folder, rather than saving different versions of files as say myfile_v1.py, myfile_v2.py, etc etc.

Git is a command line based tool (there are graphical user interfaces for git, but it is usually more straight forward to work with the command line version). This means a basic understanding of command line is required.

Raise a ticket to get git installed from [here](https://git-scm.com/downloads)

### Command line
Both Windows and Mac have their own Command Line application: Windows has 'Command Prompt', Mac's have the Terminal application. For our purposes, both are simply ways of navigating between folders, in exactly the same way as Windows Explorer, or Finder on Mac does. The difference is that Windows uses command prompt syntax, whereas Mac's Terminal uses syntax called Bash. We want to be using Bash as it is standard and what all tutorials use. Luckily, when we install Git, another Command Line application is installed called Git Bash, which allows us to use Bash on Windows. Anaconda also installs Anaconda Prompt which, similarly to Git Bash, is a Command Line application for using Anaconda with Bash on Windows.

Open a bash Command Line application such as Git Bash, Anaconda Prompt, or Terminal on Mac.

You should see a prompt like `$your.name: _` where you can type a command and hit enter to run it.

Navigating folders
First run `pwd` which stands for 'print working directory' which should print out what folder you are currently in. This should be something like `c/users/your.name/` which is the folder that contains your main folders like documents, downloads, pictures, etc. This is the same as opening a folder in Windows. However, Windows Explorer shows us all the files and folders in the folder we are in. Run `ls` at the command line to display all the files and folder in the working directory. This should be a list of folders and files like `Documents/`, `Downloads/` etc. In Windows Explorer, you enter one of the folders shown in your current folder by double clicking it. With Command Line we use `cd` which stands for change directory. Run `cd Documents` to move to your documents folder. Printing the working (current) directory with `pwd` should now display something like `c/users/your.name/Documents/` and `ls` you display the contents of you Documents folder.

Command line and Git
We use Git from the Command Line and therefore need to be able to navigate to the appropriate folders using the above. When we download a repository from github with for example `git clone https://github.com/DCMSstats/gva_publication.git`, it will be copied into the current folder. So if `pwd` is `c/users/your.name/Documents/` then `git clone https://github.com/DCMSstats/gva_publication.git` will create a folder `c/users/your.name/Documents/gva_publication/` with all the files from github inside. Also, onec we have cloned a reposiotry, and want to start working on it, we need to navigate to that directory e.g. `cd gva_publication` to run git commands like `git add`, `git commit`, etc.


## Github
The purpose of Github is to take our git folder folder and the log of snapshots and host it online, so that it is backed up, and multiple people can collaborate on the same project.

Software carpentry have a well regarded introduction to using git and github [here](https://swcarpentry.github.io/git-novice/)

Sign up to [github](https://github.com/)

Follow [this](https://help.github.com/articles/set-up-git/) guide to set up git to work with github.

#### QA, git commit, and git push to github.
Use `git commit` to [log a snapshot](https://github.com/DCMSstats/gva_publication/commits/master) of the code, once you are happy with it. However, will only be recorded on your machine, use `git push origin master` to add your commit to the Github repository. Software carpentary has a good [tutorial](https://swcarpentry.github.io/git-novice/) on using Git. Before pushing to Github where everything is publically viewable, QA needs to take place to ensure the files you are committing do not contain any sensitive data.


#### Updating and running the code
1. Install [Anaconda](https://anaconda.org/), which can be installed via the DCMS software centre.
1. Open the Anconda Navigator application and then launch jupyterlab.
1. To run an existing publication, in the left hand pane, navigate to myprojects/gva/publications/Nov_2016 and open the notebook 'publication.ipynb'. To run a code block, click on it and hit shift + enter.
1. To produce a new publication, create a copy of publications/nov_2016, rename for example to publications/nov_2017 (the name must not start with a number), and then update the notebook accordingly - for example point to new data.
1. If you need to make changes to the package functions used by the notebook, for example changing what data is read in by the read_abs() function, open the file /src/functions.py, update the read_abs() function, save the notebook, and rerun the code in the notebook.

## Pip and virtual environments.
pip is used to install python packages for extra functionality, in the same way that install.packages() does for R. Except that with python it is more usual to use pip from the Command Line. In R we install packages into a single folder so that all our R projects use the same versions of packages. This might cause problems when we update packages for new projects, which breaks older projects which rely on an older verison of a package. It is standard practice in Python to use what is called a virtual environment which is basically the approach of: rather than installing our packages gloablly for every project to use, we install the packages needed by each project in a folder within that project. This means that each project is completely independent of one another and reduces the number of packages that any project has access to, reducing the change of conflicts.
[This](https://code.likeagirl.io/a-guide-to-virtual-environments-in-python-72c5a1917c82) code.likeagirl.io article provides a more in depth look at virtual environments.

To create a virtual environment, navigate to the project folder and run `python3 -m venv env` to create a virtual environment. To activate the virtual environment (this needs to be done everytime you close and then restart the Command Line) run `source env/bin/activate`. Now when you can use pip to install packages for example `pip install pandas` which will only install pandas into your virtual environment for that project (although pandas is already globally installed by Anaconda). Most packages instructions for installing using pip for example [pandas](https://pandas.pydata.org/)

