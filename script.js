function changeQuantity(id, name, price, param) {
      let product = {
        'name': name,
        'tag': id,
        'inCart': 1,
        'price': price,
      }

      let cartItems = localStorage.getItem('productsInCart');

      cartItems = cartItems ? JSON.parse(cartItems) : [];
      const currentItem = cartItems.find((el) => el.tag == id);
      currentItem ? currentItem.inCart += param : cartItems.push(product);
      if (currentItem != undefined && currentItem.inCart == 0) {
        cartItems = cartItems.filter((item) => item.tag != id)
      }
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));

      cartNumbers(product, param);
      totalCost(product, param);
      displayCart();
}

function cartNumbers() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    let quantity = 0;
    cartItems.map((item => quantity += item.inCart));

    document.querySelector('.cart span').textContent = quantity;
}

function setItems(product, param) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    const currentItem = cartItems.find((el) => el.tag == product.tag);

    currentItem ? currentItem.inCart += param : cartItems.push(product);

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    displayCart();
}

function removeProduct(id) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    cartItems = cartItems.filter((el) => el.tag != id)
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    displayCart();
    cartNumbers();
}

// Итого в корзине грн
function totalCost() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    let total = 0;
    cartItems.map((item => total += item.inCart * parseFloat(item.price)));

    return total;
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    document.getElementById('signup__button').disabled = cartItems.length == 0;
    let productContainer = document.querySelector(".products")
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <span class="control-btn" id="${item.tag}" onclick="removeProduct(${item.tag})">
                    &times;
                </span>
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <span class="control-btn" id="${item.tag}" onclick="changeQuantity(${item.tag}, '${item.name}', '${item.price}', -1)">
                    &mdash;
                </span>
                <span class="in-cart">${item.inCart}</span>
                <span class="control-btn" id="${item.tag}" onclick="changeQuantity(${item.tag}, '${item.name}', '${item.price}', 1)"> + </span>
            </div>
            <div class="total">
                ${item.inCart * parseFloat(item.price)} грн
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Итого
                <h4 class="basketTotal">${totalCost()} грн</h4>
        `;
    }
}

cartNumbers();
displayCart();

function addCart(form) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    for (let item of cartItems){
        console.log(item);
        const input = document.createElement('input');
        input.name = 'rows';
        input.value = item.tag + "," + item.inCart + "," + item.price.replace(',', '.');
        input.hidden = true;
        form.append(input)
    }
    return true;
}

/* CONTROL PANEL----------------------- */

document.getElementById("receiptId").style.display = "none";


/* SLIDER -------------------------- */

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}











