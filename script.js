// --- MOBILE NAVIGATION TOGGLE ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburgerBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
});

// --- COUNTDOWN TIMER ---
const countDownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000);

setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}, 1000);

// --- PRODUCTS DATA ---
const products = [
    { id: 1, title: 'iPhone 17 Pro Max (256GB)', category: 'apple', price: 134900, oldPrice: 149900, badge: '₹15,000 OFF', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600' },
    { id: 2, title: 'Samsung Galaxy S26 Ultra', category: 'samsung', price: 121999, oldPrice: 139999, badge: '₹18,000 OFF', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600' },
    { id: 3, title: 'OnePlus 13 Pro 5G', category: 'oneplus', price: 64999, oldPrice: 72999, badge: '₹8,000 OFF', img: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=600' },
    { id: 4, title: 'Apple AirPods Pro (2nd Gen)', category: 'accessories', price: 19900, oldPrice: 24900, badge: '20% OFF', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=600' },
    { id: 5, title: 'Samsung Galaxy Watch 7 Pro', category: 'accessories', price: 34999, oldPrice: 41999, badge: '₹7,000 OFF', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600' },
    { id: 6, title: 'iPhone 16 (128GB)', category: 'apple', price: 69999, oldPrice: 79999, badge: '₹10,000 OFF', img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=600' },
];

const productContainer = document.getElementById('product-container');
let cartCount = 0;

function displayProducts(filter) {
    productContainer.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="product-badge">${product.badge}</span>
            <div class="product-img">
                <img src="${product.img}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <span class="old-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart('${product.title}')">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

// --- FILTER FUNCTIONALITY ---
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayProducts(btn.getAttribute('data-filter'));
    });
});

function filterByCategory(category) {
    filterBtns.forEach(b => {
        if(b.getAttribute('data-filter') === category) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    displayProducts(category);
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

// --- CART FUNCTIONALITY ---
function addToCart(title) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    showToast(`Added "${title}" to your cart!`);
}

document.getElementById('cart-btn').addEventListener('click', () => {
    if(cartCount === 0) {
        showToast('Your cart is empty! Select a device to begin.');
    } else {
        showToast(`You have ${cartCount} item(s) in your cart.`);
    }
});

// --- TOAST NOTIFICATION HELPER ---
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initial render
displayProducts('all');