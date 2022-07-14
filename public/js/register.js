const form = document.querySelector("#form");
form.addEventListener("submit", async () => {
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const alertEmail = document.querySelector("#emailHelp");
  const alertPass = document.querySelector("#passHelp");
  const alertNama = document.querySelector("#namaHelp");
  const user = { nama, email, password };
  fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((value) => value.json())
    .then((response) => {
      if (response.status == "success") {
        location.href = "/";
      } else {
        const message = response.message;

        if (message.includes("email")) {
          alertEmail.style.display = "block";
        } else {
          alertEmail.style.display = "none";
        }

        if (message.includes("nama")) {
          alertNama.style.display = "block";
        } else {
          alertNama.style.display = "none";
        }

        if (message.includes("password")) {
          alertPass.style.display = "block";
        } else {
          alertPass.style.display = "none";
        }
      }
    });
});

const togglePassword = document.querySelector("#togglePassword");
const pass = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});
