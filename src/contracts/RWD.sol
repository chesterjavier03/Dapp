// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

contract RWD {
    string public name = "Reward Token";
    string public symbol = "RWD";
    uint256 public totalSupply = 100**18;
    uint8 public decimal = 18;

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _recipient, uint256 _value)
        public
        returns (bool)
    {
        require(balanceOf[msg.sender] >= _value, "Insufficient funds");
        balanceOf[msg.sender] -= _value;
        balanceOf[_recipient] += _value;

        emit Transfer(msg.sender, _recipient, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool) {
        require(balanceOf[_from] >= _value, "Insufficient funds");
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
