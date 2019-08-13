/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(attr)
{
  this.createdAt = attr.createdAt;
	this.name = attr.name;
  this.dimensions = {'length': attr.dimensions.length, 'width': attr.dimensions.width, 'height': attr.dimensions.height};
}

GameObject.prototype.destroy = function() 
{ 
  return `${this.name} was removed from the game`;
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(attr)
{
	GameObject.call(this, attr);
	this.healthPoints = attr.healthPoints  
}

CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function() 
{ 
  return `${this.name} took damage`;
};


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(attr)
{
	CharacterStats.call(this, attr);
	
	this.team = attr.team;
	this.weapons = attr.weapons;
	this.language = attr.language;  
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() 
{ 
  return `${this.name} offers a greeting in ${this.language}`;
};

// Stretch Goal constructors
function Hero(attr)
{
  Humanoid.call(this, attr);
  this.attackPower = attr.attackPower;
  this.blockPercentage = attr.blockPercentage;
  this.damage = attr.damage;
  this.specialAttackInit = attr.specialAttackInit;
  this.specialMultiplier = attr.specialMultiplier;
  this.specialCounter = 0;
}
Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.attack = function(attackee)
{
  if(attackee.isDead()) { return; }
  let damage = 0;
  //Check to see if attackeet blocks the attack
  if(attackee.block())
  {
    console.log(`you attack ${attackee.name} but ${attackee.name} blocks you\n`);
    return;
  }

  else
  {
    // Check for special attack
    if(this.specialCounter >= this.specialAttackInit) 
    { 
      damage = this.specialAttack(); 
      console.log('Special Attack!!');
      }

    // the max damage he does is his max attackPower randomized to be 0.1 to max
    else { damage = this.regularAttack(); } 
  }    
  attackee.isHit(damage)

    if(attackee.isDead()) { console.log(`you killed ${attackee.name}!\n`); }

    else { console.log(`you hit ${attackee.name} for ${damage} he has ${attackee.healthPoints} hp left!\n`); }    
  };

  Hero.prototype.block = function()
  {
      if(((Math.random() * 100) + 1) <= this.blockPercentage) { return true; }
      return false;
  };

Hero.prototype.regularAttack = function()
{
  this.specialCounter++;
  damage = Math.random() * (this.attackPower * 100) + 1;
  return Math.round(damage);
};

Hero.prototype.specialAttack = function()
{
  // Get the regular damage
  this.specialCounter = 0;
  damage = Math.random() * (this.attackPower * 100) + 1;

  // Add his special multiplier
  damage += (Math.random() * 100 + 1) * this.specialMultiplier;
   return Math.round(damage);
};

Hero.prototype.isHit = function(damage)
{
  this.healthPoints -= damage;
};

Hero.prototype.isDead = function()
{
  if(this.healthPoints <= 0) { return true; }
  return false;
};

function Villian(attr)
{
  Humanoid.call(this, attr);
  this.attackPower = attr.attackPower;
  this.blockPercentage = attr.blockPercentage;
  this.damage = attr.damage;
  this.specialAttackInit = attr.specialAttackInit;
  this.specialMultiplier = attr.specialMultiplier;
  this.specialCounter = 0;
}

Villian.prototype = Object.create(Humanoid.prototype);
Villian.prototype.attack = function(attackee)
{
  if(attackee.isDead()) { return; }
    let damage = 0;
  //Check to see if attackee blocks the attack
  if(attackee.block())
  {
    console.log(`you attack ${attackee.name} but ${attackee.name} blocks you\n`);
    return;
  }

  else
  {
    // Check for special attack
    if(this.specialCounter >= this.specialAttackInit) 
    { 
      damage = this.specialAttack(); 
      console.log('Special Attack!!');
      }

    // the max damage he does is his max attackPower randomized to be 0.1 to max
    else { damage = this.regularAttack(); } 
  }    
  attackee.isHit(damage)

    if(attackee.isDead()) { console.log(`you killed ${attackee.name}!\n`); }

    else { console.log(`you hit ${attackee.name} for ${damage} he has ${attackee.healthPoints} hp left!\n`); }    
};

Villian.prototype.block = function()
{
    if(((Math.random() * 100) + 1) <= this.blockPercentage) { return true; }
    return false;
};

Villian.prototype.regularAttack = function()
{
  this.specialCounter++;
  damage = Math.random() * (this.attackPower * 100) + 1;
   return Math.round(damage);
};

Villian.prototype.specialAttack = function()
{
  // Get the regular damage
  this.specialCounter = 0;
  damage = Math.random() * (this.attackPower * 100) + 1;

  // Add his special multiplier
  damage += (Math.random() * 100 + 1) * this.specialMultiplier;
   return Math.round(damage);
};

Villian.prototype.isHit = function(damage)
{
  this.healthPoints -= damage;
};

Villian.prototype.isDead = function()
{
  if(this.healthPoints <= 0) { return true; }
  return false;
};
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

const bountyHunter = new Hero(
    {
      createdAt: new Date(),
      dimensions: { length: 1, width: 2, height: 4},
      healthPoints: 1500,
      name: 'Thor',
      team: 'Asgard',
      weapons: [ 'Hammer'],
      language: 'Asgardian',
      attackPower: 1.2,
      blockPercentage: 10,
      damage: 10,
      specialAttackInit: 5,
      specialMultiplier: 1.0,
    });

    const assassin = new Villian(
    {
      createdAt: new Date(),
      dimensions: { length: 1, width: 2, height: 4},
      healthPoints: 1800,
      name: 'Desmond',
      team: 'Assassins Guild',
      weapons: [ 'Ninja Sword'],
      language: 'English',
      attackPower: 0.8,
      blockPercentage: 25,
      damage: 6,
      specialAttackInit: 2,
      specialMultiplier: 0.60,
    });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

// Start of Stretch Goal, put data of characters
  console.log(bountyHunter.createdAt);
  console.log(bountyHunter.dimensions);
  console.log(bountyHunter.healthPoints);
  console.log(bountyHunter.name);
  console.log(bountyHunter.team);
  console.log(bountyHunter.weapons);
  console.log(bountyHunter.language);
 console.log('\n');
  console.log(assassin.createdAt);
  console.log(assassin.dimensions);
  console.log(assassin.healthPoints);
  console.log(assassin.name);
  console.log(assassin.team);
  console.log(assassin.weapons);
  console.log(assassin.language);
  console.log('\n');

  let counter = 0;
  while(!bountyHunter.isDead() || !assassin.isDead())
  {
    if(counter % 2 && !bountyHunter.isDead()) { bountyHunter.attack(assassin);}
    else { assassin.attack(bountyHunter);}
    counter++;
  }