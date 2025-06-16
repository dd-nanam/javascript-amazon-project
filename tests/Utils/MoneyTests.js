import { formatCurrency } from '../../scripts/utils/money.js';

describe('Test suite: format current',() => {
    it('converts cents into dollars',() => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with zero',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Rounding up',() =>{
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })
});