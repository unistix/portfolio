//script only deploy buy me a tea

const hre = require("hardhat");

async function main() {
 //Get contract to deploy.
 const BuyMeATea= await hre.ethers.getContractFactory("BuyMeATea"); //call factory
 const buyMeATea = await BuyMeATea.deploy(); //start deploy

 //deploy contract.
 await buyMeATea.deployed(); //wait till it's been deployed
 console.log("BuyMeATea deployed to:", buyMeATea.address); //log that it's been deployed at a certain contract address
}
 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });