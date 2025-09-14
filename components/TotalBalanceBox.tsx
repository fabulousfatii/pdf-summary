"use client"

import AnimatedCount from "./ui/AnimationCount";
import DoughnutChart from "./ui/DonoutChart";


function TotalBalanceBox({accounts=[], totalBanks="1", totalCurrentBalance } :TotalBalanceprops) {

    return (
        <div>
            <DoughnutChart accounts={accounts}/>
            <AnimatedCount amount={totalCurrentBalance}/>
        </div>
    )
}

export default TotalBalanceBox;