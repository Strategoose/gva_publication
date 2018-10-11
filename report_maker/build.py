#!/usr/bin/env python
 
import os
from jinja2 import Environment, FileSystemLoader, Template
from bs4 import BeautifulSoup

import markdown
#from flask import Flask
#from flask import render_template
from flask import Markup
from lxml import etree

if os.getcwd() == '/Users/max.unsted/projects/gva_publication/publications/nov_2016':
    template_dir = 'reports/'
else:
    template_dir = 'publications/nov_2016/reports/'

# how we dilineate between a {{value}} in markdown or svg and a {{markdown}} or {{svg}} to embed into index.html

# reasoning: the markdown will be written by the user, so it can be peppered with stats like uk_total etc. However, for the SVGs we don't want to have to edit the code, so any parameters we want to be adjusted, e.g. color, text etc should be specified in a dict and the key is the name of the SVG file.

def build(context):
    
    # populate js templates
    
    #PATH = os.path.dirname(os.path.abspath(__file__))
    js_env = Environment(
        autoescape=False,
        loader=FileSystemLoader(os.path.join(template_dir, 'js_templates')),
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

    
    #PATH = os.path.dirname(os.path.abspath(__file__))
    TEMPLATE_ENVIRONMENT = Environment(
        autoescape=False,
        loader=FileSystemLoader(os.path.join(template_dir, 'templates')),
        trim_blocks=False)
    
    # read all markdown, convert to html, and save into a dict
    md_html = {}
    for md in os.listdir(template_dir + 'markdown'):
        if os.path.splitext(md)[1] == ".md":
            with open(template_dir + 'markdown/' + md, 'r') as myfile:
              data = myfile.read()
              md_html[os.path.splitext(md)[0]] = Markup(markdown.markdown(data))

    value = float(context['donut']['text'].replace('%', ''))
    mystring = str(value) + ' ' + str(100 - value)
    # read in svg and update - need to use xpath for text and get/set for attributes
    for img in os.listdir(template_dir + 'raw_svg'):
        myname = os.path.splitext(img)[0]
        tree = etree.parse(template_dir + 'raw_svg/' + img)
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


        tree.write(template_dir + 'static/svg/' + img)

        with open(template_dir + 'static/svg/' + img, 'r') as myfile:
            thingy = myfile.read()
        md_html[myname] = thingy

    
    # render jinja vars in templates
    
    # this returns index from insert_markdown but with any {{ jinja varirables }} evaluated
    def my_render_template(template_filename, context):
        return TEMPLATE_ENVIRONMENT.get_template(template_filename).render(context)
    
    # populates index with markdown (not populated) and svg (populated)
    def index_with_markdown():
        # save to temporay file so we can see what it looks like
        with open(template_dir + 'temp_index.html', 'w') as f:
            html = my_render_template('index.html', md_html)
            f.write(html)    
        return my_render_template('index.html', md_html)
    
    # populates temp_index with remaining (non SVG) stuff in context (jinja vars in markdown)
    fname = template_dir + "output/index.html"
    with open(fname, 'w') as f:
        html = Template(index_with_markdown()).render(context)
        f.write(html)

        
    # replace static links with url_for links

    with open(template_dir + 'output/index.html', 'r') as myfile:
        data = myfile.read()

    # replace css link with url_for
    soup = BeautifulSoup(data, "html.parser")
    for link in soup.findAll('link'):
      link['href'] = link['href'].replace("static/styles/style.css", "{{ url_for('static',filename='styles/style.css') }}")

    # replace js chart links with url_for
    js_templates = ['chart1.js', 'table.js']
    js_templates2 = ['static/js/' + i for i in js_templates]
    for script in soup.findAll('script'):
        if script.get('src') in js_templates2:
            string = script['src']
            fn = os.path.basename(string)
            script['src'] = script['src'].replace(string, "{{ url_for('static',filename='js/" + fn + "') }}")

    # replace img link with url_for
    for img in soup.findAll('img'):
        if img['id'] == 'money-bag':
            img['src'] = img['src'].replace("static/svg/money_bag.svg", "{{ url_for('static',filename='svg/money_bag.svg') }}")

    with open(template_dir + "flask/index.html", "w") as file:
        file.write(str(soup))

 
########################################
 
if __name__ == "__main__":
    main()

