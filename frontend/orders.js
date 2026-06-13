const ordersDiv =
    document.getElementById("orders");

async function loadOrders() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    console.log("USER:", user);

    if (!user) {

        alert("Please Login First");

        window.location.href = "login.html";

        return;
    }

    console.log(
        `http://localhost:5000/orders/${user.name}`
    );

    const res = await fetch(
        `http://localhost:5000/orders/${user.name}`
    );

    const data = await res.json();

    console.log("ORDERS:", data);

    let html = "";

    if (data.length === 0) {

        html = "<h2>No Orders Found</h2>";
    }

    data.forEach(order => {

        html += `
            <div class="card">
                <h3>${order.customerName}</h3>
                <p>Total Amount: ₹${order.totalAmount}</p>
            </div>
        `;
    });

    ordersDiv.innerHTML = html;
}

// IMPORTANT
loadOrders();