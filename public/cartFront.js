/* 
let displayCost = document.querySelector('.totalcost');
let cartButtons = document.querySelectorAll('.addcartbtn');
let update = document.querySelector('.update');
let displayItem = document.querySelector('.displayitem');
let searchForm = document.querySelector('.searchform');
update.textContent = 0

let cart = [];
let badge = 0;

window.onload = () => {
  let data = localStorage.getItem('cart');
  data = JSON.parse(data)
  if (data) {
    data.forEach((el) => {
      cart.push(el)
    })
    displayCart()
    doMath();
  } else {
    doMath();
    displayCart();
  }
};

let totalCost = 0;
let currentCost = 0;

update.textContent = '0';
displayCost.textContent = 'Total Cost: 00';

const addToCart = (name, price, photo, item_id) => {
  const item = {
    item_name: name,
    price: price,
    image: photo,
    item_id: item_id,
  };
  cart.push(item);
  saveCart();
  doMath();
  displayCart();

};

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function displayCart() {
  if (cart.length >= 1) {
    displayItem.textContent = "";

    cart.forEach((item, index) => {
      update.textContent = badge;
      let cartItem = document.createElement('div');
      cartItem.className = "cartitem";

      let prodImg = document.createElement('img');
      prodImg.className = "prodimg";
      prodImg.src = item.image;

      let prodName = document.createElement('p');
      prodName.className = "prodname";
      prodName.textContent = item.item_name;

      let qty = document.createElement('p');
      qty.className = "qty";
      qty.textContent = item.quantity

      let prodPrice = document.createElement('p');
      prodPrice.className = "prodprice";
      prodPrice.textContent = `Ksh ${item.price}`;

      let delBtn = document.createElement('i');
      delBtn.className = 'del-btn btn m-2 btn-danger fa-solid fa-trash';
      delBtn.addEventListener('click', () => {
        delCartItem(index);
      })

      cartItem.appendChild(prodName);
      cartItem.appendChild(qty);
      cartItem.appendChild(prodPrice);
      cartItem.appendChild(delBtn);

      displayItem.appendChild(cartItem);
    })
  } else {
    displayItem.textContent = "No items in your cart"
  }
}


function doMath() {
  let totalCost = 0
  cart.forEach((el) => {
    totalCost += parseFloat(el.price);
  });
  update.textContent = cart.length;
  displayCost.textContent = `Total Cost: ${totalCost}`;
}

function delCartItem(index) {
  cart.splice(index, 1)
  saveCart()
  doMath();
  displayCart();
}


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(searchData)
})

function checkout() {
  console.log("Checkout process begin", cart)
} */