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
            if (this.name == "USS Assembly") {
                let x = ship.hull
                setTimeout(shotResponseUs, 1500, x)
            }
            else {
                setTimeout(shotBack, 3000)
                let x = ship.hull
                setTimeout(function(){theyMove.textContent = `You have been hit! Hull - ${badGuys[s].firepower}`}, 4500)
                setTimeout(shotResponseThem, 4500, x)
                setTimeout(movesClose, 6000)
            }
        }
        else {
            if (this.name == "USS Assembly") {
                setTimeout(missUS, 1500, ship)
            }
            else {
                setTimeout(shotBack, 3000)
                setTimeout(missThem, 4500)
                setTimeout(movesClose, 6000)
            }
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
        const stat = document.createElement('h3')
        stat.textContent = `You still have ${this.hull} life left in your hull`
        document.getElementById('modal-body2').appendChild(stat)
        popOpen()
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
    const accuracy = (Math.random()*(0.2) + (0.6)).toFixed(1)

    //use value to create new ship
    const baddie = new Ships(name, hull, firepower, accuracy)

    //push to badGuys array
    badGuys.push(baddie)
}

// document.getElementsByTagName('button')
const atk = document.getElementById('1')
const exit = document.getElementsByClassName('.close-button')
const popup = document.getElementById('popup')
const overlay = document.getElementById('overlay')
const retreat = document.getElementById('retreat')
const USHull = document.getElementById('USHull')
const alienHull = document.getElementById('alienHull')
const aFP = document.getElementById('aFirepower')
const aAcc = document.getElementById('aAccuracy')
const aNameBox = document.getElementById('alienNameBox')
const moves = document.getElementById('moves')
const usMove = document.getElementById('usMove')
const theyShoot = document.getElementById('theyShoot')
const theyMove = document.getElementById('theyMove')
const destroyed = document.getElementById('destroyed')
const winOL = document.getElementById('winOrLose')
const choice = document.getElementById('choice')
const fate = document.getElementById('fate')
const tryAgain = document.getElementById('tryAgain')


// play.addEventListener('click', attack(id))
for (let i = 0; i < exit.length; i++){
    exit[i].addEventListener('click', popClose);
}


let s = 0;
aNameBox.textContent = badGuys[s].name
alienHull.textContent = badGuys[s].hull
aFP.textContent = badGuys[s].firepower
aAcc.textContent = badGuys[s].accuracy

function attack (id) {
    popClose()
    movesOpen()
    while (USSAssembly.hull > 0) {
        switch(id) {
            case "1":
                if (USSAssembly.hull <= 0) {
                    setTimeout(lose, 4500)
                    break 
                }
                else {
                    USSAssembly.shoot(badGuys[s])
                    if (badGuys[s].hull > 0) {
                        again()
                        badGuys[s].shoot(USSAssembly)
                        if (USSAssembly.hull <= 0) {
                            setTimeout(lose, 4500)
                        }
                        else {
                            break
                        }
                    }
                    else if (badGuys[s].hull <= 0 && s == 5) {
                        s++;
                        setTimeout(shipDestroyed, 3000)
                        setTimeout(winnerWinner, 4500, USSAssembly)
                        break
                    }
                    else {   
                        setTimeout(again, 1000)
                        setTimeout(shipDestroyed, 3000)
                        break
                    }
                }
                break;
            case "0":
                movesClose()
                console.log("no");
                atk.textContent = `Attack Next Ship?`
                aNameBox.textContent = badGuys[s].name
                alienHull.textContent = badGuys[s].hull
                aFP.textContent = badGuys[s].firepower
                aAcc.textContent = badGuys[s].accuracy 
                break
        }
        break;
    }
}

//function for opening the popup window
function popOpen() {
    popup.classList.add('active')
    overlay.classList.add('active')
}


function winnerWinner(USSAssembly) {
    winOL.textContent = `Congratulations!!!`
    fate.textContent = `The Planetary Union will forever be in your debt.`
    if (USSAssembly.hull == 1){
        choice.textContent = `You have conquered the Alien Armada by the skin of your teeth! Only 1 life left.`
    }
    else {
        choice.textContent = `You have conquered the Alien Armada with ${USSAssembly.hull} lives left!`
    }
    retreat.classList.add('active')
    overlay.classList.add('active')
}
function lose(USSAssembly) {
    winOL.textContent = `The USS Assembly was destroyed`
    choice.textContent = `Although safely in an escape pod, you feel the weight of dread on your shoulders`
    fate.textContent = `Truly, all hope is lost...`
    retreat.classList.add('active')
    overlay.classList.add('active')
}
function giveUp () {
    winOL.textContent = `You decided to retreat`
    choice.textContent = `You tucked your tail and ran.`
    fate.textContent = `Now there is truley no hope for our universe...`
    popup.classList.remove('active')
    USSAssembly.retreat()
    retreat.classList.add('active')
    overlay.classList.add('active')
}
//function for closing pop up window
function popClose() {
    retreat.classList.remove('active')
    popup.classList.remove('active')
    overlay.classList.remove('active')
}

function movesOpen() {
    moves.classList.add('active')
    moves.classList.add('active')
}

function movesClose() {
    moves.classList.remove('active')
    moves.classList.remove('active')
    usMove.textContent = ''
    theyMove.textContent = ''
    theyShoot.textContent = ''
}

function shotResponseUs(x) {
    alienHull.textContent = x
    usMove.textContent = `Your ship hit its target! Hull - 5`
}
function shotResponseThem(x) {
        USHull.textContent = x
}
function shotBack(ship) {
    theyShoot.textContent = `The Aliens fire back`
}

function missUS(ship) {
    usMove.textContent = `We missed the alien ship!!`
}
function missThem(ship){ 
    theyMove.textContent = `The alien ship missed!`
}

function shotStats(ship) {
    console.log(`${ship.name} hull: ${ship.hull}`)
}

function fireBack (badGuys, USSAssembly) {
   return badGuys[s].shoot(USSAssembly)    
}

function shipDestroyed () {
    s++
    destroyed.textContent = `You destroyed the alien ship!!`
    setTimeout(movesClose, 2000)
    setTimeout(popOpen, 2500)
    setTimeout(function(){destroyed.textContent = ``}, 3000)
}

function again () {
    atk.innerHTML = "Attack again?"
}

console.log(badGuys)