from pathlib import Path
import zipfile
import re
p = Path('c:/Users/TechCharities/OneDrive/Web Frontend development 1/wdd231/finalproject/Website Project Proposal-PAVI Projects.docx')
print('exists', p.exists())
if p.exists():
    with zipfile.ZipFile(p) as z:
        xml = z.read('word/document.xml').decode('utf-8')
    text = re.sub(r'<[^>]+>', ' ', xml)
    text = re.sub(r'\s+', ' ', text)
    print(text[:50000])
