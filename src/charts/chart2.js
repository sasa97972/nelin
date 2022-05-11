import { abs, complex, evaluate, pi, tan, sqrt } from 'mathjs';
import Chart from 'chart.js/auto';
import { Z_N, Z_V, DEFAULT_FREQUENCY as F } from '../config';

const TN_DATA = F.map(f => {
    const tan_phi = tan(evaluate(`${pi}/2 * ${f}`));
    const z_n_i = evaluate(`(${complex(1, Z_N * tan_phi)}) / (${complex(1, Z_N ** (-1) * tan_phi)})`);
    const R_N = evaluate(`(1 - ${z_n_i}) / (1 + ${z_n_i})`);
    const T_N = sqrt(evaluate(`1 - ${abs(R_N)}^2`));
    return {y: T_N, x: f};
});

const TV_DATA = F.map(f => {
    const tan_phi = tan(evaluate(`${pi}/2 * ${f}`));
    const z_v_i = evaluate(`(${complex(1, Z_V * tan_phi)}) / (${complex(1, Z_V ** (-1) * tan_phi)})`);
    const R_V = evaluate(`(1 - ${z_v_i}) / (1 + ${z_v_i})`);
    const T_V = sqrt(evaluate(`1 - ${abs(R_V)}^2`));
    return {y: T_V, x: f};
});

export default () => {
    new Chart(
        document.getElementById('chart2'),
        {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Яма',
                        data: TN_DATA,
                        showLine: true,
                        borderColor: 'rgb(0 91 187)',
                        backgroundColor: 'rgb(0 91 187)',
                    },
                    {
                        label: 'Бар\'єр',
                        data: TV_DATA,
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
                            text: 'T',
                        },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Залежність коефіцієнта відбиття від частоти'
                    }
                }
            }
        }
    );
}
