// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");


// beforeEach(() => {
//     // Get a list of all accounts
//     web3.eth.getAccounts().then((fetchedAccounts) => {
//       console.log(fetchedAccounts);
//     });
//   });

//   describe("Inbox", () => {
//     it("deploys a contract", () => {});
//   });

// let accounts;

// beforeEach(async () => {
//   // Get a list of all accounts
//   accounts = await web3.eth.getAccounts();
// });

// describe("Inbox", () => {
//   it("deploys a contract", () => {
//     console.log(accounts);
//   });
// });


let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ["Hi there!"],
        })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
    it("deploys a contract", () => {
        assert.ok(inbox.options.address);
        //console.log(inbox);
    });
    it("has a default message", async() => {
        const message = await inbox.methods.message().call();
        assert.equal(message, "Hi there!");
    });
    it("updating the default message", async() => {
        await inbox.methods.setMessage("bye").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, "bye");
    });
});

