const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeATea.sol/BuyMeATea.json");

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  // Get the contract that has been deployed to Goerli.
  const contractAddress=process.env.CONTRACT_ADDRESS;
  const contractABI = abi.abi;

  // Get the node connection and wallet connection.
  //const provider = new hre.ethers.providers.AlchemyProvider("polygon_mumbai", process.env.ALCHEMY_API_KEY);
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);

  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error.
  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Instantiate connected contract.
  const buyMeATea= new hre.ethers.Contract(contractAddress, contractABI, signer);

  // Check starting balances.
  console.log("current balance of owner: ", await getBalance(provider, signer.address), "MATIC");
  const contractBalance = await getBalance(provider, buyMeATea.address);
  console.log("current balance of contract: ", await getBalance(provider, buyMeATea.address), "MATIC");

  // Withdraw funds if there are funds to withdraw.
  if (contractBalance !== "0.0") {
    console.log("withdrawing funds..")
    const withdrawTxn = await buyMeATea.withdrawTips();
    await withdrawTxn.wait();
  } else {
    console.log("no funds to withdraw!");
  }

  // Check ending balance.
  console.log("current balance of owner: ", await getBalance(provider, signer.address), "MATIC");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });