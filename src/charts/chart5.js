import { complex, evaluate, pi, tan } from "mathjs";
import Chart from "chart.js/auto";
import { Z_N } from "../config";
import { createFrequencyArray } from "../functions";

const F = createFrequencyArray(0, 8, 0.01);

const ACTIVE = [];
const REACTIVE = [];

F.forEach(f => {
    const tan_phi = tan(evaluate(`${pi}/2 * ${f}`));
    const z_n_i = evaluate(`(${complex(1, Z_N * tan_phi)}) / (${complex(1, Z_N ** (-1) * tan_phi)})`);
    ACTIVE.push({y: z_n_i.re, x: f});
    REACTIVE.push({y: z_n_i.im || 0, x: f});
});

console.log(REACTIVE);

export default () => {
    new Chart(
        document.getElementById('chart5'),
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
                            text: 'z_n',
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