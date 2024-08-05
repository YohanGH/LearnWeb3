# LearnWeb3

## About

This repository contains exercises from LearnWeb3 to put my learning into practice. It includes a series of tutorials and projects that help in understanding the fundamentals of blockchain development and decentralized applications (dApps) on Ethereum.

## Exercises

### Exercise 1: Build Your First Decentralized Application on Ethereum

This is a step-by-step tutorial on how to create a simple frontend website, develop and deploy a Solidity smart contract, and connect them together. By the end of this tutorial, you will have a basic understanding of how to build and interact with dApps.

#### Tools Used

- **MetaMask**: A browser extension for managing Ethereum accounts and interacting with dApps.
- **Remix IDE**: An online IDE for writing, compiling, and deploying Solidity smart contracts.
- **Viem**: A library for interacting with Ethereum nodes and smart contracts.

#### Tutorial Stages

1. **Create a Basic HTML Web Page**

   - Set up a simple frontend with HTML, CSS, and JavaScript.
   - Design a user interface with buttons for interacting with the smart contract.

2. **Create a Basic Solidity Smart Contract**

   - Write a simple smart contract using Solidity.
   - Deploy the contract using Remix IDE on a test network.

3. **Connect the Web Page with the Smart Contracts Using Viem**

   - Use Viem to interact with the deployed smart contract.
   - Implement JavaScript functions to call the smart contract methods from the frontend.

#### Solidity Smart Contract

The Solidity smart contract for this tutorial is located in the `contracts` directory. Here’s how you can use Remix to deploy and interact with it:

1. **Open Remix IDE**: Go to [Remix Ethereum IDE](https://remix.ethereum.org/).

2. **Create a New File**: In Remix, create a new file named `MyContract.sol` and paste the contents of the `contracts/MyContract.sol` file into it.

3. **Compile the Contract**: Use the Solidity compiler in Remix to compile the contract. Ensure that you select the appropriate compiler version (e.g., 0.8.x).

4. **Deploy the Contract**:
   - Switch to the **Deploy & Run Transactions** tab in Remix.
   - Choose an environment (e.g., Injected Web3 for MetaMask).
   - Deploy the contract by specifying the constructor arguments if necessary.

5. **Interact with the Contract**:
   - Use the Remix interface to call functions on your deployed contract.
   - Update the state of the contract using the `setMessage` function or retrieve information with `getMessage`.

#### Getting Started

To get started with this exercise, follow the step-by-step instructions provided in the tutorial files located in the `freshman/build-your-first-app-on-ethereum/first-dapp` directory.

#### Prerequisites

Before starting this tutorial, ensure you have the following installed:

- **MetaMask**: Available as a browser extension for Chrome, Firefox, and other browsers.
- **Node.js**: Required for running JavaScript and interacting with Ethereum.
- **Viem**: Install via npm with `npm install viem`.

#### Usage

1. Clone this repository:
   ```bash
   git clone https://github.com/YohanGH/LearnWeb3.git
   cd LearnWeb3/freshman/build-your-first-app-on-ethereum/first-dapp
   ```
2. Open the index.html file in a browser to view the web page.
3. Follow the instructions in the tutorial to deploy the smart contract and connect it to the web page.

### Outcome

By completing this exercise, you will have a foundational understanding of building decentralized applications and interacting with Ethereum smart contracts using modern tools and libraries.
