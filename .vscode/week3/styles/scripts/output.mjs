export function setTitle(course) {
  document.querySelector('#courseTitle').textContent = course.title;
}

export function renderSections(sections) {
  const output = document.querySelector('#sections');
  output.innerHTML = '';

  sections.forEach((section) => {
    const li = document.createElement('li');
    li.textContent = `Section ${section.section}: ${section.enrolled} enrolled`;
    output.appendChild(li);
  });
}