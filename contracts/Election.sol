// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "maci-contracts/sol/MACI.sol";
import "maci-contracts/sol/MACISharedObjs.sol";
import "maci-contracts/sol/gatekeepers/SignUpGatekeeper.sol";
import "maci-contracts/sol/initialVoiceCreditProxy/InitialVoiceCreditProxy.sol";

contract Election is Ownable, MACISharedObjs, SignUpGatekeeper, InitialVoiceCreditProxy {
    address public coordinator;

    constructor(address _coordinator) public {
        coordinator = _coordinator;
    }

    /**
     * @dev Register user for voting.
     * This function is part of SignUpGatekeeper interface.
     * @param _data Encoded address of a contributor.
     */
    function register(
        address, /* _caller */
        bytes memory _data
    ) public override {}

    /**
     * @dev Get the amount of voice credits for a given address.
     * This function is a part of the InitialVoiceCreditProxy interface.
     * @param _data Encoded address of a user.
     */
    function getVoiceCredits(
        address, /* _caller */
        bytes memory _data
    ) public view override returns (uint256) {}
}
