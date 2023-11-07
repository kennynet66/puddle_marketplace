
const totalCostDiv = document.getElementById('total-cost');
const cartBadge = document.getElementById('cart-badge');
const cartDetails = document.getElementById('cart-details');

let cartItems = 0;
let totalCost = 0;
let currentCost = 0;
function test(itemCost) {
  cartItems += 1
  currentCost += itemCost;
  totalCost = currentCost;

  totalCostDiv.textContent = "TOTAL: " + totalCost;
  cartBadge.innerHTML=cartItems; 
}
function test2(itemname, itemCost) {
    const cartDetails = document.getElementById('cart-details');
    const itemParagraph = document.createElement('p');
    itemParagraph.textContent =itemname + " @ " + itemCost;
    cartDetails.appendChild(itemParagraph);
}
totalCostDiv.textContent = "TOTAL: " + totalCost;