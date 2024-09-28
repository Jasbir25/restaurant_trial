const categories = ['Today\'s Specials', 'Starters', 'Main Course', 'Beverages', 'Dessert'];
const menuItems = {
    'Today\'s Specials': [
    { name: 'Chef\'s Special Pasta', price: 499, quantity: 0, image: 'images/chefs-special-pasta.jpg', description: 'Handmade pasta with a secret sauce', veg: true },
    { name: 'Soup of the Day', price: 199, quantity: 0, image: 'images/soup-of-the-day.jpg', description: 'Fresh, seasonal ingredients in a hearty broth', veg: true },
    { name: 'Grilled Chicken Chops', price: 799, quantity: 0, image: 'images/grilled-lamb-chops.jpg', description: 'Juicy grilled chicken with aromatic herbs', veg: false },
    { name: 'Stuffed Bell Peppers', price: 349, quantity: 0, image: 'images/stuffed-bell-peppers.jpg', description: 'Bell peppers stuffed with a flavorful vegetable medley', veg: true }
],
'Starters': [
    { name: 'Garlic Bread', price: 149, quantity: 0, image: 'images/garlic-bread.jpg', description: 'Crispy garlic bread with a buttery finish', veg: true },
    { name: 'Bruschetta', price: 199, quantity: 0, image: 'images/bruschetta.jpg', description: 'Toasted bread topped with fresh tomatoes and basil', veg: true },
    { name: 'Fried Calamari', price: 299, quantity: 0, image: 'images/fried-calamari.jpg', description: 'Lightly breaded calamari with a zesty dipping sauce', veg: false },
    { name: 'Stuffed Mushrooms', price: 249, quantity: 0, image: 'images/stuffed-mushrooms.jpg', description: 'Savory mushrooms stuffed with a creamy cheese filling', veg: true }
],
'Main Course': [
    { name: 'Grilled Salmon', price: 699, quantity: 0, image: 'images/grilled-salmon.jpg', description: 'Perfectly grilled salmon served with a lemon butter sauce', veg: false },
    { name: 'Chicken Parmesan', price: 599, quantity: 0, image: 'images/chicken-parmesan.jpg', description: 'Breaded chicken topped with marinara and melted cheese', veg: false },
    { name: 'Chicken Tenderloin', price: 899, quantity: 0, image: 'images/beef-tenderloin.jpg', description: 'Tender grilled chicken with a savory garlic glaze', veg: false },
    { name: 'Vegetarian Lasagna', price: 499, quantity: 0, image: 'images/vegetarian-lasagna.jpg', description: 'Layered lasagna with fresh vegetables and cheese', veg: true }
],
'Beverages': [
    { name: 'Soda', price: 99, quantity: 0, image: 'images/soda.jpg', description: 'Refreshing carbonated beverage of your choice', veg: true },
    { name: 'Iced Tea', price: 129, quantity: 0, image: 'images/iced-tea.jpg', description: 'Chilled tea brewed with fresh lemon and herbs', veg: true },
    { name: 'Lemonade', price: 139, quantity: 0, image: 'images/lemonade.jpg', description: 'Classic lemonade made with freshly squeezed lemons', veg: true },
    { name: 'Cold Coffee', price: 179, quantity: 0, image: 'images/cold-coffee.jpg', description: 'Iced coffee brewed to perfection with a smooth finish', veg: false }
],
'Dessert': [
    { name: 'Chocolate Cake', price: 249, quantity: 0, image: 'images/chocolate-cake.jpg', description: 'Rich chocolate cake with a velvety ganache', veg: true },
    { name: 'Ice Cream', price: 179, quantity: 0, image: 'images/ice-cream.jpg', description: 'Creamy ice cream in a variety of flavors', veg: true },
    { name: 'Tiramisu', price: 299, quantity: 0, image: 'images/tiramisu.jpg', description: 'Classic Italian dessert layered with coffee-soaked biscuits', veg: true },
    { name: 'Apple Pie', price: 229, quantity: 0, image: 'images/apple-pie.jpg', description: 'Warm apple pie with a cinnamon sugar crust', veg: true }
]
,
};

let orders = [];
let currentFilter = 'all';

function initializeApp() {
    createCategoryList();
    loadAllContent();
    document.getElementById('place-order').addEventListener('click', placeOrder);
    document.getElementById('cart-button').addEventListener('click', () => toggleModal('cart-modal'));
    document.getElementById('orders-button').addEventListener('click', () => toggleModal('orders-modal'));

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    document.getElementById('cart-items').addEventListener('click', handleCartItemClick);

    document.getElementById('floating-button').addEventListener('click', toggleCategoryList);

    setupOverlayListeners();

    document.getElementById('all-filter-btn').addEventListener('click', () => handleFilter('all'));
    document.getElementById('veg-filter-btn').addEventListener('click', () => handleFilter('veg'));
    document.getElementById('non-veg-filter-btn').addEventListener('click', () => handleFilter('non-veg'));
}

function createCategoryList() {
    const list = document.getElementById('category-list');
    categories.forEach(category => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = category;
        const targetId = category.toLowerCase().replace(/\s+/g, '-');
        link.href = `#${targetId}`;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.getElementById(targetId);
            smoothScroll(targetElement);
            toggleCategoryList();
        });
        li.appendChild(link);
        list.appendChild(li);
    });
}

function smoothScroll(targetElement) {
    if ('scrollBehavior' in document.documentElement.style) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // ms
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
}

function loadAllContent() {
    const content = document.getElementById('content');
    content.innerHTML = '';
    
    categories.forEach(category => {
        const section = document.createElement('section');
        section.id = category.toLowerCase().replace(/\s+/g, '-');
        section.innerHTML = `
            <h2 class="center-align">${category}</h2>
            <div class="menu-grid"></div>
        `;
        content.appendChild(section);
        showMenuItems(category, section.querySelector('.menu-grid'));
    });

    content.addEventListener('click', handleMenuItemClick);
}

function showMenuItems(category, container) {
    menuItems[category].forEach(item => {
        if (currentFilter === 'all' || 
            (currentFilter === 'veg' && item.veg) || 
            (currentFilter === 'non-veg' && !item.veg)) {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="dish-image">
                <h3>${item.name}</h3>
                <p class="dish-description">${item.description}</p>
                <p class="dish-price">${formatPrice(item.price)}</p>
                <p>${item.veg ? '🥬 Veg' : '🍖 Non-Veg'}</p>
                ${item.quantity === 0 ? 
                    `<button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>` :
                    getQuantityControlsHTML(item.quantity)
                }
            `;
            container.appendChild(itemElement);
        }
    });
}

function getQuantityControlsHTML(quantity) {
    return `
        <div class="quantity-controls">
            <button class="quantity-btn minus" data-action="decrease">-</button>
            <span class="quantity">${quantity}</span>
            <button class="quantity-btn plus" data-action="increase">+</button>
        </div>
    `;
}

function handleMenuItemClick(event) {
    const target = event.target;
    if (target.classList.contains('add-to-cart')) {
        const name = target.getAttribute('data-name');
        const price = parseFloat(target.getAttribute('data-price'));
        addToCart(name, price);
    } else if (target.classList.contains('quantity-btn')) {
        const action = target.getAttribute('data-action');
        const itemElement = target.closest('.menu-item');
        const name = itemElement.querySelector('h3').textContent;
        updateCartItemQuantity(name, action);
    }
}

function addToCart(name, price) {
    const item = findMenuItem(name);
    if (item) {
        item.quantity = 1;
        updateCart();
        showNotification(`${name} has been added to your cart.`, 'success');
        loadAllContent();
    }
}

function updateCartItemQuantity(name, action) {
    const item = findMenuItem(name);
    if (item) {
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease') {
            item.quantity = Math.max(0, item.quantity - 1);
        }
        updateCart();
        loadAllContent();
    }
}

function findMenuItem(name) {
    for (const category in menuItems) {
        const item = menuItems[category].find(item => item.name === name);
        if (item) return item;
    }
    return null;
}

function getCurrentCategory() {
    return document.getElementById('category-title').textContent;
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const template = document.getElementById('cart-item-template');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    for (const category in menuItems) {
        menuItems[category].forEach(item => {
            if (item.quantity > 0) {
                const cartItem = template.content.cloneNode(true);
                cartItem.querySelector('.cart-item-name').textContent = item.name;
                cartItem.querySelector('.quantity').textContent = item.quantity;
                cartItem.querySelector('.price-value').textContent = (item.price * item.quantity).toFixed(2);
                
                cartItems.appendChild(cartItem);
                total += item.price * item.quantity;
            }
        });
    }
    
    cartTotal.textContent = total.toFixed(2);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    let count = 0;
    for (const category in menuItems) {
        count += menuItems[category].reduce((sum, item) => sum + item.quantity, 0);
    }
    cartCount.textContent = count;
}

function handleCartItemClick(event) {
    const target = event.target;
    if (target.classList.contains('quantity-btn')) {
        const action = target.getAttribute('data-action');
        const cartItem = target.closest('.cart-item');
        const name = cartItem.querySelector('.cart-item-name').textContent;
        updateCartItemQuantity(name, action);
        updateCart();
    }
}

function placeOrder() {
    let orderItems = [];
    let subtotal = 0;
    
    for (const category in menuItems) {
        menuItems[category].forEach(item => {
            if (item.quantity > 0) {
                orderItems.push({ ...item });
                subtotal += item.price * item.quantity;
                item.quantity = 0;
            }
        });
    }
    
    if (orderItems.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    const serviceCharge = subtotal * 0.05; // 5% Service Charge
    const cgst = subtotal * 0.025; // 2.5% CGST
    const sgst = subtotal * 0.025; // 2.5% SGST
    const total = subtotal + serviceCharge + cgst + sgst;
    
    const order = { 
        items: orderItems, 
        subtotal: subtotal,
        serviceCharge: serviceCharge,
        cgst: cgst,
        sgst: sgst,
        total: total 
    };
    
    orders.push(order);
    updateCart();
    updateOrders();
    toggleModal('cart-modal');
    showNotification('Your order has been placed successfully!', 'success');
    loadAllContent();
}

function updateOrders() {
    const orderList = document.getElementById('order-list');
    const subtotalElement = document.getElementById('subtotal');
    const serviceChargeElement = document.getElementById('service-charge');
    const cgstElement = document.getElementById('cgst');
    const sgstElement = document.getElementById('sgst');
    const grandTotalElement = document.getElementById('grand-total');
    
    orderList.innerHTML = '';
    let subtotal = 0;
    
    orders.forEach((order, index) => {
        const orderElement = document.createElement('div');
        orderElement.innerHTML = `
            <h3>Order ${index + 1}</h3>
            <ul>
                ${order.items.map(item => `<li>${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
            <p>Subtotal: ₹${order.subtotal.toFixed(2)}</p>
        `;
        orderList.appendChild(orderElement);
        subtotal += order.subtotal;
    });
    
    const serviceCharge = subtotal * 0.05; // 5% Service Charge
    const cgst = subtotal * 0.025; // 2.5% CGST
    const sgst = subtotal * 0.025; // 2.5% SGST
    const grandTotal = subtotal + serviceCharge + cgst + sgst;
    
    subtotalElement.textContent = subtotal.toFixed(2);
    serviceChargeElement.textContent = serviceCharge.toFixed(2);
    cgstElement.textContent = cgst.toFixed(2);
    sgstElement.textContent = sgst.toFixed(2);
    grandTotalElement.textContent = grandTotal.toFixed(2);
}

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        if (modalId === 'cart-modal') {
            updateCart();
        } else if (modalId === 'orders-modal') {
            updateOrders();
        }
    }
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(`notification-${type}`);
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function formatPrice(price) {
    return '₹' + price.toFixed(2);
}

function toggleCategoryList() {
    const list = document.getElementById('category-list');
    const overlay = document.getElementById('overlay');
    const button = document.getElementById('floating-button');
    const isShowing = list.classList.contains('show');
    
    if (isShowing) {
        list.style.transform = 'translateY(15px)';
        list.style.opacity = '0';
        overlay.classList.remove('show');
        button.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            list.classList.remove('show');
            overlay.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    } else {
        list.classList.add('show');
        overlay.style.display = 'block';
        setTimeout(() => {
            list.style.transform = 'translateY(0)';
            list.style.opacity = '1';
            overlay.classList.add('show');
            button.style.transform = 'rotate(90deg)';
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function setupOverlayListeners() {
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            toggleCategoryList();
        }
    });
}

function handleFilter(filter) {
    currentFilter = filter;
    updateFilterButtons();
    loadAllContent();
}

function updateFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.id === `${currentFilter}-filter-btn`) {
            button.classList.add('active');
        }
    });
}

window.addEventListener('load', initializeApp);
