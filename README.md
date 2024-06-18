# Taylor Swift Concert Tickets 

## Overview
This decentralized application (DApp) allows users to purchase tickets for Taylor Swift concerts using Ethereum cryptocurrency. Users can buy general and VIP tickets depending on their Ethereum wallet balance.

The project consists of:
- A Solidity smart contract (`Assessment.sol`) deployed on the Ethereum blockchain.
- A frontend React application that interacts with the smart contract using ethers.js and MetaMask.

## Features
- Purchase general tickets.
- Purchase VIP tickets.
- View account balance.
- View total general and VIP tickets purchased.

## Dependencies
- React
- ethers.js
- MetaMask

## Running the code

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Authors

Manvitha R Kabbathi

[manvitha.r.kabbathi@gmail.com]

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
