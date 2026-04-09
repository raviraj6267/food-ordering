let cart = [];

// Toggle Cart
function toggleCart() {
  let cartBox = document.getElementById("cart");
  cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
}

// Add to Cart
function addToCart(name, price) {
  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
}

// Update Cart
function updateCart() {
  let cartItems = document.getElementById("cart-items");
  let total = document.getElementById("total");
  let count = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let totalPrice = 0;
  let totalCount = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price * item.qty;
    totalCount += item.qty;

    cartItems.innerHTML += `
      <li>
        ${item.name}
        <button onclick="decreaseQty(${index})">➖</button>
        ${item.qty}
        <button onclick="increaseQty(${index})">➕</button>
        = ₹${item.price * item.qty}
        <button onclick="removeItem(${index})">❌</button>
      </li>
    `;
  });

  total.innerText = totalPrice;
  count.innerText = totalCount;
}

// Quantity control
function increaseQty(index) {
  cart[index].qty++;
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Place Order
function placeOrder() {
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;
  let btn = document.querySelector(".checkout button");

  if (!name || !address || !phone) {
    alert("Fill all details");
    return;
  }

  let bill = document.getElementById("bill-details");
  let total = 0;
  let html = "";

  cart.forEach(item => {
    html += `<p>${item.name} x ${item.qty} = ₹${item.price * item.qty}</p>`;
    total += item.price * item.qty;
  });

  bill.innerHTML = `
    <p><b>Name:</b> ${name}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Address:</b> ${address}</p>
    <hr>
    ${html}
    <hr>
    <h3>Total: ₹${total}</h3>
  `;

  // Show invoice
  document.getElementById("bill").style.display = "flex";

  // 🔥 Change button text
  btn.innerText = "Order Done ✅";
  btn.style.background = "green";

  // Clear cart
  cart = [];
  updateCart();
}

  bill.innerHTML = `
    <p><b>Name:</b> ${name}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Address:</b> ${address}</p>
    <hr>
    ${html}
    <hr>
    <h3>Total: ₹${total}</h3>
  `;

  document.getElementById("bill").style.display = "flex";

  cart = [];
  updateCart();


// Close bill
function closeBill() {
  document.getElementById("bill").style.display = "none";
}