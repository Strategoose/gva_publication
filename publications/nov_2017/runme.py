import sys
import os

# find path to root directory
if os.path.exists(os.path.abspath(os.path.join('publications'))):
    module_path = os.path.abspath(os.path.join(''))
    print('one')
else: 
    module_path = os.path.abspath(os.path.join('../..'))
    print('two')

print('abs path is: ' + os.path.abspath(os.path.join('publications')))
print('module path is: ' + module_path)
# add root directory to sys.path so we that our packages can be found
if module_path not in sys.path:
    sys.path.append(module_path)

from report_maker.app import create_app
app = create_app()
app.run(debug=True)


print(app.instance_path)
print(app.root_path)
print(app.has_static_folder)
print(app.static_folder)
print(app.static_url_path)
print(app.template_folder)


