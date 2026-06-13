const container = document.getElementById("products");

// ========================
// LOAD PRODUCTS
// ========================
async function loadProducts() {
    try {

        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();

        container.innerHTML = "";

        data.forEach((product) => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <p>${product.description}</p>

                <button onclick="addToCart('${product.name}', ${product.price})">
                    Add To Cart
                </button>
                <button onclick="deleteProduct('${product._id}')">
                 Delete Product
                </button>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.log("LOAD ERROR:", error);
    }
}

// ========================
// ADD TO CART
// ========================
function addToCart(name, price) {

    fetch("http://localhost:5000/cart", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            productName: name,
            price: price
        })
    })
    .then(res => res.json())
    .then(data => {

        alert(name + " Added To Cart 🛒");

        console.log(data);

    })
    .catch(err => {
        console.log(err);
    });
}

// ========================
// WELCOME USER
// ========================
const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("welcome").innerText =
        "Welcome, " + user.name + " 👋";
}
function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";
}
async function deleteProduct(id) {

    const confirmDelete =
        confirm("Delete this product?");

    if (!confirmDelete) return;

    await fetch(
        `http://localhost:5000/products/${id}`,
        {
            method: "DELETE"
        }
    );

    alert("Product Deleted");

    loadProducts();
}
// ========================
// START
// ========================
loadProducts();