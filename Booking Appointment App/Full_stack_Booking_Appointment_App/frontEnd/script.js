const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

window.addEventListener("DOMContentLoaded", getUsers);

async function getUsers() {
  try {
    const response = await axios.get("http://localhost:3000/users");
    response.data.forEach((user) => showUserOnScreen(user));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

userForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("Please fill out both fields.");
    return;
  }

  const userData = { name, email };

  try {
    const response = await axios.post("http://localhost:3000/users/add-user",userData);
    showUserOnScreen(response.data);
    userForm.reset();
  } catch (error) {
    console.error("Error adding user:", error);
  }
});

function showUserOnScreen(user) {
  const userDiv = document.createElement("div");
  userDiv.className = "user-card";
  userDiv.id = `user-${user.id}`;

  userDiv.innerHTML = `
        <div class="user-info"><strong>${user.name}</strong> — ${user.email}</div>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      `;

  userList.appendChild(userDiv);
}

async function deleteUser(userId) {
  try {
    await axios.delete(`http://localhost:3000/users/delete-user/${userId}`);
    const userDiv = document.getElementById(`user-${userId}`);
    if (userDiv) {
      userDiv.remove();
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}