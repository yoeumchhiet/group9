// script.js

// Cart array to store items
let cart = [];

// Get DOM elements
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.querySelector('.subtotal');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Function to update the cart display
function updateCart() {
    cartItemsContainer.innerHTML = ''; // Clear current cart display
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Create cart item HTML
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update subtotal
    subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}

// Function to update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;

    // Remove item if quantity is 0
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        // Check if item already exists in cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    });
});

// Initial cart render
updateCart();