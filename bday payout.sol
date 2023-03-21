pragma solidity ^0.8.0;

import "https://github.com/bokkypoobah/BokkyPooBahsDateTimeLibrary/blob/master/contracts/BokkyPooBahsDateTimeLibrary.sol";
// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,Coco,100000000000000000,820857448
// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,Jane,100000000000000000,764241060
// 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB,Alisa,100000000000000000,662888615
contract BirthdayPayout {
    string _name;
    string warning;
    address _owner;

    Teammate[] public _teammates;

    struct Teammate {
        string name;
        address account;
        uint256 birthday;
        uint256 salary;
        uint256 last_payout;
    }

    uint256 constant GIFT = 100000000000000000;

    constructor() public {
        _name = "Archio";
        _owner = msg.sender;
    }

    function addTeammate(address account,string memory name, uint256 salary, uint256 birthday) public onlyOwner {
        require(msg.sender != account, "Cannot add oneself");
        Teammate memory newTeammate = Teammate(name,account, birthday,salary,0); 
        _teammates.push(newTeammate);
        emit NewTeammate(account, name);
    }

    function findBirthday() public onlyOwner {
        require(getTeammatesNumber()>0, "No teammates in the database");
        for (uint256 i=0;i<getTeammatesNumber();i++) {
            if(checkBirthday(i) && checkLastPayout(i)){
            birthdayPayout(i);   
        }
    }
 }
    function birthdayPayout(uint256 index) public onlyOwner {
        require(address(this).balance>=GIFT,"Not enough balance");
        for (uint256 i=0;i<getTeammatesNumber();i++) {
            if(!checkBirthday(i)){
                if(!checkLastPayout(i)){
                emit Warning(_teammates[index].name,_teammates[index].account,"The recipient has already received gift");
            } else {
            setLastPayout(index);
            sendToTeammate(index);
        emit HappyBirthday(_teammates[index].name,_teammates[index].account);
        }  
      }
    }
 }

    function setLastPayout(uint256 index) public{
        _teammates[index].last_payout=block.timestamp;
    }

    function getDate(uint256 timestamp) view public returns(uint256 year, uint256 month, uint256 day){
        (year, month, day) = BokkyPooBahsDateTimeLibrary.timestampToDate(timestamp);
    }

    function checkBirthday(uint256 index) view public returns(bool){
        uint256 birthday = getTeammate(index).birthday;
        (, uint256 birthday_month,uint256 birthday_day) = getDate(birthday);
        uint256 today = block.timestamp;
        (, uint256 today_month,uint256 today_day) = getDate(today);

        if(birthday_day == today_day && birthday_month==today_month){
            return true;
        }
        return false;  
    }

    function checkLastPayout(uint256 index) view public returns(bool){
        uint256 last_payout = getTeammate(index).last_payout;
        (uint256 last_payout_year, uint256 last_payout_month,uint256 last_payout_day) = getDate(last_payout);
        uint256 today = block.timestamp;
        (uint256 today_year, uint256 today_month,uint256 today_day) = getDate(today);

        if(last_payout_day == today_day && last_payout_month==today_month && last_payout_year==today_year){
            return false;
        }
        return true;
    }

    function getTeammate(uint256 index) view public returns(Teammate memory){
        return _teammates[index];
    }

    function getTeam() view public returns(Teammate[] memory){
        return  _teammates;
    }

    function getTeammatesNumber() view public returns(uint256){
        return _teammates.length;
    }

    function sendToTeammate(uint256 index) public onlyOwner{
        payable(_teammates[index].account).transfer(GIFT);
    }

    function deposit() public payable{

    }

    modifier onlyOwner{
        require(msg.sender == _owner,"Sender should be the owner of contract");
        _;
    }


    event NewTeammate(address account, string name);

    event HappyBirthday(string name, address account);

    event Warning(string name, address account, string warning);

}