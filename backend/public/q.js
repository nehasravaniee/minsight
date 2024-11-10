
document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');
    const menuContainer = document.getElementById('menu-container');
    let userScore = null; // Variable to store user's score

    // Load the logged-in user's username from localStorage
    const username = localStorage.getItem('username');
    
    // Function to get previous scores for the logged-in user
    function getPreviousScores() {
        return JSON.parse(localStorage.getItem(`${username}_previousScores`)) || [];
    }

    // Function to set previous scores for the logged-in user
    function setPreviousScores(scores) {
        localStorage.setItem(`${username}_previousScores`, JSON.stringify(scores));
    }

    // Load previous score from localStorage if available
    const previousScores = getPreviousScores();
    if (previousScores.length > 0) {
        userScore = previousScores[previousScores.length - 1].score;
    }

    function showActivitySuggestions() {
        if (userScore !== null) {
            window.location.href = 'ac.html'; // Redirect to activity suggestions page
        } else {
            alert('Please complete the test first.');
        }
    }

    function getRandomQuestions(questions, num) {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function createQuestionBlock(question, index) {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');

        const questionText = document.createElement('p');
        questionText.textContent = question;
        questionBlock.appendChild(questionText);

        const options = document.createElement('div');
        options.classList.add('options');

        const optionValues = {
            'Never': 0,
            'Rarely': 1,
            'Sometimes': 2,
            'Often': 3,
            'Always': 4
        };

        Object.keys(optionValues).forEach(option => {
            const label = document.createElement('label');
            label.classList.add('option');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `q${index}`;
            input.value = optionValues[option];

            const circle = document.createElement('span');
            circle.classList.add('circle');

            const labelText = document.createElement('span');
            labelText.classList.add('label');
            labelText.textContent = option;

            label.appendChild(input);
            label.appendChild(circle);
            label.appendChild(labelText);
            options.appendChild(label);
        });

        questionBlock.appendChild(options);
        return questionBlock;
    }

    function loadTest() {
        contentContainer.innerHTML = '<h1>Wellness Check-in</h1><form id="survey-form"></form><button type="submit" form="survey-form">Submit</button>';
        const form = document.getElementById('survey-form');

        const selectedQuestions = getRandomQuestions(questions, 15);
        selectedQuestions.forEach((question, index) => {
            const questionBlock = createQuestionBlock(question, index + 1);
            form.insertBefore(questionBlock, form.lastElementChild);
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            let totalScore = 0;
            formData.forEach((value) => {
                totalScore += parseInt(value);
            });

            // Store the score in localStorage
            const timestamp = new Date().toLocaleString();
            const previousScores = getPreviousScores();
            previousScores.push({score: totalScore, timestamp: timestamp});
            setPreviousScores(previousScores);

            alert('Survey submitted! Your score is ' + totalScore);
            loadPreviousScores();
        });

        menuContainer.style.display = 'none'; // Hide the menu
    }

    function loadPreviousScores() {
        const previousScores = getPreviousScores();
        contentContainer.innerHTML = '<h1>Previous Scores</h1><ul>' + previousScores.map(scoreEntry => `<li>Your previous score: ${scoreEntry.score} (on ${scoreEntry.timestamp})</li>`).join('') + '</ul>';
        contentContainer.innerHTML += '<button onclick="goBack()">Go Back</button>';
    }

    function loadScoreGraph() {
        const previousScores = getPreviousScores();
        contentContainer.innerHTML = '<h1>Score Graph</h1><canvas id="scoreChart" width="400" height="400"></canvas>';
        contentContainer.innerHTML += '<button onclick="goBack()">Go Back</button>';

        const ctx = document.getElementById('scoreChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: previousScores.map((entry, index) => index + 1),
                datasets: [{
                    label: 'Scores',
                    data: previousScores.map(entry => entry.score),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function goBack() {
        contentContainer.innerHTML = '';
        menuContainer.style.display = 'flex';
    }

    document.getElementById('complete-test').addEventListener('click', loadTest);
    document.getElementById('previous-scores').addEventListener('click', loadPreviousScores);
    document.getElementById('score-graph').addEventListener('click', loadScoreGraph);
    document.getElementById('activity-suggestions').addEventListener('click', showActivitySuggestions);
});
