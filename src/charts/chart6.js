import { complex, evaluate, pi, tan } from "mathjs";
import Chart from "chart.js/auto";
import { Z_V, DEFAULT_FREQUENCY as F } from "../config";

const ACTIVE = [];
const REACTIVE = [];

F.forEach(f => {
    const tan_phi = tan(evaluate(`${pi}/2 * ${f}`));
    const z_v = evaluate(`(${complex(1, Z_V * tan_phi)}) / (${complex(1, Z_V ** (-1) * tan_phi)})`);
    ACTIVE.push({y: z_v.re, x: f});
    REACTIVE.push({y: z_v.im || 0, x: f});
});

export default () => {
    new Chart(
        document.getElementById('chart6'),
        {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Активна складова',
                        data: ACTIVE,
                        showLine: true,
                        borderColor: 'rgb(0 91 187)',
                        backgroundColor: 'rgb(0 91 187)',
                    },
                    {
                        label: 'Реактивна складова',
                        data: REACTIVE,
                        showLine: true,
                        borderColor: 'rgb(255 213 0)',
                        backgroundColor: 'rgb(255 213 0)',
                    },
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'F',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'z_v',
                        },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Побудована залежність для неоднорідності типа “бар’єр”'
                    }
                }
            }
        }
    );
}
