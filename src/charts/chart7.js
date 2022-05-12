import { complex, evaluate, pi, tan } from "mathjs";
import Chart from "chart.js/auto";
import { Z_V } from "../config";
import { createFrequencyArray } from "../functions";

const F = createFrequencyArray(0, 1.5, 0.01);

const REACTIVE_DATA = [];
const L_F_DATA = [];

F.forEach(f => {
    const tan_phi = tan(evaluate(`${pi}/2 * ${f}`));
    const z_v = evaluate(`(${complex(1, Z_V * tan_phi)}) / (${complex(1, Z_V**(-1) * tan_phi)})`);
    REACTIVE_DATA.push({ y: z_v.im || 0, x: f });

    const L = evaluate(`${pi} * ${f} * ${Z_V} / 2`);
    L_F_DATA.push({ y: L, x: f })
});

export default () => {
    new Chart(
        document.getElementById('chart7'),
        {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Зосереджена індуктивність',
                        data: L_F_DATA,
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
                        text: 'Порівняння частотної залежності реактивної складової ями та зосередженої індуктивності'
                    }
                }
            }
        }
    );
}
