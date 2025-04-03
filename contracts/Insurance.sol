// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Insurance {
    struct PolicyHolder {
        address buyer;
        uint lastPaymentTimestamp;
        bool claimed;
    }

    struct Policy {
        uint id;
        string name;
        uint price;
        uint coverageAmount;
        string coverage;
        uint premiumDuration;
    }

    uint public policyCount = 0;
    mapping(uint => Policy) public policies;
    // Map policy ID to buyer address to PolicyHolder details
    mapping(uint => mapping(address => PolicyHolder)) public policyHolders;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this.");
        _;
    }

    modifier onlyPolicyHolder(uint _id) {
        require(policyHolders[_id][msg.sender].buyer != address(0), "Not a policy holder.");
        _;
    }

    function createPolicy(
        string memory _name, 
        uint _price, 
        uint _coverageAmount, 
        string memory _coverage, 
        uint _premiumDuration
    ) public onlyAdmin {
        policyCount++;
        policies[policyCount] = Policy(
            policyCount, 
            _name, 
            _price, 
            _coverageAmount, 
            _coverage, 
            _premiumDuration
        );
    }

    function buyPolicy(uint _id) public payable {
        Policy storage policy = policies[_id];
        require(msg.value >= policy.price, "Not enough Ether to buy this policy.");
        require(policyHolders[_id][msg.sender].buyer == address(0), "You already own this policy.");
        
        policyHolders[_id][msg.sender] = PolicyHolder(
            msg.sender,
            block.timestamp,
            false
        );
    }

    function payPremium(uint _id) public payable onlyPolicyHolder(_id) {
        Policy storage policy = policies[_id];
        PolicyHolder storage holder = policyHolders[_id][msg.sender];
        require(!holder.claimed, "Policy has already been claimed.");
        
        uint nextDueDate = holder.lastPaymentTimestamp + policy.premiumDuration;
        require(block.timestamp >= nextDueDate, "Premium payment is not yet due.");
        require(msg.value >= policy.price, "Not enough Ether to pay the premium.");

        holder.lastPaymentTimestamp = block.timestamp;
    }

    function claimPolicy(uint _id) public onlyPolicyHolder(_id) {
        Policy storage policy = policies[_id];
        PolicyHolder storage holder = policyHolders[_id][msg.sender];
        require(!holder.claimed, "Policy already claimed.");
        require(address(this).balance >= policy.coverageAmount, "Not enough funds in contract to pay coverage.");

        holder.claimed = true;
        payable(msg.sender).transfer(policy.coverageAmount);
    }

    function isOverdue(uint _id, address _buyer) public view returns (bool) {
        PolicyHolder storage holder = policyHolders[_id][_buyer];
        require(holder.buyer != address(0), "Not a policy holder");
        uint nextDueDate = holder.lastPaymentTimestamp + policies[_id].premiumDuration;
        return block.timestamp > nextDueDate;
    }

    function getContractBalance() public view onlyAdmin returns (uint) {
        return address(this).balance;
    }

    function withdrawFunds() public onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }
}