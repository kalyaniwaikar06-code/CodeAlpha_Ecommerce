const container = document.getElementById("cart-container");
const totalBox = document.getElementById("total");

async function loadCart() {
    try {

        const res = await fetch("http://localhost:5000/cart");
        const data = await res.json();

        container.innerHTML = "";

        let total = 0;

        data.forEach(item => {

            total += item.price;

            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
                <h3>${item.productName}</h3>
                <p>₹${item.price}</p>

                <button onclick="deleteItem('${item._id}')">
                    Remove
                </button>
            `;

            container.appendChild(div);
        });

        totalBox.innerText = "Total Price: ₹" + total;

    } catch (error) {
        console.log(error);
    }
}

async function deleteItem(id) {

    await fetch(`http://localhost:5000/cart/${id}`, {
        method: "DELETE"
    });

    loadCart();
}

loadCart();

async function placeOrder() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const res = await fetch(
        "http://localhost:5000/order",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                customerName: user.name
            })
        }
    );

    const data = await res.json();

    alert(
        data.message +
        "\nTotal Amount: ₹" +
        data.totalAmount
    );

    loadCart();
}