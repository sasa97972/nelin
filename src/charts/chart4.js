import {abs, complex, evaluate, pi, sqrt, tan} from 'mathjs';
import Chart from 'chart.js/auto';
import { DEFAULT_FREQUENCY as F } from '../config';
import { getRandomColor } from '../helpers';

const Z = [2, 3, 4, 5];
const Z_COLORS = [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()]
const lRatios = [0.2, 1.0, 1.5, 2.0];

const CHARTS = [];

for (const lRatio of lRatios) {
    const Z_DATA = [];

    for (const z of Z) {
        Z_DATA.push(
            F.map(f => {
                const tan_phi = tan(evaluate(`${pi}/2 * ${f} * ${lRatio}`));
                const z_i = evaluate(`(${complex(1, z * tan_phi)}) / (${complex(1, z ** (-1) * tan_phi)})`);
                const R = evaluate(`(1 - ${z_i}) / (1 + ${z_i})`);
                const T = sqrt(evaluate(`1 - ${abs(R)}^2`));
                return {y: abs(T), x: f};
            })
        );
    }

    CHARTS.push(Z_DATA);
}

export default () => {
    CHARTS.forEach((chartData, index) => {
        new Chart(
            document.getElementById(`chart4-${index + 1}`),
            {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: 'z = 2',
                            data: chartData[0],
                            showLine: true,
                            borderColor: `#${Z_COLORS[0]}`,
                            backgroundColor: `#${Z_COLORS[0]}`,
                        },
                        {
                            label: 'z = 3',
                            data: chartData[1],
                            showLine: true,
                            borderColor: `#${Z_COLORS[1]}`,
                            backgroundColor: `#${Z_COLORS[1]}`,
                        },
                        {
                            label: 'z = 4',
                            data: chartData[2],
                            showLine: true,
                            borderColor: `#${Z_COLORS[2]}`,
                            backgroundColor: `#${Z_COLORS[2]}`,
                        },
                        {
                            label: 'z = 5',
                            data: chartData[2],
                            showLine: true,
                            borderColor: `#${Z_COLORS[3]}`,
                            backgroundColor: `#${Z_COLORS[3]}`,
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
                                text: 'T',
                            },
                        },
                    },
                    elements: {
                        point: {
                            radius: 1,
                            hoverRadius: 2,
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: `Коефіцієнт проходження, l/l0=${lRatios[index]}`
                        }
                    }
                }
            }
        );
    })
}
