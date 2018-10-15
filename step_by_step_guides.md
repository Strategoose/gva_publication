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

#### QA, git commit, and git push to github.
Use `git commit` to [log a snapshot](https://github.com/DCMSstats/gva/commits/master) of the code, once you are happy with it. However, will only be recorded on your machine, use `git push origin master` to add your commit to the Github repository. Software carpentary has a good [tutorial](https://swcarpentry.github.io/git-novice/) on using Git. Before pushing to Github where everything is publically viewable, QA needs to take place to ensure the files you are committing do not contain any sensitive data.


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

