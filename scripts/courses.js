const courses = [
    { code: 'WDD 130', title: 'Web Fundamentals', credits: 3, completed: true, category: 'WDD' },
    { code: 'CSE 110', title: 'Programming Building Blocks', credits: 3, completed: true, category: 'CSE' },
    { code: 'CSE 111', title: 'Programming with Functions', credits: 3, completed: true, category: 'CSE' },
    { code: 'CSE 121', title: 'Programming with Classes', credits: 3, completed: true, category: 'CSE' },
    { code: 'WDD 131', title: 'Dynamic Web Fundamentals', credits: 3, completed: true, category: 'WDD' },
    { code: 'WDD 230', title: 'Web Frontend Development I', credits: 3, completed: true, category: 'WDD' },
    { code: 'WDD 231', title: 'Web Frontend Development II', credits: 3, completed: false, category: 'WDD' },
    { code: 'CSE 122', title: 'Programming and Problem Solving', credits: 3, completed: false, category: 'CSE' }
];

const courseGrid = document.getElementById('courseGrid');
const creditTotal = document.getElementById('creditTotal');
const filterButtons = document.querySelectorAll('.filter-button');

function renderCourses(filter = 'all') {
    let visibleCourses = courses;

    if (filter === 'wdd') {
        visibleCourses = courses.filter((course) => course.category === 'WDD');
    } else if (filter === 'cse') {
        visibleCourses = courses.filter((course) => course.category === 'CSE');
    }

    if (courseGrid) {
        courseGrid.innerHTML = '';
        visibleCourses.forEach((course) => {
            const card = document.createElement('article');
            card.className = `course-card${course.completed ? ' completed' : ''}`;
            card.innerHTML = `
                <div class="course-top">
                    <p class="course-code">${course.code}</p>
                    <span class="status-pill">${course.completed ? 'Completed' : 'Planned'}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-meta">${course.credits} credits • ${course.category} course</p>
            `;
            courseGrid.appendChild(card);
        });
    }

    if (creditTotal) {
        const totalCredits = visibleCourses.reduce((sum, course) => sum + course.credits, 0);
        creditTotal.textContent = `Total credits shown: ${totalCredits}`;
    }
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        renderCourses(button.dataset.filter || 'all');
    });
});

renderCourses();
