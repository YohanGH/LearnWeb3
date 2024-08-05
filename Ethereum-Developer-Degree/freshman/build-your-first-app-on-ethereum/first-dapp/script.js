// Import necessary functions and objects from the viem package
import {
    createWalletClient,
    custom,
    getContract,
} from "https://esm.sh/viem";
import { sepolia } from "https://esm.sh/viem/chains";

// Create a client that connects the user's account to Ethereum Sepolia
const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
});

// Request user addresses asynchronously
async function getAddress() {
    try {
        // This will make your wallet extension show you a pop-up requesting you to connect your wallet
        // accounts will be an array
        const accounts = await walletClient.requestAddresses();

        // Get the first address in the accounts array
        const [address] = accounts;
        return address;
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return null;
    }
}

// Define the contract address and ABI
const MoodContractAddress = "0x7293D2533009B26692b120Ef6F128B074265D713";
const MoodContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Create an instance of the contract
async function getMoodContractInstance() {
    const address = await getAddress();
    if (!address) {
        alert("Failed to get wallet address. Please try again.");
        return null;
    }

    const MoodContractInstance = getContract({
        address: MoodContractAddress,
        abi: MoodContractABI,
        client: walletClient,
    });

    return { MoodContractInstance, address };
}

// Function to read mood from the contract
async function getMood() {
    try {
        const { MoodContractInstance } = await getMoodContractInstance();
        if (!MoodContractInstance) return;

        // Since getMood in our contract is a read function, your wallet won't pop up
        const mood = await MoodContractInstance.read.getMood();
        document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    } catch (error) {
        console.error("Error fetching mood:", error);
        document.getElementById("showMood").innerText = `Error: Could not fetch mood.`;
    }
}

// Function to set mood in the contract
async function setMood() {
    try {
        const { MoodContractInstance, address } = await getMoodContractInstance();
        if (!MoodContractInstance) return;

        const mood = document.getElementById("mood").value;
        // setMood in our contract is a write function so your wallet will pop up and will ask you to confirm your transaction, requiring some gas fees.
        await MoodContractInstance.write.setMood([mood], {
            account: address
        });
        document.getElementById("showMood").innerText = `Mood set to: ${mood}`;
    } catch (error) {
        console.error("Error setting mood:", error);
        document.getElementById("showMood").innerText = `Error: Could not set mood.`;
    }
}

// Add event listeners for buttons after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button#getMoodButton').addEventListener('click', getMood);
    document.querySelector('button#setMoodButton').addEventListener('click', setMood);
});
