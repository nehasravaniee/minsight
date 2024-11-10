document.addEventListener('DOMContentLoaded', () => {
    const suggestionsContainer = document.getElementById('suggestions');
    const username = localStorage.getItem('username');

    // Function to get previous scores for the logged-in user
    function getPreviousScores() {
        return JSON.parse(localStorage.getItem(`${username}_previousScores`)) || [];
    }

    // Load previous score from localStorage if available
    const previousScores = getPreviousScores();
    const userScore = previousScores.length > 0 ? previousScores[previousScores.length - 1].score : null;

    function getActivitySuggestions(score) {
        let suggestions = '';

        if (score !== null) {
            if (score >= 0 && score <= 20) {
                suggestions = `
                    <h2>Relaxing Activities</h2>
                    <ul>
                        <li>Read a book</li>
                        <li>Listen to calming music</li>
                        <li>Meditate</li>
                        <li>Take a walk in nature</li>
                        <li>Watch a movie</li>
                        <li>Practice deep breathing exercises</li>
                        <li>Take a relaxing bath</li>
                    </ul>
                `;
            } else if (score > 20 && score <= 40) {
                suggestions = `
                    <h2>Physical Activities</h2>
                    <ul>
                        <li>Go for a run</li>
                        <li>Join a gym class</li>
                        <li>Play a sport</li>
                        <li>Go swimming</li>
                        <li>Do a home workout</li>
                        <li>Go hiking</li>
                        <li>Try yoga or pilates</li>
                    </ul>
                `;
            } else if (score > 40 && score <= 60) {
                suggestions = `
                    <h2>Creative Activities</h2>
                    <ul>
                        <li>Paint or draw</li>
                        <li>Write a story</li>
                        <li>Learn to play an instrument</li>
                        <li>Do some DIY crafts</li>
                        <li>Take photos</li>
                        <li>Try cooking or baking</li>
                        <li>Start a journal</li>
                    </ul>
                `;
            } else {
                suggestions = `<p>Invalid score. Please enter a score between 0 and 60.</p>`;
            }
        } else {
            suggestions = `<p>No previous score found. Please complete the test first.</p>`;
        }

        return suggestions;
    }

    const suggestions = getActivitySuggestions(userScore);
    suggestionsContainer.innerHTML = suggestions;
});

function goBack() {
    window.history.back();
}