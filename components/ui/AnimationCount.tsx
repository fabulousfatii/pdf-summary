"use client"
import CountUp from 'react-countup';


function AnimatedCount({amount}:{amount:number}) {

    return (
<CountUp end={amount} />
    )
}

export default AnimatedCount;