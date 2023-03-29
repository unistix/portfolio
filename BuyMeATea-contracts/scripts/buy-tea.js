// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//helper functions

// Returns the Ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address); //provider find balance of address
  return hre.ethers.utils.formatEther(balanceBigInt); //convert to number with ethers
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  //takes array of addresses - owner, tipper and contract and prints their balance
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address)); //loops over addresses of all previous coffee buyers
    idx ++;
  }
}

// Logs the memos stored on-chain from coffee purchases.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}


async function main() {

  //This should be deploy only
  //everything in test should be run in test.


  //Get example accounts.
  // set owner as the first.

  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners(); //hardhat populates this

  //Get contract to deploy.
  const BuyMeATea= await hre.ethers.getContractFactory("BuyMeATea"); //call factory
  const buyMeATea = await BuyMeATea.deploy(); //start deploy

  //deploy contract.
  await buyMeATea.deployed(); //wait till it's been deployed
  console.log("BuyMeATea deployed to:", buyMeATea.address); //log that it's been deployed at a certain contract address
  //Check balances before the coffee purchase.
  const addresses = [owner.address, tipper.address, buyMeATea.address];
  console.log("== start ==");
  await printBalances(addresses);


  ///TEST

  //--Buy the owner a few coffees.
  const tip = {value: hre.ethers.utils.parseEther("1")}; //by passing 1 it means 1 polygon can only ever be sent. 
  //this is where multiple tip options come into play
  // tip is a json object with value set by parsing srting into BigNumber.

  const pepper = {value: hre.ethers.utils.parseEther("1")}; //peppermint
  const ginger = {value: hre.ethers.utils.parseEther("5")}; //ginger
  const cham = {value: hre.ethers.utils.parseEther("10")}; //chamomile

 

  //connect to contract and pass in name and message
  // Check balances after the coffee purchase.
  await buyMeATea.connect(tipper).buyTea("Carolina", "You're the best!", tip);
  


  //Check balances after coffee purchase.
  console.log("== bought coffee ==");
  await printBalances(addresses);


  //--Withdraw funds--
   // Withdraw.
   await buyMeATea.connect(owner).withdrawTips();

   // Check balances after withdrawal.
   console.log("== withdrawTips ==");
   await printBalances(addresses);


  //Read All the memos left for the owner.
  console.log("== memos ==");
  const memos = await buyMeATea.getMemos();
  printMemos(memos);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
