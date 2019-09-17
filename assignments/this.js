/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Window/Global Binding- binding the main global object window with the 'this' the default, 'this' binding
* 2. Implicit Binding- when an object to the left of the dot is bound to the 'this'.
* 3. New Binding- These are used by constructor functions that return an object, this is JavaScripts OOP model
* 4. Explicit Binding- An object is explicitly bound to 'this' when call() or apply() is used to bind the object
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
function globalWin() { console.log(this); }

// Principle 2

// code example for Implicit Binding
const myObj = 
	  {
		  text: ' is inside myObject this',
		  goInside: function(name) 
		  {
		  	console.log(`${name}${this.text}`);
	  	  }
	  };

myObj.goInside('Nathan');

// Principle 3

// code example for New Binding
function FantasyMonster(attr)
{
	this.name = attr.name;
	this.hp = attr.hp;
	this.strength = attr.strength;
	this.intelligence = attr.intelligence;
	this.power = attr.power;
	
	this.attack = function() { return this.power * this.strength; }
}

const creature = new FantasyMonster({name: 'Dragon', hp: 1500, strength: 29, intelligence: 25, power: 100});
console.log(`The Dragon attacks for ${creature.attack()}`);


// Principle 4

// code example for Explicit Binding
let hero = 
	{
		name: 'The Hero'
	};

let userPower = function(superpower)
{
	console.log(`${this.name} has used the ${superpower} superpower skill`);
}

userPower.call(hero, 'PULSE');
