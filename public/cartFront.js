const addCartButtons = document.querySelectorAll('.cart');
const cartBadge = document.querySelector('.cart-badge');
const priceElements = document.querySelectorAll('#price');
const priceDiv = document.querySelector('.total-cost')
const quantityInput = document.querySelectorAll('.quantiy');
const quantity = quantityInput.value

console.log(quantity)

let addCart = 0;

addCartButtons.forEach(button => {
  let isAddedToCart = false;

  button.addEventListener('click', () => {
    if (isAddedToCart) {
      console.log(addCart);
      button.style.backgroundColor = "";
      button.innerHTML = "Add to cart";
      cartBadge.innerHTML = addCart;
    } else {
      addCart += 1;
      button.style.backgroundColor = "red";
      button.innerHTML = "Remove from cart";
      cartBadge.innerHTML = addCart;
    }

    isAddedToCart = !isAddedToCart; // Toggle the state
  });
});


let totalCost = 0;

addCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemPrice = parseFloat(button.getAttribute('data-price'));
    if (!isNaN(itemPrice)) {
      if (button.classList.contains('added-to-cart')) {
        totalCost -= itemPrice;
        priceDiv.innerHTML= "ksh "+ totalCost
      } else {
        totalCost += itemPrice;
        priceDiv.innerHTML= "ksh "+ totalCost
      }
    }
    button.classList.toggle('added-to-cart');
  });
});