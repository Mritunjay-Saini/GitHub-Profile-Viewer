async function getProfile() {
  const username = document.getElementById("usernameInput").value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    console.log(data);

    profileDiv.innerHTML = `
      <div class="profile-card">
        <img src="${data.avatar_url}" alt="${data.login}'s avatar" width="100" />
        <h2>${data.name || data.login}</h2>
        <p><strong>Bio:</strong> ${data.bio || "N/A"}</p>
        <p><strong>Location:</strong> ${data.location || "Unknown"}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
        <p><strong>Follower:</strong>${data.followers || "No active Follower"}</p>
        <p><strong>Following:</strong>${data.followings || "No active Following"}</p>
      </div>
    `;
  } catch (error) {
    profileDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
