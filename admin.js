let menuItems = [];
let orders = []; // Initialize orders array

// Initialize the admin page
function initializeAdmin() {
    loadMenuItems();
    loadOrders(); // Load orders when the admin panel initializes
    document.getElementById('menu-form').addEventListener('submit', addMenuItem);
}

// Load menu items from local storage or initialize with sample data
function loadMenuItems() {
    const storedMenuItems = JSON.parse(localStorage.getItem('menuItems'));
    menuItems = storedMenuItems || [];
    renderMenuItems();
}

// Render menu items in the admin panel
function renderMenuItems() {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';
    menuItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
            <h3>${item.name} ${item.outOfStock ? '(Out of Stock)' : ''}</h3>
            <p>Price: ₹${item.price}</p>
            <p>${item.description}</p>
            <img src="${item.image}" alt="${item.name}" class="dish-image" style="width: 100px;">
            <p>${item.veg ? '🥬 Veg' : '🍖 Non-Veg'}</p>
            <button onclick="toggleOutOfStock(${index})">${item.outOfStock ? 'Mark as Available' : 'Mark as Out of Stock'}</button>
            <button onclick="deleteMenuItem(${index})">Delete</button>
        `;
        menuList.appendChild(itemElement);
    });
}

// Add a new menu item
function addMenuItem(event) {
    event.preventDefault();
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const description = document.getElementById('item-description').value;
    const image = document.getElementById('item-image').files[0];
    const category = document.getElementById('item-category').value;
    const veg = document.getElementById('item-veg').checked;

    const reader = new FileReader();
    reader.onload = function(e) {
        const newItem = {
            name,
            price,
            description,
            image: e.target.result,
            category,
            veg,
            outOfStock: false
        };
        menuItems.push(newItem);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        renderMenuItems();
        document.getElementById('menu-form').reset();
    };
    if (image) {
        reader.readAsDataURL(image);
    }
}

// Toggle out of stock status
function toggleOutOfStock(index) {
    menuItems[index].outOfStock = !menuItems[index].outOfStock;
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    renderMenuItems();
}

// Delete a menu item
function deleteMenuItem(index) {
    menuItems.splice(index, 1);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    renderMenuItems();
}

// Load orders from local storage
function loadOrders() {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || []; // Load orders from local storage
    orders = storedOrders; // Assign to the orders array
    renderOrders(); // Render the orders in the admin panel
}

// Render orders in the admin panel
function renderOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // Clear the current order list

    if (orders.length === 0) {
        orderList.innerHTML = '<p>No orders placed yet.</p>'; // Message if no orders
        return;
    }

    orders.forEach((order, index) => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item'; // Add a class for styling
        orderElement.innerHTML = `
            <h3>Order ${index + 1} (Table ${order.tableNumber})</h3>
            <ul>
                ${order.items.map(item => `<li>${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
            <p>Subtotal: ₹${order.subtotal.toFixed(2)}</p>
            <p>Service Charge: ₹${order.serviceCharge.toFixed(2)}</p>
            <p>CGST: ₹${order.cgst.toFixed(2)}</p>
            <p>SGST: ₹${order.sgst.toFixed(2)}</p>
            <p><strong>Total: ₹${order.total.toFixed(2)}</strong></p>
        `;
        orderList.appendChild(orderElement); // Append the order element to the order list
    });
}

// Confirm an order
function confirmOrder(index) {
    // Logic to confirm the order (e.g., update status)
    alert(`Order ${index + 1} confirmed!`);
}

// Cancel an order
function cancelOrder(index) {
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
}

// Initialize the admin page on load
window.addEventListener('load', initializeAdmin);