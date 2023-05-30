# Web3 App

This is a simple project, developed with help of the excelent course of Patrick Collins: https://www.youtube.com/watch?v=gyMwXuJrbJQ.

## Javascript Routine Hints

In order for us to utilize ethers for Smart Contract Functionalities, we have to import it.

Requiring doesn't work in Front End, so we actually import stuff.

For it, though, we need (for now) to add a package for the front end call web browser ethers. For that, we go to its documentation (docs.ethers.io/) and then go to the section of Web Browser.

For it then, we grab the ethers library, add it to our folder with the weird title of it.

Now, import it in the file.

''' import {ethers} from "./ethers-5.7.esm.min.js" '''

Then, change the script div from ''' type="text/javascript"''' to ''' type="module"'''

However, now you can't use commands directly in html.
For example, the following:
'''
<button src="index.js" onclick="connect()">Connect</button>
'''
Doesn't work anymore. You have to remove the onclick portion, and refactor it in the index.js file.

'''
const connectButton = document.getElementById("btn");
connectButton.onclick = connect;
'''

## Connecting to the Smart Contract

After checking if MM is on by nesting the upcoming commands within this following "if" statement:

'''
if (typeof window.ethereum !== "undefined"){

}
'''
Then proceed and add the following:

'''
if (typeof window.ethereum !== "undefined"){
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = providers.getSigner();
}
'''
