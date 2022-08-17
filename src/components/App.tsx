declare var window: any;
import React from "react";
import "./App.css";
import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { ParticleSetting } from "./ParticleSetting";
import Web3 from "web3";
const Tether: { [key: string]: any } = require("../truffle_abis/Tether.json");
const RWD: { [key: string]: any } = require("../truffle_abis/RWD.json");
const Bank: { [key: string]: any } = require("../truffle_abis/Bank.json");

export const App = () => {
  const [account, setAccount] = React.useState<any>();
  const [tether, setTether] = React.useState<any>();
  const [rwd, setRwd] = React.useState<any>();
  const [theBank, setTheBank] = React.useState<any>();
  const [tetherBalance, setTetherBalance] = React.useState<any>();
  const [rwdBalance, setRwdBalance] = React.useState<any>();
  const [stakingBalance, setStakingBalance] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function loadWeb3Data() {
      await loadWeb3();
    }
    async function loadBlockChain() {
      await loadBlockchainData();
    }
    loadWeb3Data();
    loadBlockChain();
  }, [tetherBalance, account, rwdBalance, stakingBalance, tether]);

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const _account = await web3.eth.getAccounts();
    setAccount(_account[0]);
    const networkId = await web3.eth.net.getId();
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const _tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      setTether(_tether);
      let _tetherBalance = await _tether.methods.balanceOf(_account[0]).call();
      setTetherBalance(_tetherBalance);
    } else {
      window.alert(
        "ERROR: Tether contract not deployed - no detected network!"
      );
    }

    const RWDData = RWD.networks[networkId];
    const _rwd = new web3.eth.Contract(RWD.abi, RWDData.address);

    if (_rwd) {
      setRwd(_rwd);
      let _rwdBalance = await _rwd.methods.balanceOf(_account[0]).call();
      setRwdBalance(_rwdBalance);
    } else {
      window.alert(
        "ERROR: Rewards contract not deployed - no detected network!"
      );
    }

    const BankData = Bank.networks[networkId];
    const _bank = new web3.eth.Contract(Bank.abi, BankData.address);

    if (_bank) {
      setTheBank(_bank);
      let _bankStakingBalance = await _bank.methods
        .stakingBalance(_account[0])
        .call();
      setStakingBalance(_bankStakingBalance);
    } else {
      window.alert("ERROR: Bank contract not deployed - no detected network!");
    }
    setLoading(false);
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereuem browser detected! You can checkout Metamask!");
    }
  };

  const loadingContent = () => {
    return (
      <p
        id="loader"
        className="text-center"
        style={{ margin: "30px", color: "white" }}
      >
        LOADING PLEASE....
      </p>
    );
  };

  const stakeToken = (stakeAmount: string) => {
    setLoading(true);
    tether.methods
      .approve(theBank._address, stakeAmount)
      .send({ from: account })
      .on("transactionHash", (hash: any) => {
        theBank.methods
          .depositTokens(stakeAmount)
          .send({ from: account })
          .on("transactionHash", (hash: any) => {
            setLoading(false);
          });
      });
  };

  const unStakeToken = () => {
    setLoading(true);
    theBank.methods
      .unstakeTokens()
      .send({ from: account })
      .on("transactionHash", (hash: any) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="App" style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>
          <ParticleSetting />
        </div>
        <Navbar account={account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "100vw", minHeight: "100vw" }}
            >
              <div>
                {loading ? (
                  loadingContent()
                ) : (
                  <>
                    <Main
                      tetherBalance={tetherBalance}
                      rwdBalance={rwdBalance}
                      stakingBalance={stakingBalance}
                      stakeToken={stakeToken}
                      unStakeToken={unStakeToken}
                      theBank={theBank}
                      account={account}
                    />
                  </>
                )}
                {/* <Main /> */}
              </div>
            </main>
          </div>
        </div>
        <div
          style={{
            color: "green",
            fontSize: "30px",
          }}
        ></div>
      </div>
    </>
  );
};
