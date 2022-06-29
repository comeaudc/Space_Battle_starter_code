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
        // If accuracy rating higher than random number
        if (Math.random() < this.accuracy) {
            //Enemy ship hull loses value equal to firepower
            ship.hull = ship.hull - this.firepower
            //If the shooting ship is USS Assembly
            if (this.name == "USS Assembly") {
                let x = ship.hull
                //Custom timed response for moves window
                setTimeout(shotResponseUs, 1500, x)
            }
            else {
                //Custom timed responses for moves window
                setTimeout(shotBack, 3000)
                let x = ship.hull
                setTimeout(function(){theyMove.textContent = `You have been hit! Hull - ${badGuys[s].firepower}`}, 4500)
                setTimeout(shotResponseThem, 4500, x)
                setTimeout(movesClose, 6000)
            }
        }
        //If you missed accuacy less than random number
        else {
            //Custom timed responses for moves window
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
        popOpen()
    }
}

// Instantiate instance of our ship
const USSAssembly = new GoodGuys()

// Create array for alien ships
let badGuys = [];

// Instantiate 6 randomized alien ships
for (i = 1; i < 7; i++) {
    //Create Alien Name
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

// Using JS to get elements from DOM
const atk = document.getElementById('1')                        //Atk Button
const exit = document.getElementsByClassName('.close-button')   //Close Button
const popup = document.getElementById('popup')                  //PopUp for retreat
const overlay = document.getElementById('overlay')              //Overlay for all popUps
const confetti = document.querySelector('#confetti')            //Confetti overlay for win
const explosion = document.querySelector('#explosion')          //Explosion overlay for loss
const retreat = document.getElementById('retreat')              //Retreat popup
const USHull = document.getElementById('USHull')                //USHull stats for LiveUpdate
const alienHull = document.getElementById('alienHull')          //alienhull stats for LiveUpdate
const aFP = document.getElementById('aFirepower')               //alien firepower stat
const aAcc = document.getElementById('aAccuracy')               //alien accuracy stat
const aNameBox = document.getElementById('alienNameBox')        //Alien name update
const moves = document.getElementById('moves')                  //Moves Popup
const usMove = document.getElementById('usMove')                //US move section for MovesPU
const theyShoot = document.getElementById('theyShoot')          //theyshoot section for MovesPU
const theyMove = document.getElementById('theyMove')            //US move section for MovesPU
const destroyed = document.getElementById('destroyed')          //Destroyed for fatePU
const winOL = document.getElementById('winOrLose')              //WinOL h2 for fatePU
const choice = document.getElementById('choice')                //choice h2 for fatePU
const fate = document.getElementById('fate')                    //fate h2 for fate PU
const life = document.getElementById('lives')                   //lives h2 for custom fate window

//Counter for Alien array
let s = 0;
//Set Alien Ship stats for First Alien In Array
aNameBox.textContent = badGuys[s].name
alienHull.textContent = badGuys[s].hull
aFP.textContent = badGuys[s].firepower
aAcc.textContent = badGuys[s].accuracy

function attack (id) {
    popClose()      //Closes retreat Popup before next case
    movesOpen()     //Open Moves popup for current case
    //While USSAssembly hull has life
    while (USSAssembly.hull > 0) {
        //Give Choice Attack or Dont retreat
        switch(id) {
            //Attack Case
            case "1":
                //If USSAssembly destroyed
                if (USSAssembly.hull <= 0) {
                    //Lose Window Appears
                    setTimeout(lose, 4500)
                    break 
                }
                //If not destroyed
                else {
                    //Shoot Badguys
                    USSAssembly.shoot(badGuys[s])
                    //If badguy still alive
                    if (badGuys[s].hull > 0) {
                        again()
                        //Bad guys shoot back
                        badGuys[s].shoot(USSAssembly)
                        //If USSAssembly Destroyed
                        if (USSAssembly.hull <= 0) {
                            //Lose Window Appears
                            setTimeout(lose, 4500)
                        }
                        else {
                            break
                        }
                    }
                    //If bad guy is dead and there are no more in array
                    else if (badGuys[s].hull <= 0 && s == 5) {
                        s++;    //Increment to catch weird cases
                        setTimeout(shipDestroyed, 3000)     //Send out ship destroyed prompt to MovePU
                        setTimeout(winnerWinner, 4500, USSAssembly)     //Send out winner prompt
                        break
                    }
                    //If bad guy dead, send messages
                    else {   
                        setTimeout(again, 1000)
                        setTimeout(shipDestroyed, 3000)
                        break
                    }
                }
                break;
            //Never Give up on retreat screen option
            case "0":
                movesClose()            //Close MovesPU
                break
        }
        break;
    }
}

//function for opening the retreat option window
function popOpen() {
    atk.textContent = `Attack Next Ship?`       //Change Button
    popup.classList.add('active')
    overlay.classList.add('active')
}
//function for closing retreat window
function popClose() {
    retreat.classList.remove('active')
    popup.classList.remove('active')
    overlay.classList.remove('active')
}

//WIN LOSE OR RETREAT WINDOW Functions
//Winner Function will set appropriate text boxes and open
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
    confetti.classList.add('active')
}
//Loser Function will set appropriate text boxes and open
function lose(USSAssembly) {
    winOL.textContent = `The USS Assembly was destroyed`
    choice.textContent = `Although safely in an escape pod, you feel the weight of dread on your shoulders`
    fate.textContent = `Truly, all hope is lost...`
    retreat.classList.add('active')
    explosion.classList.add('active')
}
//Giveup/Retreat Function will set appropriate text boxes and open
function giveUp () {
    winOL.textContent = `You decided to retreat`
    choice.textContent = `You tucked your tail and ran.`
    fate.textContent = `Now there is truley no hope for our universe...`
    life.textContent = `You have ${USSAssembly.hull} lives left`
    popup.classList.remove('active')
    USSAssembly.retreat()
    retreat.classList.add('active')
    overlay.classList.add('active')
}

//Moves PopUp (MovePU) Functions:
//MovesPU Open
function movesOpen() {
    moves.classList.add('active')
    moves.classList.add('active')
}
//MovesPU Close and clear values
function movesClose() {
    moves.classList.remove('active')
    moves.classList.remove('active')
    usMove.textContent = ''
    theyMove.textContent = ''
    theyShoot.textContent = ''
    alienHull.style.color = 'white'
    USHull.style.color = 'white'
    alienHull.style.fontSize = '1em'
    USHull.style.fontSize = '1em'
    aNameBox.textContent = badGuys[s].name      //Update to next badguy stats
    alienHull.textContent = badGuys[s].hull     //Update to next badguy stats
    aFP.textContent = badGuys[s].firepower      //Update to next badguy stats
    aAcc.textContent = badGuys[s].accuracy      //Update to next badguy stats
}

//Battle Mechanic Timing Function
function shotResponseUs(x) { //We shot and hit
    alienHull.style.color = 'red'     
    alienHull.style.fontSize = '1.5em'  
    alienHull.textContent = x
    usMove.textContent = `The USS Assembly hit its target!! Hull - 5`
}
function fireBack (badGuys, USSAssembly) {      //They gamble a shot
    return badGuys[s].shoot(USSAssembly)    
 }
function shotBack(ship) {           //They attempt shot prompt
    theyShoot.textContent = `The Aliens fire back...`
}
function shotResponseThem(x) {      //Their shot landed now update lives
        USHull.textContent = x
        USHull.style.color = 'red'
        USHull.style.fontSize = '1.5em'
}
function missUS(ship) {             //We shot and missed
    usMove.textContent = `We missed the alien ship!!`
}
function missThem(ship){            //They shot and missed
    theyMove.textContent = `The alien ship missed!!`
}

//You Destroyed an Enemy Ship
function shipDestroyed () {
    s++         //Increment array
    destroyed.textContent = `You destroyed the alien ship!!`
    setTimeout(movesClose, 2000)
    setTimeout(popOpen, 2500)
    setTimeout(function(){destroyed.textContent = ``}, 3000)
}

function again () {
    atk.innerHTML = "Attack again?"
}