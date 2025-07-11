import {cart, removeFromCart, getCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';
import {renderCheckoutHeader as updateHeader} from './checkoutHeader.js';
import isSatSun from '../utils/isWeekend.js';




// function updateHeader(){

//     let cartQuantity = getCartQuantity();

//     const header = document.querySelector('.js-cart-quantity')
//     if (cartQuantity === 1) {
//         header.innerHTML = '1 item';
//     }
//     else if (cartQuantity > 1) 
//     {
//         header.innerHTML = `${cartQuantity} items`    
//     }else
//     {
//         header.innerHTML = '';
//     }

// }


export function renderOrderSummary(){



updateHeader()

function dayString(dayJSObj){

    return dayJSObj.format('dddd');
}




let cartHTML='';
cart.forEach((cartItem)=>{

    const productId = cartItem.productId;
    
    const matchingItem = getProduct(productId);
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

   
        cartHTML += `
    
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingItem.id}">
                  ${matchingItem.name}
                </div>
                <div class="product-price js-product-price-${matchingItem.id}">
                  ${matchingItem.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingItem.id}">
                  
                  <span>
                    Quantity: <span class="quantity-label js-quantity-${matchingItem.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingItem.id}>
                    Update
                  </span>
                    <input class="quantity-input js-quantity-input-${matchingItem.id}" data-product-id=${matchingItem.id}>
                    <span class="save-quantity-link link-primary js-save-link" data-product-id=${matchingItem.id}>
                        Save
                    </span>


                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingItem.id}" data-product-id=${matchingItem.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOPtionsHTML(matchingItem, cartItem)}
              </div>
            </div>
          </div>
    `;

});

document.querySelector('.js-order-summary').innerHTML = cartHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click',()=>{
            let productID = link.dataset.productId;
            removeFromCart(productID);
            const container = document.querySelector(
                `.js-cart-item-container-${productID}`
            );
            renderOrderSummary()
            renderPaymentSummary();
            
        });
    });

    document.querySelectorAll('.js-update-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
            let productId = link.dataset.productId;
            let Item;
            cart.forEach((cartItem)=>{

                if(cartItem.productId === productId)
                {
                    Item = cartItem;
                }
            });

            if (Item) 
            {
                 document.querySelector(`.js-cart-item-container-${productId}`)
                 .classList.add('is-editing-quantity');
            }
        });
    });

    document.querySelectorAll('.js-save-link')
    .forEach((saveQuanity)=>{
        saveQuanity.addEventListener('click',()=>{
            const productId = saveQuanity.dataset.productId
            const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

            saveNewQuantity(productId, newQuantity);

            
        });
    });

    document.querySelectorAll('.quantity-input')
    .forEach((quanityInput)=>{
        quanityInput.addEventListener('keydown',(event)=>{
            if(event.key === 'Enter')
            {
                const productId = quanityInput.dataset.productId;
                const newQuantity = Number( quanityInput.value );

                saveNewQuantity(productId, newQuantity);


            }
        })
    });


    function saveNewQuantity(productId, newQuantity)
    {
        if (newQuantity < 0 || newQuantity > 1000) 
            {
                alert('Sorry new quantity must be between 0 and 1000')
            }
            else
            {
            updateQuantity(productId, newQuantity);
            document.querySelector(`.js-quantity-${productId}`).innerHTML = newQuantity
            document.querySelector(`.js-cart-item-container-${productId}`)
                 .classList.remove('is-editing-quantity');
            renderOrderSummary();
            renderPaymentSummary();
            }
    }

    
function deliveryOPtionsHTML(matchingItem, cartItem){

    let deliveryHTML = ''
    deliveryOptions.forEach((deliveryOption)=>{


        const dateString = calculateDeliveryDate(deliveryOption);
        const priceString = deliveryOption.priceCents === 0? 'FREE': `$${formatCurrency(deliveryOption.priceCents)} - `
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        deliveryHTML += `
        <div class="delivery-option 
        js-delivery-option
        js-delivery-option-${matchingItem.id}-${deliveryOption.id}" 
        data-product-id="${matchingItem.id}" 
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" 
            ${isChecked?'checked': ''}
            class="delivery-option-input 
            js-delivery-option-input-${matchingItem.id}-${deliveryOption.id}"
            name="delivery-option-${matchingItem.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
            </div>
        </div>
        `;

    });

    return deliveryHTML;
}

document.querySelectorAll('.js-delivery-option')
.forEach((element)=>{
    element.addEventListener('click',()=>{
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary()

    });
});

}
