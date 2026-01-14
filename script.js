// =======================
// DATA KERANJANG (LOCAL STORAGE)
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// =======================
// HITUNG TOTAL SAAT LOAD
// =======================
cart.forEach(item => total += item.price);

// =======================
// SEARCH PRODUK
// =======================
function searchProduct() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const name = product.querySelector("h3").innerText.toLowerCase();
    product.style.display = name.includes(keyword) ? "block" : "none";
  });
}

// =======================
// TAMBAH KE KERANJANG
// =======================
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();

  // auto scroll ke cart
  document.getElementById("cart").scrollIntoView({ behavior: "smooth" });

  // animasi cart
  const cartBtn = document.getElementById("cartBtn");
  cartBtn.classList.add("cart-animate");
  setTimeout(() => cartBtn.classList.remove("cart-animate"), 400);
}

// =======================
// TAMPILKAN KERANJANG
// =======================
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Keranjang masih kosong</p>";
  }

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>Rp ${item.price.toLocaleString()}</span>
        <button onclick="removeItem(${index})">✕</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total.toLocaleString();
}

// =======================
// HAPUS ITEM
// =======================
function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// =======================
// SCROLL KE CART
// =======================
function scrollToCart() {
  document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
}

// =======================
// CHECKOUT
// =======================
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong");
    return;
  }

  document.getElementById("payment").style.display = "block";
  document.getElementById("payment").scrollIntoView({ behavior: "smooth" });
}

// =======================
// PROSES PEMBAYARAN
// =======================
function processPayment() {
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  );

  if (!selectedPayment) {
    alert("Pilih metode pembayaran");
    return;
  }

  alert(`Pembayaran via ${selectedPayment.value} berhasil! (simulasi)`);

  // reset
  cart = [];
  total = 0;
  localStorage.removeItem("cart");
  renderCart();

  document.getElementById("payment").style.display = "none";

  document.querySelectorAll('input[name="payment"]').forEach(r => r.checked = false);
}

// =======================
// LOAD AWAL
// =======================
renderCart();

// =======================
// FEEDBACK PELANGGAN
// =======================
let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

function submitFeedback() {
  const name = document.getElementById("fbName").value;
  const rating = document.getElementById("fbRating").value;
  const message = document.getElementById("fbMessage").value;

  if (!name || !rating || !message) {
    alert("Lengkapi semua field ulasan");
    return;
  }

  feedbacks.push({ name, rating, message });
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  document.getElementById("fbName").value = "";
  document.getElementById("fbRating").value = "";
  document.getElementById("fbMessage").value = "";

  renderFeedback();
}

function renderFeedback() {
  const list = document.getElementById("feedbackList");
  list.innerHTML = "";

  feedbacks.forEach(fb => {
    list.innerHTML += `
      <div class="feedback-item">
        <strong>${fb.name}</strong> - ${"⭐".repeat(fb.rating)}
        <p>${fb.message}</p>
      </div>
    `;
  });
}

renderFeedback();