def add_path(dir=None):
    # find path to root directory
    if os.path.exists(os.path.abspath(os.path.join('publications'))):
        module_path = os.path.abspath(os.path.join(''))
    else: 
        module_path = os.path.abspath(os.path.join('../..'))

    # add root directory to sys.path so we that our packages can be found
    if module_path not in sys.path:
        sys.path.append(find_dir())
