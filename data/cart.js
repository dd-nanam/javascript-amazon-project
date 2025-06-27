import { isValidOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart= JSON.parse(localStorage.getItem('cart')) || [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    }
];
}

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;
      cart.forEach((cartItem)=>{

        if(cartItem.productId === productId)
        {
            matchingItem = cartItem;
        }
        
      });

      if (matchingItem)
      {
        matchingItem.quantity++;
      }else
      {
        cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
      }

      saveToStorage();
}


export function removeFromCart(productId)
{
    
    const newCart = cart.filter((cartItem)=>{
        return cartItem.productId !== productId;
    });

    cart = newCart;

    saveToStorage();
}


export function getCartQuantity(){
    let cartQuantity = 0;
      cart.forEach((cartItem)=>{

        cartQuantity += cartItem.quantity;

      });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity)
{
  cart.forEach((cartItem)=>{

      if(cartItem.productId === productId)
      {
          cartItem.quantity = newQuantity;
          return;
      }
  });
}


export function updateDeliveryOption(productId, deliveryOptionId)
{
  let matchingItem;

  if(!isValidOption(deliveryOptionId)) return;

  cart.forEach((cartItem)=>{

    if(cartItem.productId === productId)
    {
        matchingItem = cartItem;
    }
    
  });

  if(!matchingItem) return;

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage()
}