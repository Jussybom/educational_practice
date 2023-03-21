// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;
//200000000000000000
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract JUSCoin is ERC20Burnable, ERC20Capped, Ownable {

    constructor() ERC20("JUS coin", "JUS") ERC20Capped(200000*(10**decimals())) Ownable(){

  }

    function decimals() public view virtual override returns (uint8) {
        return 14;
    }

    function mint(address account, uint256 amount) public virtual onlyOwner{
       _mint(account, amount);
    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20,ERC20Capped){
       super._mint(account, amount);
    }

}

  contract JUSITO is Context, Ownable{

    uint256  _price;

    address public _token;

    constructor(address token_, uint256 price_){
        _price = price_;
        _token = token_;

    }

    function setPrice(uint256 price_)public onlyOwner{
        _price = price_;
    }

    function getPrice()view public returns(uint256){
        return _price;

    }
    fallback() external payable{
        uint256 amount = msg.value;
        uint256 numberOfToken = calculateAmount(msg.value);
        JUSCoin(_token).mint(_msgSender(), numberOfToken);

    }

    function calculateAmount(uint256 amount) view public returns(uint256){
        return amount/getPrice();

    }
}
