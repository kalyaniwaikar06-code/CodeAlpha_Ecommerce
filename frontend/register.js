console.log("REGISTER JS LOADED");
async function registerUser() {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const res = await fetch(
        "http://localhost:5000/register",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        }
    );

    const data = await res.json();

    alert(data.message);

    if (
        data.message ===
        "Registration Successful"
    ) {
        window.location.href =
            "login.html";
    }
}