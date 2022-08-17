// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;
import "./RWD.sol";
import "./Tether.sol";

contract Bank {
    string public name = "Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Tether _tether) public {
        tether = _tether;
        rwd = _rwd;
        owner = msg.sender;
    }

    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "Amount can not be zero");
        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function issueTokens() public {
        require(msg.sender == owner, "Only owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9;
            if (balance > 0) rwd.transfer(recipient, balance);
        }
    }

    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "Amount to be greater than zero");
        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaked[msg.sender] = false;
    }
}
