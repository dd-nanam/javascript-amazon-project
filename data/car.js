class Car {
     #brand;
     #model;
     speed;
     isTrunkOpen = false;

     constructor(carBrand, carModel){
        this.#brand = carBrand;
        this.#model = carModel;
        this.speed = 0;
     }

     go(){
        if(this.speed <= 195)
            this.speed+=5;
     }

     brake(){
        if(this.speed >= 5)
            this.speed-=5;
     }

     opentrunk()
     {
        if(this.speed === 0)
            this.isTrunkOpen = true;
     }

     closetrunk()
     {
        this.isTrunkOpen= false;
     }

     displayInfo(){

        console.log(`${this.#brand} ${this.#model} ${this.speed} km/h, Trunk is ${this.isTrunkOpen?'opened':'closed'}`)

     }
}

class RaceCar extends Car
{
    acceleration;

    constructor(carModel, carBrand, acceleration)
    {
        super(carModel, carBrand);
        this.acceleration =acceleration;
    }

    go()
    {
        if(( this.speed + this.acceleration ) <= 300)
        {
            this.speed+=this.acceleration;
        }
        else
        {
            this.speed = 300;
        }
    }

    opentrunk(){
        return;
    }

    closetrunk(){
        return;
    }

}

const kwame = new Car('Toyota','Corolla');
const electric =new Car('Tesla', 'Model 3');

const beast = new RaceCar('McLaren', 'F1', 20);


kwame.go()
kwame.go()
kwame.go()
kwame.go()
kwame.brake()
kwame.brake()
kwame.brake()


electric.go()
electric.go()
electric.go()
electric.brake()
electric.brake()
electric.brake()
electric.brake()
electric.brake()
electric.brake()
electric.brake()
kwame.displayInfo();
electric.displayInfo();