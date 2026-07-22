import byuiCourse from './course.mjs';
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setTitle(byuiCourse);
  setSectionSelection(byuiCourse.sections);
  renderSections(byuiCourse.sections);

  document.querySelector('#enrollStudent').addEventListener('click', () => {
    const sectionNum = Number(document.querySelector('#sectionNumber').value);
    byuiCourse.changeEnrollment(sectionNum);
    renderSections(byuiCourse.sections);
  });

  document.querySelector('#dropStudent').addEventListener('click', () => {
    const sectionNum = Number(document.querySelector('#sectionNumber').value);
    byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections);
  });
});