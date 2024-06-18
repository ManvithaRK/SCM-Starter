import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [vipTick, setVipTick] = useState(undefined);
  const [generalTick, setGeneralTick] = useState(undefined);
  const [ticketNumber, setTicketNumber] = useState(''); 

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (account) => {
    if (account && account.length > 0) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const getGeneralTicketCount = async () => {
    if (atm) {
      setGeneralTick((await atm.getGeneralTicketCount()).toNumber());
    }
  };

  const getVIPTicketCount = async () => {
    if (atm) {
      setVipTick((await atm.getVIPTicketCount()).toNumber());
    }
  };

  const generalTicket = async () => {
    if (atm) {
      let tx = await atm.generalTicket(Number(ticketNumber));
      await tx.wait();
      getBalance();
      getGeneralTicketCount();
    }
  };

  const VIP = async () => {
    if (atm) {
      let tx = await atm.VIP(Number(ticketNumber));
      await tx.wait();
      getBalance();
      getVIPTicketCount();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <input 
          type="textbox" 
          placeholder="Number of tickets" 
          value={ticketNumber} 
          onChange={(e) => setTicketNumber(e.target.value)} 
        />
        <button onClick={generalTicket}>General Ticket</button>
        <button onClick={VIP}>VIP</button>
        <p>General Tickets Purchased:{generalTick}</p>
        <p>VIP Tickets Purchased:{vipTick}</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Taylor Swift Concert Tickets</h1>
      <p>General Ticket Cost:<u> $250</u></p>
      <p>VIP Ticket Cost:<u> $500</u> </p>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          border:5px solid black;
        }
        p {  
          margin: 0 auto;
        }
        
      `}</style>
    </main>
  );
}
