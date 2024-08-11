// Mock Data Storage
let courses = [];
let lectures = [];

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    if (sectionId === 'courses') {
        displayCourses();
    } else if (sectionId === 'addLecture') {
        populateCourseDropdown();
    }
}

function displayCourses() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';
    courses.forEach(course => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <img src="${course.image}" alt="${course.name}" class="course-image"/>
            <strong>${course.name}</strong> (${course.level})
            <p>${course.description}</p>
        `;
        courseList.appendChild(li);
    });
}

function populateCourseDropdown() {
    const courseSelect = document.getElementById('courseSelect');
    courseSelect.innerHTML = '';
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.name;
        courseSelect.appendChild(option);
    });
}

function addLectureField() {
    const lectureFields = document.getElementById('lectureFields');
    const lectureIndex = lectureFields.children.length;

    const lectureDiv = document.createElement('div');
    lectureDiv.className = 'lecture-group';

    lectureDiv.innerHTML = `
        <h5>Lecture ${lectureIndex + 1}</h5>
        <div class="form-group">
            <label for="lectureTitle_${lectureIndex}">Lecture Title</label>
            <input type="text" class="form-control" id="lectureTitle_${lectureIndex}" required>
        </div>
        <div class="form-group">
            <label for="lectureDate_${lectureIndex}">Lecture Date</label>
            <input type="datetime-local" class="form-control" id="lectureDate_${lectureIndex}" required>
        </div>
    `;

    lectureFields.appendChild(lectureDiv);
}

document.getElementById('courseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const courseName = document.getElementById('courseName').value;
    const courseDescription = document.getElementById('courseDescription').value;
    const courseLevel = document.getElementById('courseLevel').value;
    const courseImage = document.getElementById('courseImage').files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        const newCourse = {
            id: courses.length + 1,
            name: courseName,
            description: courseDescription,
            level: courseLevel,
            image: e.target.result,  // Base64 encoded image
        };

        courses.push(newCourse);
        document.getElementById('courseForm').reset();
        showSection('courses');
    };
    reader.readAsDataURL(courseImage);
});

document.getElementById('lectureForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const courseId = document.getElementById('courseSelect').value;
    const lectureFields = document.getElementById('lectureFields');
    const lectureGroups = lectureFields.querySelectorAll('.lecture-group');

    lectureGroups.forEach((group, index) => {
        const lectureTitle = document.getElementById(`lectureTitle_${index}`).value;
        const lectureDate = document.getElementById(`lectureDate_${index}`).value;

        const newLecture = {
            id: lectures.length + 1,
            courseId: courseId,
            title: lectureTitle,
            date: lectureDate,
        };

        lectures.push(newLecture);
    });

    document.getElementById('lectureForm').reset();
    lectureFields.innerHTML = ''; // Clear lecture fields
    alert('Lectures added successfully!');
    showSection('courses');
});

// Initialize with one lecture field
addLectureField();
