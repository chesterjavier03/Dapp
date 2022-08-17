declare var window: any;
import React from "react";
import tether from "../tether.png";
import { Airdrop } from "./Airdrop";

export const Main: React.FunctionComponent<{
  tetherBalance: string;
  rwdBalance: string;
  stakingBalance: string;
  theBank: any;
  account: string;
  stakeToken: Function;
  unStakeToken: Function;
}> = (props) => {
  return (
    <>
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "white" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "white" }}>
              <td>
                {window.web3.utils.fromWei(props.stakingBalance, "Ether")} USDT
              </td>
              <td>
                {window.web3.utils.fromWei(props.rwdBalance, "Ether")} RWD
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          <form
            className="mb-3"
            onSubmit={(event) => {
              event.preventDefault();
              const target = event.target as HTMLFormElement;
              let amount = target.amount.value;
              amount = window.web3.utils.toWei(amount.toString(), "Ether");
              props.stakeToken(amount);
            }}
          >
            <div
              style={{
                borderSpacing: "0 1em",
              }}
            >
              <label className="float-left " style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: "8px" }}>
                Balance:{" "}
                {window.web3.utils.fromWei(props.tetherBalance, "Ether")}
              </span>
              <div className="input-group mb-4">
                <input name="amount" type="text" placeholder="0" required />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img src={tether} alt="tether" width="50" height="30" />
                    &nbsp;&nbsp;&nbsp;USDT
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                DEPOSIT
              </button>
            </div>
          </form>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={(event) => {
              event.preventDefault();
              props.unStakeToken();
            }}
          >
            WITHDRAW
          </button>
          <div className="card-body text-center" style={{ color: "blue" }}>
            <Airdrop
              time={5}
              stakingBalance={props.stakingBalance}
              theBank={props.theBank}
              account={props.account}
            />
          </div>
        </div>
      </div>
    </>
  );
};
