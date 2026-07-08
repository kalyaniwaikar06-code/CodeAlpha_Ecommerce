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
    
    <div class="order-card">

        <h3>📦 Order Placed</h3>

        <p><strong>Customer:</strong> ${order.customerName}</p>

        <p><strong>Total Amount:</strong> <span>₹${order.totalAmount}</span></p>

        <p><strong>Status:</strong> ✅ Delivered</p>

    </div>

    `;

});

    ordersDiv.innerHTML = html;
}

async function clearHistory() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    if (!confirm("Are you sure you want to clear all order history?")) {
        return;
    }

    const res = await fetch(
        `http://localhost:5000/orders/${user.name}`,
        {
            method: "DELETE"
        }
    );

    const data = await res.json();

    alert(data.message);

    loadOrders();

}

// IMPORTANT
loadOrders();