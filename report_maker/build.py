#!/usr/bin/env python
 
import os
from jinja2 import Environment, FileSystemLoader, Template
from bs4 import BeautifulSoup

import markdown
#from flask import Flask
#from flask import render_template
from flask import Markup
from lxml import etree

if os.getcwd() == '/Users/max.unsted/projects/gva_publication/publications/nov_2016' or os.getcwd() == 'C:\\Users\\davita.patel\\Documents\\projects\\gva_publication\\publications\\nov_2016' or '/Users/max.unsted/projects/gva_publication/publications/nov_2017' or os.getcwd() == 'C:\\Users\\davita.patel\\Documents\\projects\\gva_publication\\publications\\nov_2017':
    template_dir = 'reports/'
else:
    template_dir = 'publications/nov_2016/reports/'

print(template_dir)
print('hi')
# how we dilineate between a {{value}} in markdown or svg and a {{markdown}} or {{svg}} to embed into index.html

# reasoning: the markdown will be written by the user, so it can be peppered with stats like uk_total etc. However, for the SVGs we don't want to have to edit the code, so any parameters we want to be adjusted, e.g. color, text etc should be specified in a dict and the key is the name of the SVG file.


# in order to make it sensible to store outputs in git, need to delete contents of output and static/js (which have been made from templates - maybe have a folder called generated js) prior to running this.

def build(context):
    
    # make sure temp folder exists
    os.makedirs(os.path.dirname(os.path.join(template_dir, 'temp')), exist_ok=True)
    os.makedirs(os.path.dirname(os.path.join(template_dir, 'temp/js/')), exist_ok=True)
    os.makedirs(os.path.dirname(os.path.join(template_dir, 'temp/svg/')), exist_ok=True)
    os.makedirs(os.path.dirname(os.path.join(template_dir, 'temp/flask/')), exist_ok=True)
    os.makedirs(os.path.dirname(os.path.join(template_dir, 'static/js/')), exist_ok=True)

    # populate js templates

    #PATH = os.path.dirname(os.path.abspath(__file__))
    js_env = Environment(
        autoescape=False,
        loader=FileSystemLoader(os.path.join(template_dir, 'templates/js')),
        trim_blocks=False)

    # populate js templates with data and save to static
    # this returns index from insert_markdown but with any {{ jinja varirables }} evaluated
    def render_js(template_filename, context):
        return js_env.get_template(template_filename).render(context)
    
    # populates index with markdown (not populated) and svg (populated)
    # save to temporay file so we can see what it looks like
    
    with open(template_dir + 'static/js/chart1.js', 'w') as f:
        js = render_js('chart1.js', context)
        f.write(js)    
    
    with open(template_dir + 'static/js/table.js', 'w') as f:
        js = render_js('table.js', context)
        f.write(js)    

    # this is for index.html i guess???
    #PATH = os.path.dirname(os.path.abspath(__file__))
    TEMPLATE_ENVIRONMENT = Environment(
        autoescape=False,
        loader=FileSystemLoader(os.path.join(template_dir, 'templates')),
        trim_blocks=False)
    

    # read all markdown, convert to html, and save into a dict
    
    md_html = {}
    for md in os.listdir(template_dir + 'templates/markdown'):
        if os.path.splitext(md)[1] == ".md":
            with open(template_dir + 'templates/markdown/' + md, 'r', encoding='utf8', errors='ignore') as myfile:
              data = myfile.read()
              md_html[os.path.splitext(md)[0]] = Markup(markdown.markdown(data))

    value = float(context['donut']['text'].replace('%', ''))
    mystring = str(value) + ' ' + str(100 - value)
    # read in svg and update - need to use xpath for text and get/set for attributes
    for img in os.listdir(template_dir + 'templates/svg'):
        myname = os.path.splitext(img)[0]
        tree = etree.parse(template_dir + 'templates/svg/' + img)
        root = tree.getroot()

        # update text
        for me in tree.xpath("//text()"):
            if '{{ value }}' in me:
                index = tree.xpath("//text()").index(me)
        thing = tree.xpath("//text()")[index].getparent()
        thing.text = context[myname]['text']

        # update attributes
        if myname == 'donut':
            for element in root.iter():
                if element.get('class') == 'donut-segment':
                    element.set('stroke-dasharray', mystring)

        if myname == 'donut':
            for element in root.iter():
                if element.get('class') == 'donut-segment':
                    element.set('stroke-dasharray', mystring)


        tree.write(template_dir + 'temp/svg/' + img)

        with open(template_dir + 'temp/svg/' + img, 'r') as myfile:
            thingy = myfile.read()
        md_html[myname] = thingy

    
    # render jinja vars in templates
    
    # this returns index from insert_markdown but with any {{ jinja varirables }} evaluated
    def my_render_template(template_filename, context):
        return TEMPLATE_ENVIRONMENT.get_template(template_filename).render(context)
    
    # populates index with markdown (not populated) and svg (populated)
    def index_with_markdown():
        # save to temporay file so we can see what it looks like
        with open(template_dir + 'temp/temp_index.html', 'w', encoding='utf8', errors='ignore') as f:
            html = my_render_template('index.html', md_html)
            f.write(html)    
        return my_render_template('index.html', md_html)
    
    # populates temp_index with remaining (non SVG) stuff in context (jinja vars in markdown)
    fname = template_dir + "output/index.html"
    with open(fname, 'w', encoding='utf8', errors='ignore') as f:
        html = Template(index_with_markdown()).render(context)
        f.write(html)

        
    # replace static links with url_for links

    with open(template_dir + 'output/index.html', 'r', encoding='utf8', errors='ignore') as myfile:
        data = myfile.read()

    # replace css link with url_for
    soup = BeautifulSoup(data, "html.parser")
    for link in soup.findAll('link'):
      link['href'] = link['href'].replace("static/css/style.css", "{{ url_for('static',filename='css/style.css') }}")
      link['href'] = link['href'].replace("static/css/c3.css", "{{ url_for('static',filename='css/c3.css') }}")

    # replace js chart links with url_for
    js_templates = ['chart1.js', 'table.js', 'c3.min.js', 'gumshoe.js']
    js_templates2 = ['static/js/' + i for i in js_templates]
    for script in soup.findAll('script'):
        if script.get('src') in js_templates2:
            string = script['src']
            fn = os.path.basename(string)
            script['src'] = script['src'].replace(string, "{{ url_for('static',filename='js/" + fn + "') }}")

    # replace img link with url_for
    for img in soup.findAll('img'):
        img['src'] = img['src'].replace("static/images/fig_2_2.png", "{{ url_for('static',filename='images/fig_2_2.png') }}")
        img['src'] = img['src'].replace("static/images/ch_3_pound.png", "{{ url_for('static',filename='images/ch_3_pound.png') }}")
        img['src'] = img['src'].replace("static/images/ch_3_arrow.png", "{{ url_for('static',filename='images/ch_3_arrow.png') }}")

    with open(template_dir + "temp/flask/index.html", "w", encoding='utf8', errors='ignore') as file:
        file.write(str(soup))

 
########################################
 
if __name__ == "__main__":
    main()

