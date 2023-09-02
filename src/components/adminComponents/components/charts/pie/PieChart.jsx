import React, {useState} from "react";
import {Pie} from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js/auto"
import {UserData} from "../../../constants/UserData";
// import {Chart as ChartJS} from "chart.js/auto"

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend
)

const PieChart = ({color}) => {
        const data = UserData;
        const [userData, setUserData] = useState({
            labels: data.map((labels) => labels.year),
            datasets: [{
                label: "Users Gain",
                // data: [],
                // backgroundColor: [color],
                data: data.map(value => value.userGain),
                backgroundColor: ['#51CC8A' ,'#fc0', '#5046E5', '#EF376E','orange','pink','violet'],
                barThickness: 10,
                borderRadius: 5
            }
            ]

        });

        /* useEffect(() => {
             const labels = userData.labels;
             const datasets = userData.datasets;
             const newDatasets = [{
                 ...datasets?.[0], data: data?.values, backgroundColor: [color]
             }]
             setUserData({
                 labels: [...data?.labels],
                 datasets: newDatasets
             });
         }, [data, color])
 */
        const options = {
            // maintainAspectRatio : false,
            responsive: true,
            scales: {
                y: {
                    // to increase the grace height
                    grace: 0.1,
                    grid: {
                        // to remove the y axis grid lines
                        // display: false
                    }
                },
                x: {
                    grid: {
                        // to remove the x axis grid lines
                        // display: false
                    }
                }
            },
            plugins: {
                datalabels: {
                    display: false,
                    color: "black",
                    // formatter: Math.round,
                    anchor: "end",
                    offset: -20,
                    align: "start"
                },
                legend: {
                    // to remove the label
                    display: true,
                    position: 'bottom'
                },
            },


        }
        return (
            <div>
                <Pie type="pie" data={userData} options={options} width={375} height={400}/>
            </div>
        );
    }
;

export default PieChart;
/*export default React.memo(BarChart, (prevProps, nextProps) => {
    return prevProps?.props === nextProps?.props
})*/
