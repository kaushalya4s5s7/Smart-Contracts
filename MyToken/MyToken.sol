// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract MyToken {
    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed recipient, uint256 amount);

    // State variables
    mapping(address => uint256) private balances;
    uint256 public totalSupply;
    address private owner;

    // Constructor
    constructor(uint256 initialSupply) {
        owner = msg.sender;
        mint(msg.sender, initialSupply);
    }

    // Mint tokens
    function mint(address recipient, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can perform this action");
        balances[recipient] += amount;
        totalSupply += amount;
        emit Mint(recipient, amount);
    }

    // Query balance
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    // Transfer tokens
    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(amount <= balances[msg.sender], "Not enough balance.");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
}

