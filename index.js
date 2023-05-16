let connectEl = document.getElementById("btnconnect");

async function connect() {
  if (typeof window.ethereum != "undefined") {
    console.log("There is an EVM-Based Wallet.");
    await window.ethereum.request({ method: "eth_requestAccounts" }); // Await to wait MM to be fully connected.
    connectEl.innerHTML = "Connected!";
  } else {
    console.log("No EVM-Based Wallet.");
  }
}
