import { complex, evaluate, pi, tan, sqrt } from "mathjs";
import Chart from "chart.js/auto";
import { Z_N } from "../config";
import { createFrequencyArray } from "../functions";

const F = createFrequencyArray(0, 0.5, 0.01);

const REACTIVE_DATA = [];
const C_F_DATA = [];

F.forEach(f => {
    const tan_phi = tan(evaluate(`${pi}/2 * ${f}`));
    const z_n = evaluate(`(${complex(1, Z_N * tan_phi)}) / (${complex(1, Z_N**(-1) * tan_phi)})`);
    REACTIVE_DATA.push({ y: z_n.im || 0, x: f });

    const C = evaluate(`-(${pi} * ${f}) / (2 * ${Z_N} * ${sqrt(evaluate(`1 + (${pi} * ${f}) / (2 * ${Z_N})`))})`);
    C_F_DATA.push({ y: C, x: f })
});

export default () => {
    new Chart(
        document.getElementById('chart8'),
        {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Зосереджена ємність',
                        data: C_F_DATA,
                        showLine: true,
                        borderColor: 'rgb(0 91 187)',
                        backgroundColor: 'rgb(0 91 187)',
                    },
                    {
                        label: 'Реактивна складова',
                        data: REACTIVE_DATA,
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
                            text: 'Z',
                        },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Порівняння частотної залежності реактивної складової ями та зосередженої ємності'
                    }
                }
            }
        }
    );
}
