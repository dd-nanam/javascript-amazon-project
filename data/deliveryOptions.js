import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import isWeekend from '../scripts/utils/isWeekend.js';

export const deliveryOptions =[{
    id: '1',
    deliveryDays: 6,
    priceCents: 0
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}
]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
    
    deliveryOptions.forEach((option)=>{
        
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDate(deliveryOption){
    const today = dayjs();
        let deliveryDate = today.add(
            deliveryOption.deliveryDays, 
            'days'
        );

        while(isWeekend(deliveryDate.format('dddd')))
        {
            deliveryDate = deliveryDate.add(1, 'days');
        }
    
        const dateString = deliveryDate.format('dddd, MMMM D');

        return dateString;
}

export function isValidOption(deliveryOptionId){
    let found = false

    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            found = true;
        }
    });

    return found;
}