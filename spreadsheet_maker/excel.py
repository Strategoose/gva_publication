from openpyxl import Workbook, load_workbook
from openpyxl.drawing.image import Image
import os

__all__ = ['make_template', 'populate_template']

def make_template(fn, sheets=None, overwrite=False):
    # suffix file name with _template. this helps it to be associated programatically, and means both files can be opened in MS excel for comparison.
    fn = os.path.join('spreadsheets/excel_templates/', fn)
    wb = Workbook()
    if sheets:
        if type(sheets) == str:
            sheets = [sheets]
        ws1 = wb.active
        ws1.title = 'Contents'
        img = Image('dcms_logo.jpg')
        ws1.add_image(img, 'A1')
        ws1['B20'] = 'Contents'

        ws1.sheet_view.showGridLines = False
        for sh in sheets:
            temp_ws = wb.create_sheet(title=sh)
            temp_ws.sheet_view.showGridLines = False

        for i, sh in enumerate(sheets):
            myrow = str(21 + i)
            ws1['B' + myrow] = '=HYPERLINK("#' + sh + '!A1","' + sh + '")'
            ws1['B' + myrow] = sh

    if os.path.exists(fn) and not overwrite:
        print('file already exists')
        return
    else:
        wb.save(filename = fn)


def populate_template(fn, tables=None):
    name, ext = os.path.splitext(fn)
    template_fn = "{name}{suffix}{ext}".format(name=name, suffix='_template', ext=ext)

    wb = load_workbook(filename = os.path.join('spreadsheets/excel_templates/', template_fn))
    for k in tables:
        ws = wb[k]
        ws['A6'] = tables[k]
    wb.save(filename = os.path.join('spreadsheets/outputs/', fn))


if __name__ == '__main__':
    make_template(
        fn = 'GVA_sector_tables_template.xlsx',
        sheets=[
            "1.1 - GVA current (£bn)",
            "1.1a - GVA current (2010=100)",
            "2.1 - GVA CVM (£bn)",
            "2.1a - GVA CVM (2010=100)"],
        overwrite=True)
    make_template(
        fn = 'GVA_subsector_tables_template.xlsx',
        sheets=[
            "1 - Creative Industries-current",
            "2 - Digital Sector-current",
            "3 - Cultural Sector-current",
            "4 - Computer Games-current",
            "5 - Creative Industries-CVM",
            "6 - Digital Sector-CVM",
            "7 - Cultural Sector-CVM",],
        overwrite=True)

    populate_template(
        fn = 'GVA_sector_tables.xlsx',
        tables={
            "1.1 - GVA current (£bn)": 'ho',
            "1.1a - GVA current (2010=100)": 'hi',
            "2.1 - GVA CVM (£bn)": 'lo',
            "2.1a - GVA CVM (2010=100)": 'sho',
        }
    )
# wb = load_workbook(filename = 'empty_book.xlsx')
# sheet_ranges = wb['range names']
# print(sheet_ranges['D18'].value)