from flask import Flask, render_template, url_for

# here we can set a different root path
#app = Flask(__name__)
import os
cwd = os.getcwd()
print(cwd)

def create_app():
    
#    app = Flask(__name__, root_path='../api_files/')
#    app = Flask(__name__, instance_relative_config=True)
    

    app = Flask(__name__, root_path=os.path.join(cwd, "reports"), template_folder="temp/flask/")

    # appened static content with version number to overcome caching
    @app.context_processor
    def override_url_for():
        return dict(url_for=dated_url_for)

    def dated_url_for(endpoint, **values):
        if endpoint == 'static':
            filename = values.get('filename', None)
            if filename:
                file_path = os.path.join(app.root_path,
                                         endpoint, filename)
                values['q'] = int(os.stat(file_path).st_mtime)
        return url_for(endpoint, **values)


    @app.route('/')
    def index():
        """Render home page."""
        return render_template('index.html')  # we can render templates as usual

    return app



if __name__ == '__main__':
    app.run(debug=True)