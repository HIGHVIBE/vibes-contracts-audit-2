import {ethers,network} from "hardhat";
import {spawn} from "child_process";
// import * as fs from 'fs-extra';



async function main() {

    // var adressJson=fs.readJsonSync('../address.json',  { throws: false });
   
    // if(adressJson=== undefined||adressJson== null)
    //     adressJson={}
    // console.log("adressJson: ", adressJson)
    // console.log("Last Deployed addreses: ", adressJson)
    // Deploy VibesFactory\
    const VibesFactory = await ethers.getContractFactory("VibesFactory")
    const factory = await VibesFactory.deploy()

    await factory.deployed()

    console.log("VibesFactory deployed to: ", factory.address)

    console.log(`yarn hardhat verify --network ${network.name} ${factory.address} `)
    spawn(`yarn hardhat verify --network ${network.name} ${factory.address} `)
    // adressJson.factory=factory.address
    // // console.log("adressJson: ", adressJson)

    // fs.writeJsonSync('../address.json', adressJson,{encoding:'utf8',flag:'w'});
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });