
function showAddedToCartMessage(message,color) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.style.backgroundColor=color
    messageContainer.innerText = message;
    messageContainer.style.display = 'block';
  
   
    setTimeout(() => {
      messageContainer.style.display = 'none';
    }, 3000);
  }
  let carts = document.querySelectorAll(".add-cart");
  let products = [
    {
      id:1,
      name: "Wine bag",
      tag: "wbag",
      price: 699,
      inCart: 0,
    },
    {
      id:2,
      name: "Zara bag",
      tag: "zbag",
      price: 949,
      inCart: 0,
    },
    {
      id:3,
      name: "Baby bagpack",
      tag: "Bbag",
      price: 1449,
      inCart: 0,
    },
    {
      id:4,
      name: "Purple bag",
      tag: "Pbag",
      price: 799,
      inCart: 0,
    },
    {
      id:5,
      name: "Brown skinny bag",
      tag: "bsbag",
      price: 1899,
      inCart: 0,
    },
    {
      id:6,
      name: "Blue side bag",
      tag: "bsbbag",
      price: 1299,
      inCart: 0,
    },
    {
      id:7,
      name: "Cute pink bag",
      tag: "cpbag",
      price: 899,
      inCart: 0,
    },
    {
      id:8,
      name: "Chout bag",
      tag: "cbag",
      price: 999,
      inCart: 0,
    },
  ];
  //noneed
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    });
  }
  function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
  
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
      localStorage.setItem("cartNumbers", productNumbers + 1);
    } else {
      localStorage.setItem("cartNumbers", 1);
    }
    setItems(product);
  }
  function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
      if (cartItems[product.tag] == undefined) {
        cartItems = {
          ...cartItems,
          [product.tag]: product,
        };
      }
      cartItems[product.tag].inCart += 1;
    } else {
      product.inCart = 1;
      cartItems = {
        [product.tag]: product,
      };
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }
  
  function totalCost(product) {
    
    let cartCost= localStorage.getItem("totalCost");
    
    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
    } else {
      localStorage.setItem("totalCost", product.price);
    }
    cartCost= localStorage.getItem("totalCost")
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);
  }
  
  function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    let cartCost= localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);
    let prouctContainer = document.querySelector(".close");
    let totalAmount = document.querySelector(".messageContainer");
    if (cartItems && prouctContainer) {
      prouctContainer.innerHTML ="";
      Object.values(cartItems).map((item) => {
        prouctContainer.innerHTML += `
          <div class="col-sm-12 col-md-6 col-lg-3 cart-content">
              <div class="card">
                  <img src="../IMAGES/${item.tag}.jpg" style="object-fit: fit;" width="1500" height="250" class="card-img-top" alt="...">
                  <div class="card-body text-center">
                      <h5 class="card-title ">${item.name}</h5>
                      <div class="cart-price">₹${item.price}</div>
                      <div  class="inputtag">
                          <input type="number" class="cart-quantity text-center cart-quantity" id="cart-input" min="1" value="${item.inCart}" max="7" onclick={update(value,"${item.tag}")} />
                          <button type="button" class="btn btn-danger btn-sm " id="cartRemove" onclick={edit("${item.tag}",${item.price},${item.inCart})}>Cancel</button>
                      </div>
                  </div>
              </div>
          </div>
              `;
      });
  
      prouctContainer.innerHTML +=`
      <div> </div>
      <div class="total">
              <div class="total-content">
                  <div>Total Amout:</div>
                  <hr>
                  <div class="total-amount">₹${cartCost}</div>
              </div>
              <br>
              <button id="message" onclick="order()">Order Now</button>
          </div>
      `
    }
  }
  displayCart();
  
  
  if (document.readyState === "complete") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
  
  function ready() {
    let removeCartButtons = document.querySelectorAll("#cartRemove");
  
    for (let i = 0; i < removeCartButtons.length; i++) {
      let button = removeCartButtons[i];
      button.addEventListener("click", removeCartItem);
    }
  }
  
  function removeCartItem(event) {
    let buttonClicked1= event.target.parentElement;
    let buttonClicked2= buttonClicked1.parentElement;
    buttonClicked2.parentElement.remove();
  }
  
  function edit(tag,price,inCart){
      ready()
      console.log("Im ready for deleteting, itemName is",tag)
      var cartData = localStorage.getItem("productsInCart");
      var cartObject = JSON.parse(cartData);
      var cartPrice = localStorage.getItem("totalCost");
      var cartNumbers = localStorage.getItem("cartNumbers");
      delete cartObject[tag];
      let newCartPrice=cartPrice-(inCart*price)
      let newCartNumbers=cartNumbers-inCart
      var updatedCartData = JSON.stringify(cartObject);
      localStorage.setItem("productsInCart", updatedCartData);
      localStorage.setItem("totalCost", newCartPrice);
      localStorage.setItem("cartNumbers", newCartNumbers);
      displayCart()
    }
  
  function update(value,tag){
    console.log("Touched quantity")
      console.log(value)
      value=parseInt(value)
      var cartData = localStorage.getItem("productsInCart");
      var cartObject = JSON.parse(cartData);
      cartObject[tag].inCart = value;
      
      const productKeys = Object.keys(cartObject);
      const numberOfProductsInCart = productKeys.length;
      var total=0;
      for (const productName in cartObject){
        const product = cartObject[productName];
        const price = product.price;
        const inCart = product.inCart;
        total+=price*inCart
      }
      console.log(total)
     
      localStorage.setItem("totalCost",total)
      var updatedCartData = JSON.stringify(cartObject);
      localStorage.setItem("productsInCart", updatedCartData);
      displayCart()
  }
  function order(){
    let totalCost=localStorage.getItem("totalCost");
    totalCost=parseInt(totalCost)
    if(totalCost==0){
      showAddedToCartMessage("No Item is present in the cart ❕","black")
    }else{
      localStorage.clear()
      showAddedToCartMessage("Congrats your order is placed")
    }
  }