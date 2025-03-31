// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insurance {
    address public insurer;
    uint256 public policyCount = 0;

    struct Policy {
        uint256 policyId;
        address policyHolder;
        uint256 premium;
        uint256 coverageAmount;
        bool isClaimed;
        string ipfsHash; // IPFS Hash of policy document
    }

    mapping(uint256 => Policy) public policies;

    event PolicyCreated(uint256 policyId, address policyHolder, uint256 premium, uint256 coverageAmount, string ipfsHash);
    event PolicyClaimed(uint256 policyId, address policyHolder);

    constructor() {
        insurer = msg.sender;
    }

    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only insurer can perform this action.");
        _;
    }

    function createPolicy(address _policyHolder, uint256 _premium, uint256 _coverageAmount, string memory _ipfsHash) public onlyInsurer {
        policyCount++;
        policies[policyCount] = Policy(policyCount, _policyHolder, _premium, _coverageAmount, false, _ipfsHash);
        emit PolicyCreated(policyCount, _policyHolder, _premium, _coverageAmount, _ipfsHash);
    }

    function claimPolicy(uint256 _policyId) public {
        Policy storage policy = policies[_policyId];
        require(policy.policyHolder == msg.sender, "You are not the policyholder.");
        require(!policy.isClaimed, "Policy already claimed.");
        policy.isClaimed = true;
        emit PolicyClaimed(_policyId, msg.sender);
    }
}
