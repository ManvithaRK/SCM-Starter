// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    uint256 public balance;
    uint256 public general_count;
    uint256 public vip_count;

    constructor(uint initBalance) payable {
        balance = initBalance;      
    }


    function getBalance() public view returns (uint256) {
        return balance;
    }

    function getGeneralTicketCount() public view returns(uint256){
        return general_count;
    }

    function getVIPTicketCount() public view returns(uint256){
        return vip_count;
    }

    function generalTicket(uint number) public {
        require(balance>=250*number,"Insufficient Balance");
        balance-=number*250;
        general_count++;
    }

    function VIP(uint number) public {
       require(balance>=500*number,"Insufficient Balance");
        balance-=number*500;
        vip_count++;
    }
}
