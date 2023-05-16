import { ethers } from "./ethers-5.7.esm.min.js";

let connectEl = document.getElementById("btnconnect");
let fundEl = document.getElementById("fundbtn");
let noMM = document.getElementById("No-MM");

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

async function fund() {}
