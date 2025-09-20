// 1- Fetch all the products using the following API: Link "https://dummyjson.com/products".
// 2- The JSON you get from the API contain detail of each product, such as title, price, rating, images, etc.
// 3- Each product fetched from the API should be displayed on the screen.
// 4- The API gives you more than one image for each product. The product should be displayed in such a way that it should have the option to toggle the images to the next or previous images.
// 5- Each product should have the corresponding "Add to Cart" option, which should be able to add the corresponding product to the cart.
// 6- There should be a cart button at the top page on click, of which the content of the page could be toggled from the cart section to all product sections and vice-versa.
// 7- The cart section should display all the products that have been added by the user with the quantity.
// 8- There should be an option to decrease the quantity of the product or remove the product from the cart.
// 9- In the cart section, there should be a "checkout" button on click of which an alert should be shown with the total price to be paid by the user.

const productsContainer = document.querySelector(".products");
const cartSection = document.getElementById("cart");
const cartBtn = document.getElementById("cartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

let products = [];
let cart = [];
let showingCart = false;

// Fetch products from API
async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  products = data.products;
  renderProducts();
}

// Render all products
function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    let currentImageIndex = 0;

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const img = document.createElement("img");
    img.src = product.images[currentImageIndex];
    img.alt = product.title;
    img.width = 200;

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => {
      currentImageIndex = (currentImageIndex + 1) % product.images.length;
      img.src = product.images[currentImageIndex];
    };

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.onclick = () => {
      currentImageIndex =
        (currentImageIndex - 1 + product.images.length) % product.images.length;
      img.src = product.images[currentImageIndex];
    };

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `Price: $${product.price}`;

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${product.rating}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.onclick = () => addToCart(product);

    productDiv.appendChild(img);
    productDiv.appendChild(prevBtn);
    productDiv.appendChild(nextBtn);
    productDiv.appendChild(title);
    productDiv.appendChild(price);
    productDiv.appendChild(rating);
    productDiv.appendChild(addToCartBtn);

    productsContainer.appendChild(productDiv);
  });
}

// Add product to cart
function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

// Render cart
function renderCart() {
  cartSection.innerHTML = "<h2>Cart</h2>";
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    const name = document.createElement("span");
    name.textContent = `${item.title} - $${item.price} x ${item.quantity}`;

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.onclick = () => {
      item.quantity++;
      renderCart();
    };

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.onclick = () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter((cartItem) => cartItem.id !== item.id);
      }
      renderCart();
    };

    itemDiv.appendChild(name);
    itemDiv.appendChild(increaseBtn);
    itemDiv.appendChild(decreaseBtn);

    cartSection.appendChild(itemDiv);
  });
}

// Toggle between cart and products
cartBtn.addEventListener("click", () => {
  showingCart = !showingCart;
  if (showingCart) {
    productsContainer.style.display = "none";
    cartSection.style.display = "block";
  } else {
    productsContainer.style.display = "block";
    cartSection.style.display = "none";
  }
});

// Checkout button
checkoutBtn.addEventListener("click", () => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Total price: $${total}`);
});

// Initialize
fetchProducts();
