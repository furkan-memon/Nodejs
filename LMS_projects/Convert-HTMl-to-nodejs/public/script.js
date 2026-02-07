const loading = document.getElementById("loading");
const profile = document.getElementById("profile");

const nameEl = document.getElementById("name");
const roleEl = document.getElementById("role");
const cityEl = document.getElementById("city");
const skillsEl = document.getElementById("skills");
const refreshBtn = document.getElementById("refresh");

async function loadProfile() {
  loading.style.display = "block";
  profile.classList.add("hidden");
  skillsEl.innerHTML = "";

  try {
    const userRes = await fetch("/api/user");
    const user = await userRes.json();

    const skillsRes = await fetch("/api/skills");
    const skills = await skillsRes.json();

    nameEl.textContent = user.name;
    roleEl.textContent = user.role;
    cityEl.textContent = user.city;

    skills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsEl.appendChild(li);
    });

    loading.style.display = "none";
    profile.classList.remove("hidden");
  } catch (err) {
    loading.textContent = "Failed to load data";
  }
}

refreshBtn.addEventListener("click", loadProfile);

loadProfile();
