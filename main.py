import os
import flask
from flask import Flask, flash, redirect, render_template, request, session, abort, make_response, url_for

cwd = os.getcwd()
print('flask cwd is:' + cwd)
app = Flask(__name__, root_path=os.path.join(cwd, "publications/nov_2017/reports"), template_folder="temp/flask/")

print(app.static_folder)
print(app.static_url_path)
print(app.template_folder)


@app.before_request
def before_request():
    if not request.is_secure:
        url = request.url.replace("http://", "https://", 1)
        code = 301
        return redirect(url, code=code)

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
def hello():
    return flask.redirect("https://www.gov.uk/government/organisations/department-for-digital-culture-media-sport/about/statistics")

@app.route('/publications/gva-2017')
def index():
    """Render home page."""
    return render_template('index.html')  # we can render templates as usual

@app.route('/data-tools/economic-estimates')
def eetool():
    """Render home page."""
    return render_template('eetool.html')  # we can render templates as usual



if __name__ == '__main__':
    app.run(debug=True)
