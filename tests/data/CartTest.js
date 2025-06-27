import { addToCart, cart,removeFromCart, loadFromStorage, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

describe('Test suite: add to cart',() => {

    beforeEach(()=>{
        spyOn(localStorage,'setItem');
    });
    
    
    it('adds existing product to the cart',() =>{

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptions: 1
            }]);
        });

        loadFromStorage();
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));


    });
    
    it('adds new product to the cart',() =>{

        
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));

    });
});

describe('Test suite: Remove from cart',()=>{

    beforeEach(()=>{

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: 1
            }]);
        });

        loadFromStorage();
    });


    it('Delete existing Item',()=>{
        const cartLength = cart.length;
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(
            cart.length
        ).toEqual(cartLength-1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
        
    });

    it('Delete non-existing item', ()=>{
        
        const cartLength = cart.length;
        removeFromCart('dd82ca78-a18b-4e2a-9250-31e67412f98d');
        
        expect(
            cart.length
        ).toEqual(cartLength);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));

    });
});

describe('Test Suite: Updating Delivery Options',()=>{

    beforeEach(()=>{

        spyOn(localStorage,'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: 1
            }]);
        });;

        loadFromStorage();
    });

    it('update delivery option',()=>{

        updateDeliveryOption(cart[0].productId,'2');
        expect(cart[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    })

    
    it('cart Item does not exist', ()=> {
        updateDeliveryOption('dd82ca78-a18b-4e2a-9250-31e67412f98d', '3');
        expect(cart[0].deliveryOptionId).not.toEqual('3')
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).not.toHaveBeenCalledWith('cart',JSON.stringify(cart));
    });

    it('delivery option does not exist',()=>{
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '4');
        expect(cart[0].deliveryOptionId).not.toEqual('4');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).not.toHaveBeenCalledWith('cart',JSON.stringify(cart));
    });

});