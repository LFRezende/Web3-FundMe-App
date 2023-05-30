import { ethers } from "./ethers-5.7.esm.min.js";
import { abi, contractAddress } from "./constants.js";

let connectEl = document.getElementById("btnconnect");
let fundEl = document.getElementById("fundbtn");
let noMM = document.getElementById("No-MM");
let noFundEl = document.getElementById("FundDenied");
let inputFund = document.getElementById("fundBar");

connectEl.onclick = connect;
fundEl.onclick = fund;

async function connect() {
  if (typeof window.ethereum != "undefined") {
    console.log("There is an EVM-Based Wallet.");
    await window.ethereum.request({ method: "eth_requestAccounts" }); // Await to wait MM to be fully connected.
    connectEl.innerHTML = "Connected";
  } else {
    noMM.innerHTML = "Install Metamask to proceed.";
    console.log("No EVM-Based Wallet.");
    // Added in HTML the type = module. This makes the calling of buttons impossible in HTML, they need to be done in the JS.
    // Add them on the top of this script;
  }
}

async function fund() {
  const ethAmount = "0.1";
  if (typeof window.ethereum != "undefined") {
    console.log("Wallet is connected.");
    const provider = new ethers.providers.Web3Provider(window.ethereum); // ethers --> provedores --> Provedor Web3 --> aquele de window.ethereum
    const signer = provider.getSigner();
    /*For your contract to be interacted with, you need its ABI and its ADDRESS; */
    /*Grab the ABI of the smart contract's json in the root project and then add it to the js file (export it and import it in index.js) */
    /*Run a separate terminal node in the project's folder (of the smart contract), save it in a js file and then export it and import it*/
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const txResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(txResponse, provider);
      console.log("Done!");
    } catch (error) {
      console.log(error);
      noFundEl.innerHTML = "- User Rejected Transaction ⚠️ - ";
    }

    /* Observação: Se fechar o nó do hardhat, resete a conta na Metamask (APENAS EM SERVIDORES LOCAIS) */
  }

  function listenForTransactionMine(txResponse, provider) {
    console.log(`Mining ${txResponse.hash} ...`);
    // Ethers docs: Calls just once when the eventName event fires.
    // provider.once receives a hash, and then inputs a txReceipt into the anon function
    provider.once(txResponse.hash, (txReceipt) => {
      console.log(`Completed with ${txReceipt.confirmations} confirmations.`);
    });
  }
}
