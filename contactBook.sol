pragma solidity ^0.8.17;
// Jojo
// Coco
// Alisa
contract Contact{
    
    string _name;

    constructor(string memory name){
        _name = name;
    }

    function getName() view public returns(string memory){
        return _name;
    }

    function reply() view public returns(string memory){
        return string.concat(getName()," on call!");
    }
}


contract ContactBook{

	string private _name;

	address private _address;
	
	uint256 private _numberOfContacts;

	address[] private _contacts;
    
	mapping(address=>string) private _contactNames;

	constructor(string memory name){
		_name = name;
		_address = msg.sender;
	}

    function callContact(uint256 index) view public returns(string memory){
        Contact newContact = getContact(index);
        return newContact.reply();
    }

    function getContact(uint256 index) view public returns(Contact){
        return Contact(_contacts[index]);
    }

	function setName(string memory name) public onlyOwner{
		_name = name;
	}

	function getName() view public returns(string memory){
		return _name;
	}

	function setAddress(address account) public onlyOwner{
		_address = account;
	}

	function getAddress() view public returns(address){
		return _address;
	}

	function addContact(string memory name) public onlyOwner emitEvent(name) {
		Contact newContact = new Contact(name);
        _contacts.push(address(newContact));
		_contactNames[address(newContact)]=name;
	}

	function getLastIndex() view public returns(uint256){
		return _contacts.length;
	}

	function getContactAddress(uint256 number) view public returns(address){
		return _contacts[number];
	}

	function getContactName(address account) view public returns(string memory){
		return _contactNames[account];
	}

	event NewContact(string name, uint256 index);

	modifier onlyOwner(){
		require(msg.sender == getAddress(),"Only owner can call this function");
		_;
	}

    modifier emitEvent(string memory name){
        _;
        emit NewContact(name,getLastIndex());
    }

}
