//Importing the contracts 
const Horse = artifacts.require("Horse");
const Farmer = artifacts.require("Farmer");
const Dog = artifacts.require("Dog");

//Test the assumptions 
contract("Horse", async(accounts) => {
    it("has the correct name", async() => {
        const instance = await Horse.deployed();
        const name = await instance.getName();
        assert.equal(name, "Spirit", "The horse has the correct name");
    });
    
    it("can sleep", async() => {
        const instance = await Horse.deployed();
        const sleep = await instance.sleep();
        assert.equal(sleep, "Z-z-z...", "The horse can sleep");
    });
    
    it("can eat “plant”", async() => {
        const instance = await Horse.deployed();
        const eat = await instance.eat("plant");
        assert.equal(eat, "Animal eats plant", "The horse can eat “plant”");
    });
    
    it("cannot eat ”meat”, ”not-food”, ”plastic”", async() => {
        const instance = await Horse.deployed();
        try {
            await instance.eat("meat");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Can only eat plant food');
        }
        try {
            await instance.eat("not-food");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Can only eat plant food');
        }
        try {
            await instance.eat("plastic");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Can only eat plant food');
        }
    
    });
});

contract("Dog", async(accounts) => {
    it("has the correct name", async() => {
        const instance = await Dog.deployed();
        const name = await instance.getName();
        assert.equal(name, "Steve", "The dog has the correct name");
    });
    
    it("can sleep", async() => {
        const instance = await Dog.deployed();
        const sleep = await instance.sleep();
        assert.equal(sleep, "Z-z-z...", "The dog can sleep");
    });
    
    it("can eat “meat”", async() => {
        const instance = await Dog.deployed();
        const eat1 = await instance.eat("meat");
        assert.equal(eat1, "Steve eats meat", "The dog can eat “meat");
    });

    it("can eat “plant”", async() => {
        const instance = await Dog.deployed();
        const eat = await instance.eat("plant");
        assert.equal(eat, "Steve eats plant", "The dog can eat “plant");
    });
    
    it("cannot eat ”not-food”, ”plastic”, ”chocolate”", async() => {
        const instance = await Dog.deployed();
        try {
            await instance.eat("not-food");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Dog can only eat meat or plant');
        }
        try {
            await instance.eat("plastic");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Dog can only eat meat or plant');
        }
        try {
            await instance.eat("chocolate");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Dog cannot eat that');
        }
    });
});

contract("Farmer", async(accounts) => {
    it("can call horse, horse responds correctly 'igogo'", async() => {
        const instance = await Farmer.deployed();
        const call = await instance.call(Horse.address);
        assert.equal(call, "Igogo", "The farmer can call horse, horse responds correctly 'igogo'");
    });
    
    it("can feed horse with 'plant'", async() => {
        const instance = await Farmer.deployed();
        const feed = await instance.feed(Horse.address, "plant");
        assert.equal(feed, "Animal eats plant", "The farmer can feed horse with 'plant'");
    });

    it("can feed dog with 'meat'", async() => {
        const instance = await Farmer.deployed();
        const feed1 = await instance.feed(Dog.address, "meat");
        assert.equal(feed1, "Steve eats meat", "The farmer can feed dog with 'meat'");
    });

    it("can feed dog with 'plant'", async() => {
        const instance = await Farmer.deployed();
        const feed2 = await instance.feed(Dog.address, "plant");
        assert.equal(feed2, "Steve eats plant", "The farmer can feed dog with 'plant'");
    });

    it("can call dog, horse responds correctly 'Woof'", async() => {
        const instance = await Farmer.deployed();
        const call = await instance.call(Dog.address);
        assert.equal(call, "Woof", "The farmer can call dog, dog responds correctly 'Woof'");
    });
    
    it("cannot feed horse with anything else (”meat”,”plastic”,”fingers”)", async() => {
        const instance = await Farmer.deployed();
        try {
            await instance.feed(Horse.address, "meat");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Can only eat plant food');
        }
        try {
            await instance.feed(Horse.address, "plastic");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Can only eat plant food');
        }
        try {
            await instance.feed(Horse.address, "fingers");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Can only eat plant food');
        }
    });

    it("cannot feed dog with anything else (”not-food”, ”plastic”, ”chocolate”)", async() => {
        const instance = await Farmer.deployed();
        try {
            await instance.feed(Dog.address, "not-food");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Dog can only eat meat or plant');
        }
        try {
            await instance.feed(Dog.address, "plastic");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Dog can only eat meat or plant');
        }
        try {
            await instance.feed(Dog.address, "chocolate");
            assert.fail('Expected an error');
        } catch (error) {
            assert.include(error.message, 'Dog cannot eat that');
        }
    });
});



