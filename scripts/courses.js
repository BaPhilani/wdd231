const courses = [
    {
        code: 'WDD 130',
        title: 'Web Fundamentals',
        credits: 2,
        completed: true,
        category: 'WDD',
        description: 'Foundational web course covering semantic HTML, accessible structure, CSS basics, and publishing workflows.',
        certificate: 'Web and Computer Programming',
        technologyStack: 'HTML, CSS'
    },
    {
        code: 'CSE 110',
        title: 'Programming Building Blocks',
        credits: 2,
        completed: true,
        category: 'CSE',
        description: 'Introduces computational thinking, variables, conditionals, loops, and problem-solving patterns.',
        certificate: 'Web and Computer Programming',
        technologyStack: 'JavaScript'
    },
    {
        code: 'CSE 111',
        title: 'Programming with Functions',
        credits: 2,
        completed: true,
        category: 'CSE',
        description: 'Focuses on writing reusable functions, organizing logic, and improving code readability and testing habits.',
        certificate: 'Web and Computer Programming',
        technologyStack: 'JavaScript'
    },
    {
        code: 'CSE 121',
        title: 'Programming with Classes',
        credits: 2,
        completed: true,
        category: 'CSE',
        description: 'Covers object-oriented design principles, class relationships, and maintainable software structure.',
        certificate: 'Web and Computer Programming',
        technologyStack: 'JavaScript'
    },
    {
        code: 'WDD 131',
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true,
        category: 'WDD',
        description: 'Builds interactive pages with DOM scripting, events, data-driven rendering, and responsive UI behavior.',
        certificate: 'Web and Computer Programming',
        technologyStack: 'HTML, CSS, JavaScript'
    },
    {
        code: 'WDD 230',
        title: 'Web Frontend Development I',
        credits: 2,
        completed: false,
        category: 'WDD',
        description: 'Develops production-ready front-end workflows with accessibility checks, API integration, and component-based pages.',
        certificate: 'Web and Computer Programming',
        technologyStack: 'HTML, CSS, JavaScript, JSON APIs'
    }
];

const courseGrid = document.getElementById('courseGrid');
const creditTotal = document.getElementById('creditTotal');
const filterButtons = document.querySelectorAll('.filter-button');
const courseDetails = document.getElementById('course-details');

function getSubjectAndNumber(code) {
    const [subject = '', number = ''] = code.split(' ');
    return { subject, number };
}

function closeCourseDetails() {
    if (courseDetails && courseDetails.open) {
        courseDetails.close();
    }
}

function displayCourseDetails(course) {
    if (!courseDetails) {
        return;
    }

    const { subject, number } = getSubjectAndNumber(course.code);
    courseDetails.innerHTML = `
        <button type="button" class="dialog-close" aria-label="Close course details">Close</button>
        <h2>${subject} ${number}: ${course.title}</h2>
        <p class="dialog-status">${course.completed ? 'Completed' : 'Planned'}</p>
        <dl class="dialog-details">
            <div>
                <dt>Subject and Number</dt>
                <dd>${subject} ${number}</dd>
            </div>
            <div>
                <dt>Title</dt>
                <dd>${course.title}</dd>
            </div>
            <div>
                <dt>Credits</dt>
                <dd>${course.credits}</dd>
            </div>
            <div>
                <dt>Description</dt>
                <dd>${course.description}</dd>
            </div>
            <div>
                <dt>Certificate</dt>
                <dd>${course.certificate}</dd>
            </div>
            <div>
                <dt>Technology Stack</dt>
                <dd>${course.technologyStack}</dd>
            </div>
        </dl>
    `;

    const closeButton = courseDetails.querySelector('.dialog-close');
    closeButton?.addEventListener('click', closeCourseDetails);
    courseDetails.showModal();
}

function setupDialogOutsideClickClose() {
    if (!courseDetails) {
        return;
    }

    courseDetails.addEventListener('click', (event) => {
        const rect = courseDetails.getBoundingClientRect();
        const clickedOutside =
            event.clientX < rect.left
            || event.clientX > rect.right
            || event.clientY < rect.top
            || event.clientY > rect.bottom;

        if (clickedOutside) {
            closeCourseDetails();
        }
    });
}

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
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${course.code} ${course.title}`);
            card.innerHTML = `
                <div class="course-top">
                    <p class="course-code">${course.code}</p>
                    <span class="status-pill">${course.completed ? 'Completed' : 'Planned'}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-meta">${course.credits} credits • ${course.category} course</p>
            `;

            card.addEventListener('click', () => {
                displayCourseDetails(course);
            });

            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    displayCourseDetails(course);
                }
            });

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

setupDialogOutsideClickClose();
renderCourses();
