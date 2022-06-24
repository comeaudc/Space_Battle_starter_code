// Create a class to format all ships
class Ships {
    //create a constructor for (Hull, firepower, accuracy)
    constructor (name, hull, firepower, accuracy) {
        this.name = name
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }
    //create methods for shoot
    shoot (ship) {
        if (Math.random() < this.accuracy) {
            ship.hull = ship.hull - this.firepower
            console.log(`The ship hit its target!`)
            console.log(`${ship.name} hull: ${ship.hull}`)
        }
        else {
            console.log(`The shot missed!`)
        }
    }
}

// Extend class to our ship
class GoodGuys extends Ships {
    constructor() {
        super(`USS Assembly`, 20, 5, 0.7)
    }
    //Create method for retreat
    retreat() {
    }
}

// Instantiate instance of our ship
const USSAssembly = new GoodGuys()

// Create array for alien ships
let badGuys = [];

// Instantiate 6 randomized alien ships
for (i = 1; i < 7; i++) {

    const name = `Alien Ship ${i}`
    //create random hull value
    const hull = Math.floor(Math.random()*(4)) + 3

    //create random firepower value
    const firepower = Math.floor(Math.random()*(3)) + 2

    //create random accuracy value
    const accuracy = Math.random()*(0.2) + (0.6)

    //use value to create new ship
    const baddie = new Ships(name, hull, firepower, accuracy)

    //push to badGuys array
    badGuys.push(baddie)
}


let s = 0
while (s < 6) {
    if (USSAssembly.hull <= 0){
        console.log(`Oh no your ship was desytroyed!!!`) 
        break 
    }
    else {
        while(badGuys.length > 0) {   // While there are still bad guys
            USSAssembly.shoot(badGuys[0])       // Shoot badGuys
            if(badGuys[0].hull > 0) {           // If theyre still alive
                badGuys[0].shoot(USSAssembly)       //Badguys shoot us
                if (USSAssembly.hull <= 0) {     //If we are dead, break loop
                    break
                }
            }
            else {              //If bad guys hull = 0: Ship defeated
                s++;            //Increment to next bad guy       
                if (badGuys.length > 1){        //If it is NOT the last ship
                    badGuys.splice(0, 1)        //Remove baddie from badguy array
                    console.log(`You have destroyed the alien ship`)
                    break
                }
                else {          //If it is the last ship
                    console.log(`Congratulations! You Destroyed the Alien Fleet!!! You're hull had ${USSAssembly.hull} life left.`)
                    break
                }
            }
        }
    }
}