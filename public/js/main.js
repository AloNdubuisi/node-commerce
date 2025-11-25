const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});
// Get products from localStorage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Save products to localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Initialize with sample products if none exist
function initializeSampleProducts() {
    const products = getProducts();
    if (products.length === 0) {
        const sampleProducts = [
            {
                id: 1,
                name: "Wireless Headphones",
                description: "High-quality wireless headphones with noise cancellation",
                price: 99.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
            },
            {
                id: 2,
                name: "Smart Watch",
                description: "Feature-rich smartwatch with fitness tracking",
                price: 199.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
            },
            {
                id: 3,
                name: "Laptop Backpack",
                description: "Durable backpack with laptop compartment",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
            },
            {
                id: 4,
                name: "Wireless Mouse",
                description: "Ergonomic wireless mouse with precision tracking",
                price: 29.99,
                image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"
            }
        ];
        saveProducts(sampleProducts);
    }
}

// Initialize sample products on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSampleProducts);
} else {
    initializeSampleProducts();
}