const form = document.querySelector("#form");
form.addEventListener("submit", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const alertEmail = document.querySelector("#emailHelp");
  const alertPass = document.querySelector("#passHelp");
  const user = { email, password };
  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((value) => value.json())
    .then((response) => {
      if (response.status == "success") {
        location.href = "/home";
      } else {
        if (response.status == "errorEmail") {
          alertEmail.style.display = "block";
        } else if (response.message == "Password anda salah") {
          alertEmail.style.display = "none";
          alertPass.style.display = "block";
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
