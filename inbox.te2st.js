const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const obj = require("./compile");
var inboxInstance;
var fetchedAccounts;
const INITIAL_STRING = "Mi revolver te mata";
beforeEach(async () => {
  //Recuperamos cuentas de la red actual
  fetchedAccounts = await web3.eth.getAccounts();
  // console.log(fetchedAcocunts);
  //Usamos una de las cuentas de ganache para desplegar el contrato
  //console.log(Object.keys(obj["InboxContract"]));
  let interface = obj["InboxContract"].abi;
  let bytecode = obj["InboxContract"].evm.bytecode.object;
  inboxInstance = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: ["Mi revolver te mata"] })
    .send({ from: fetchedAccounts[0], gas: "1000000" });
  //console.log(inboxInstance);
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inboxInstance.options.address);
  });

  it("has a default message", async () => {
    const message = await inboxInstance.methods.message().call();
    assert.strictEqual(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    let hash = await inboxInstance.methods.setMessage("Easy kill").send({ from: fetchedAccounts[0] });
    const message = await inboxInstance.methods.message().call();
    assert.strictEqual(message, "Easy kill");
  });
});
