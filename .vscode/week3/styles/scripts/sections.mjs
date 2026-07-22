export function setSectionSelection(sections) {
  const sectionSelect = document.querySelector('#sectionNumber');
  sectionSelect.innerHTML = '';

  sections.forEach((section) => {
    const option = document.createElement('option');
    option.value = section.section;
    option.textContent = section.section;
    sectionSelect.appendChild(option);
  });
}