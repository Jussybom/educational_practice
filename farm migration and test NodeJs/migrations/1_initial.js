var StringComparer = artifacts.require("StringComparer");
var Wolf = artifacts.require("Wolf");
var Cow = artifacts.require("Cow");
var Horse = artifacts.require("Horse");
var Dog = artifacts.require("Dog");
var Farmer = artifacts.require("Farmer");

module.exports = async(deployer)=>{
	await deployer.deploy(StringComparer);
    stringComparer = await deployer.link(StringComparer, [Cow, Horse, Wolf, Dog]);

    await deployer.deploy(Wolf, "Jojo");
    wolf = await Wolf.deployed();

    await deployer.deploy(Cow, "Coco");
    cow = await Cow.deployed();
    console.log('Cow deployed at', cow.address);

    await deployer.deploy(Horse, "Spirit");
    horse = await Horse.deployed();

    await deployer.deploy(Dog, "Steve");
    dog = await Dog.deployed();

    await deployer.deploy(Farmer);
    farmer = await Farmer.deployed();

callCow = await call(cow.address);
console.log(callCow);
console.log("---------------------")
callHorse = await call(horse.address);
console.log(callHorse);
console.log("---------------------")
feedWolf2 = await feed(wolf.address, "meat");
console.log(feedWolf2); 
console.log("---------------------")
callDog = await call(dog.address);
console.log(callDog);
feedDog = await feed(dog.address, "meat")
console.log(feedDog);
feedDog2 = await feed(dog.address, "plant")
console.log(feedDog2);
sleepHorse = await sleep(horse.address);
console.log(sleepHorse);
}    


async function  call(address){
  return await farmer.call(address);
}

async function  feed(address,food){
  return await farmer.feed(address,food);
}


async function sleep(address){
  return await farmer.sleep(address);
}

