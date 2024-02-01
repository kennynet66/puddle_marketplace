
let displayCost = document.querySelector('.totalcost');
let items = document.querySelectorAll('.addcartbtn');
let update = document.querySelector('.update');
let displayItem = document.querySelector('.displayitem');
let searchForm = document.querySelector('.searchform');
update.textContent = 0

let cart = [];

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

let badge = 0;

items.forEach((item, index) => {
  // console.log(item)
  let price = parseFloat(item.getAttribute('price'));
  let img = item.getAttribute('src');
  item.addEventListener('click', () => {
    let newItem = {itemName: item.name, itemPrice: price, image: img}
    cart.push(newItem);
    saveCart(cart);
    displayCart()
    doMath();
  });
});

function saveCart(items) {
  localStorage.setItem('cart', JSON.stringify(items));
}


function displayCart(){
  if(cart.length >= 1) {
    displayItem.textContent = "";
    cart.forEach((item) => {
    update.textContent = badge;
    let cartItem = document.createElement('div');
      cartItem.className = "cartitem";

      let prodImg = document.createElement('img');
      prodImg.className = "prodimg";
      prodImg.src = item.image;

      let prodName = document.createElement('p');
      prodName.className = "prodname";
      prodName.textContent = item.itemName;

      let prodPrice = document.createElement('p');
      prodPrice.className = "prodprice";
      prodPrice.textContent = `Ksh ${item.itemPrice}`;

      let delBtn = document.createElement('button');
      delBtn.className = 'del-btn btn m-2 btn-danger';
      delBtn.textContent = "Remove"
      delBtn.addEventListener('click', () => {
        delCartItem();
      })

      cartItem.appendChild(prodImg);
      cartItem.appendChild(prodName);
      cartItem.appendChild(prodPrice);
      cartItem.appendChild(delBtn);

      displayItem.appendChild(cartItem);
    })
  } else {
    displayItem.textContent = "No items in your cart"
  }
}


function doMath() {
  let badge = 0;
  let totalCost = 0
  cart.forEach((el) => {
    badge += 1
    totalCost += el.itemPrice;
  });
  update.textContent = badge;
  displayCost.textContent = `Total Cost: ${totalCost}`;
}

function delCartItem(index) {
  cart.splice(index,1)
  saveCart(cart)
  doMath();
  displayCart();
}


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(searchData)
})