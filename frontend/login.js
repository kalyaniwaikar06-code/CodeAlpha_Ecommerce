async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const res = await fetch(
        "http://localhost:5000/login",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await res.json();

    alert(data.message);

    if (data.message === "Login Successful") {

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        window.location.href =
            "index.html";
    }
}