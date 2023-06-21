// Retrieve users from localStorage

const users = JSON.parse(localStorage.getItem("users"));

// Sort users by bestTime (ascending order)

users.sort((a, b) => {
    const timeA = a.bestTime;
    const timeB = b.bestTime;

    if (timeA === null && timeB === null) {
        return 0; // Both times are null, maintain relative order
    } else if (timeA === null) {
        return 1; // timeA is null, place it after timeB
    } else if (timeB === null) {
        return -1; // timeB is null, place it after timeA
    }

    return convertToSeconds(timeA) - convertToSeconds(timeB);
});

// Get the leaderboard body element

const leaderboardBody = document.getElementById("leaderboard-body");

// Generate leaderboard rows

for (let i = 0; i < users.length; i++) {

    const user = users[i];
    const rank = i + 1;

    // Create a new table row

    const row = document.createElement("tr");

    // Create and append the rank cell

    const rankCell = document.createElement("td");
    rankCell.textContent = rank;
    row.appendChild(rankCell);

    // Create and append the username cell

    const usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;
    row.appendChild(usernameCell);

    // Create and append the bestTime cell

    const bestTimeCell = document.createElement("td");
    bestTimeCell.textContent = user.bestTime
    row.appendChild(bestTimeCell);

    // Append the row to the leaderboard body

    leaderboardBody.appendChild(row);
}

function convertToSeconds(time) {
    const timeArray = time.split(':');
    const minutes = parseInt(timeArray[0]);
    const seconds = parseInt(timeArray[1]);

    if (isNaN(minutes) || isNaN(seconds)) {
        return 'Invalid time format';
    }

    return minutes * 60 + seconds;
}