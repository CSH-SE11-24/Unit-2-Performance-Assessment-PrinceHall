const prompt = require('prompt-sync')()

let username = prompt("What is your name?")

//Prompting the user for a name

console.log(`Hello ${username}, You have entered the escape room. The turn will incremenate by 1 each time you investigate a object. Find the necessary items to win`)

//The Object thats comprised of different objects that represent a directions and inside those directions are three items

let invincibleroom = {
  name: "Invincible Room",
  right: {
    item1: {
      name: "Invincible costume",
    },
    item2: {
      name: "Mortal Kombat",
    },
    item3: {
      name: "Torn Invincible Mask",
      Hiddenobject: "Cecil's earpiece"
    }
  }
  , left: {
    item1: {
      name: "Bed",
    },
    item2: {
      name: "Table",
      Hiddenobject: "key2"
    },
    item3: {
      name: "Random Blood Splatter",
    }
  },

}

//I made for loop so i can later call the indexs i want 

let keys = []

for (let key in invincibleroom) {
  keys.push(`${key}`)

}

// I made two seperate Value Arrays so i can check if the userprompt for investation is included in the values if so the code proceeds

let values = []

for (let key in invincibleroom.right) {
  values.push(`${invincibleroom.right[key].name}`)
}

let values2 = []

for (let key in invincibleroom.left) {
  values2.push(`${invincibleroom.left[key].name}`)
}
//inventory is defined as a blank array because the player has nothing on it
let inventory = []

//The validator has to be false so the code can eventually end

let valiadator = false

//Turn is starting at 0

let turn = 0

//The function right represents the right direction and if you press back you are given the choice between either left or right. If you investatgate a object other than Torn Invincible Mask it will output you found nothing. If you investagate Torn invincible Mask Cecil's earpiece will get added into the inventory that can be called on later

function right() {

  console.log(`You see three items: ${invincibleroom.right.item1.name}, ${invincibleroom.right.item2.name},  ${invincibleroom.right.item3.name} `)

  console.log("Where do you want to investigate? or if you want to go back type back or if you have something in your inventory type inventory after you press back")

  let investigationoption = prompt()
  if (investigationoption.toLowerCase() == "back") {

    //this if statement allows you to go back to the previous prompt
    check()
  }

  else if (values.includes(investigationoption)) {

    //placeholder is a empty object because its value gets overwritten if your prompt is equal to a item in the right direction so i can check if it has a HiddenObject key in the placeholder

    let placeholder = {}

    if (investigationoption == invincibleroom.right.item1.name) {
      placeholder = invincibleroom.right.item1
    }

    else if (investigationoption == invincibleroom.right.item2.name) {
      placeholder = invincibleroom.right.item2
    }

    else if (investigationoption == invincibleroom.right.item3.name) {
      placeholder = invincibleroom.right.item3
    }

    let investigatepart1 = function() {

      if (!("Hiddenobject" in placeholder)) {
        console.log("You found Nothing")
        turn = turn + 1
      }

      else {
        console.log(`You obtained ${placeholder.Hiddenobject}`)

        inventory.push(placeholder.Hiddenobject)
        turn = turn + 1
        delete placeholder.Hiddenobject
      }
    }

    investigatepart1()
  }

  //Allows user to repeat if they get it wrong

  else {
    console.log("Try again")
    right()
  }
  //if the validator condition is true the code will end because it know you already used a item in your inventory
  while (!valiadator) {
    right()
  }

}




function left() {
  console.log(`You see three items: ${invincibleroom.left.item1.name}, ${invincibleroom.left.item2.name},  ${invincibleroom.left.item3.name} `)

  console.log("Where do you want to investigate? or if you want to go back type back or if you have something in your inventory type inventory after you press back")

  let investigationoption = prompt()

  if (investigationoption.toLowerCase() == "back") {
    check()
  }
  else if (values2.includes(investigationoption)) {

    //placeholder is a empty object because its value gets overwritten if your prompt is equal to a item in the left direction so i can check if it has a HiddenObject key in the placeholder

    let placeholder = {}

    if (investigationoption == invincibleroom.left.item1.name) {
      placeholder = invincibleroom.left.item1
    }

    else if (investigationoption == invincibleroom.left.item2.name) {
      placeholder = invincibleroom.left.item2
    }

    else if (investigationoption == invincibleroom.left.item3.name) {
      placeholder = invincibleroom.left.item3
    }

    let investigatepart1 = function() {

      if (!("Hiddenobject" in placeholder)) {
        console.log("You found Nothing")
        turn = turn + 1
      }

      else {
        console.log(`You obtained ${placeholder.Hiddenobject}`)
        inventory.push(placeholder.Hiddenobject)
        turn = turn + 1
        delete placeholder.Hiddenobject
      }
    }

    investigatepart1()
  }

  else {
    console.log("try again")
    left()
  }
  //if the validator condition is true the code will end because it know you already used a item in your inventory
  while (!valiadator) {
    left()
  }

}
//the function use purpose is to check if they have one of the two correct items and if so Validator is true so the code can end 

function use() {


  let inventorychoice;

  while (!valiadator) {
    inventorychoice = prompt("What do you want to interact with or Press Back to go back")

    if (inventorychoice == "Cecil's earpiece") {
      console.log("Hello Invincible. We need you at HQ. I'm Opening a portal right now")
      console.log("you escaped the escape room");
      valiadator = true
    }
    else if (inventorychoice == "key2") {
      console.log("You investigate the key and Angstrom Levy Opens a portal")
      console.log("you escaped the escape room")
      valiadator = true
    }

    else if (inventorychoice == "back") {
      check()
    }

    else {
      use()
    }
  }

}



console.log("You entered into the escape room. it's invincible theme. Hide Hidden items before the turn gets to 5 ")


//check just has the mini functions in it so it can work together 

function check() {
  userchoice = prompt(`What direction do you want to look at ${keys[1]}, ${keys[2]}. Or Press inventory to check inventory `)

  if (turn <= 5) {

    if (userchoice == "right") {
      right()
    }

    else if (userchoice == "left") {
      left()
    }

    else if (userchoice.toLowerCase() == "inventory") {
      console.log(inventory)
      use()

    }


    else if (userchoice != "right" && userchoice != "left") {

      while (userchoice != "right" || userchoice != "left") {
        console.log("Try again")
        check()
      }

    }
  }
  else {
    console.log("You lost. HaHa")
  }

}


check()