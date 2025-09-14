"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



function DoughnutChart({accounts}:{accounts:[]}) {
    const data= {
        datasets: [{
            label: 'Banks',
            data: [1022,2034,1709],
            backgroundColor:['#00FFFF','#00CEF1','#398f96']
        }],
        labels: ['Bank1','Bank2','Bank3']
    }

    return (
        <div>
            <Doughnut data={data} />
        </div>
    )
}

export default DoughnutChart;