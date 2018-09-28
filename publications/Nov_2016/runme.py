import sys
import os

# find path to root directory
if os.path.exists(os.path.abspath(os.path.join('src'))):
    module_path = os.path.abspath(os.path.join(''))
else: 
    module_path = os.path.abspath(os.path.join('../..'))

# add root directory to sys.path so we that our packages can be found
if module_path not in sys.path:
    sys.path.append(module_path)

from report_maker.app import create_app

app = create_app()

print(app.instance_path)
print(app.root_path)
print(app.has_static_folder)
print(app.static_folder)
print(app.static_url_path)
print(app.template_folder)


app.run(debug=True)