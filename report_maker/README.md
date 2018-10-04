## Approach

report_maker populates html templates with content wrtien in:
markdown for text content
svg for bespoke graphics
javascript for charts


Some exampless of HTML statistics publications:

First the index.html is populated with all of the separate SVG and markdown - see temp_index.html. This completes the overall struture with remaining Jinja variables like {{ value }} which are populated by values stored in the context dictionary passed to build().

Write intermediate steps to make debugging easier.

Build steps
1. **create dict of SVG, and converted markdown** convert markdown to html, preserving {{ values }}, read SVGs, and put everything in a dict.
1. take index.html and populate with above dict, saving as temp_index.html
1. populate the existing {{ values }} using the context dict - this could include {{ values }} in SVGs if they were not previously processed? and save to outputs/index.html

Flask
Need to have a separate index.html for flask which has static links replaced by url_for, so the flask application saves an ammended copy of index.html in flask/
