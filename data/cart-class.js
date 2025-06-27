import { isValidOption } from "./deliveryOptions.js";

class Cart{
    cartItems;
    localStorageKey;

    constructor(localstoragekey)
    {
        this.localStorageKey =localstoragekey;

        this.loadFromStorage(); 
    }

    loadFromStorage() {
        this.cartItems= JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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

    saveToStorage(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
        }

        addToCart(productId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{

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
            this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
        }

        this.saveToStorage();
        }

        removeFromCart(productId)
        {
            
            const newCart = this.cartItems.filter((cartItem)=>{
                return cartItem.productId !== productId;
            });

            this.cartItems = newCart;

            saveToStorage();
        }


        getCartQuantity(){
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem)=>{

            cartQuantity += cartItem.quantity;

        });
        return cartQuantity;
        }


        updateQuantity(productId, newQuantity)
        {
        cart.forEach((cartItem)=>{

            if(cartItem.productId === productId)
            {
                cartItem.quantity = newQuantity;
                return;
            }
        });
        }


        updateDeliveryOption(productId, deliveryOptionId)
        {
        let matchingItem;

        if(!isValidOption(deliveryOptionId)) return;

        this.cartItems.forEach((cartItem)=>{

            if(cartItem.productId === productId)
            {
                matchingItem = cartItem;
            }
            
        });

        if(!matchingItem) return;

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage()
        }

}



const cart = new Cart('cart-oop');
const businessCart =new Cart('cart-business');


console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart)










