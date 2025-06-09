import { getCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
    let cartQuantity = getCartQuantity();
    
    const header = document.querySelector('.checkout-header-middle-section')
    if (cartQuantity === 1) {
        header.innerHTML = 
        `
        Checkout (<a class="return-to-home-link js-cart-quantity"
            href="amazon.html">${cartQuantity} item</a>)
        `;
    }
    else if (cartQuantity > 1) 
    {
        header.innerHTML = 
        `
        Checkout (<a class="return-to-home-link js-cart-quantity"
            href="amazon.html">${cartQuantity} items</a>)
        `;
    }else
    {
        header.innerHTML = '';
    }
}

 