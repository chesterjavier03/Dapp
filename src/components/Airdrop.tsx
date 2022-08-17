import * as React from "react";
import { clearInterval } from "timers";

export const Airdrop: React.FunctionComponent<{
  time: number;
  stakingBalance: string;
  theBank: any;
  account: string;
}> = (props) => {
  const [seconds, setSeconds] = React.useState<number>(props.time);

  const displaySeconds = seconds % 60;
  const displayMinutes = Math.floor(seconds / 60);
  const displayHours = Math.floor(displayMinutes / 60);

  React.useEffect(() => {
    if (props.stakingBalance >= "5000000 0000000000000") {
      if (seconds > 0) {
        setTimeout(() => {
          setSeconds((state) => state - 1);
        }, 1000);
      } else {
        clearInterval();
      }
      doSOmething();
    }
  }, [seconds, props.stakingBalance]);

  const doSOmething = () => {
    if (seconds == 0) {
      airdropReleaseTokens();
    }
  };

  const airdropReleaseTokens = () => {
    props.theBank.methods.issueTokens().call();
    alert("success");
  };

  return (
    <>
      <div>
        AIRDROP
        <div>
          {displayHours}:{displayMinutes}:{displaySeconds}
        </div>
      </div>
    </>
  );
};
