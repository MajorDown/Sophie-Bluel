const mailInput = document.getElementById("mail-input");
const mdpInput = document.getElementById("mdp-input");
const sendInput = document.getElementById("send-input");
const errorDial = document.getElementById("error-dial");

// REQUETE POST

async function logIn(data) {
  const loginUrl = "http://localhost:5678/api/users/login";
  const loginOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: data,
  };
  return await (await fetch(loginUrl, loginOptions)).json();
}

// DECLENCHER LA REQUETE POST

sendInput.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    const user = JSON.stringify({
      email: mailInput.value,
      password: mdpInput.value,
    });
    const response = await logIn(user);
    console.log(response);
    if (response.userId === 1) {
      sessionStorage.setItem("token", response.token);
      window.location.href = "index.html";
    } else errorDial.style.display = "block";
  } catch (err) {
    console.log(err);
  }
});
