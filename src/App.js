import './App.css';
import { ethers, BigNumber }  from "ethers";
import { useEffect, useState } from "react";
import mintAbi from "./abi/Mint.json"

const mintAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  
  const [accounts, setAccounts] = useState([])
  
  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts)
      // Grabbing accounts from method key and setting them into state. 
    }
  }

  useEffect(() => {
    connectAccounts()
  }, [])
  // Calls the function at the beginning when page loads

  // MINTING: 
    const [mintAmount, setMintAmount] = useState(1)

    async function handleMint() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum) // Provider is way to connect to blockchain
        const signer = provider.getSigner() // Since due to transaction, need approval for transaction
        const contract = new ethers.Contract(mintAddress, mintAbi.abi, signer)
        try {
          const response = await contract.mint(BigNumber.from(mintAmount))
          console.log("Response: ", response)
        } catch (err) {
            console.log("Error: ", err)
        }
      }
    }

  return (  
    
    <div className="App">
      This is how you create a mint button 
      {accounts.length && (
          <div>
            <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
            {mintAmount}
            <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
            <button onClick={handleMint}>Mint</button>
           </div>
      )}
    </div>

  );
}

export default App;
