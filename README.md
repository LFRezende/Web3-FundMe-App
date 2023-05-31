# Web3 App

This is a simple project, developed with help of the excelent course of Patrick Collins: https://www.youtube.com/watch?v=gyMwXuJrbJQ.

## Javascript Routine Hints

In order for us to utilize ethers for Smart Contract Functionalities, we have to import it.

Requiring doesn't work in Front End, so we actually import stuff.

For it, though, we need (for now) to add a package for the front end call web browser ethers. For that, we go to its documentation (docs.ethers.io/) and then go to the section of Web Browser.

For it then, we grab the ethers library, add it to our folder with the weird title of it.

Now, import it in the file.

`import {ethers} from "./ethers-5.7.esm.min.js"`

Then, change the script div from `type="text/javascript"` to `type="module"`

However, now you can't use commands directly in html.
For example, the following:

```
<button src="index.js" onclick="connect()">Connect</button>
```

Doesn't work anymore. You have to remove the onclick portion, and refactor it in the index.js file.

```
const connectButton = document.getElementById("btn");
connectButton.onclick = connect;
```

## Connecting to the Smart Contract

After checking if MM is on by nesting the upcoming commands within this following "if" statement:

```
if (typeof window.ethereum !== "undefined"){

}
```

Then proceed and add the following:

```
if (typeof window.ethereum !== "undefined"){
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = providers.getSigner();
}
```

Now, for grabbing the contract...

Create a new js file.

Go to your project in hardhat, where you created your initial smart contract.

In its JSON file, copy and past the abi section.

Paste it in your new js here, storing it in a variable and then export it.

```
export const abi = [ ( ... )]
```

In your index.js:

```
import {abi} from "./constants.js"
```

Do the same for your contract address!

Tip: If in local hardhat host, go to the project, open up the terminal and then let the following:

```
yarn hardhat node
```

It will open up the node, and the address of the contract will be available.

```
export const contractAddress = "...";
```

Then, in your index.js file:

```
import {abi, contractAddress} from "./constants.js"
```

Finally, we can go back to scripting the interaction with the Smart Contract in the Fund function.

```
if (typeof window.ethereum !== "undefined"){
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = providers.getSigner();

// Now this part right here

const contract = new ethers.Contract(contractAddress, abi, signer);

}
```

Then, add the following snippet:

```
const txResponse = await contract.fund({value: ethers.utils.parseEther(ethAmount), })

// It needs to await the fund go through!!
```

Remember:

- ADD a Hardhat-LocalHost, with chainId 31337, with the rpc url as given by your hardhat node.
- Add your account (fake one, given by the node) to MM.

Now add a try/catch mechanism so your application doesn't break.

You'll end up with something similar to this:

```
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
```
