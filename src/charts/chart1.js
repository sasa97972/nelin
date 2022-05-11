import {abs, complex, evaluate, pi, tan} from 'mathjs';
import Chart from 'chart.js/auto';
import {Z_N, Z_V, DEFAULT_FREQUENCY as F} from '../config';

const RN_DATA = F.map(f => {
    const tan_phi = tan(evaluate(`${pi}/2 * ${f}`));
    const z_n_i = evaluate(`(${complex(1, Z_N * tan_phi)}) / (${complex(1, Z_N ** (-1) * tan_phi)})`);
    const R_N = evaluate(`(1 - ${z_n_i}) / (1 + ${z_n_i})`);
    return {y: abs(R_N), x: f};
});

const RV_DATA = F.map(f => {
    const tan_phi = tan(evaluate(`${pi}/2 * ${f}`));
    const z_v_i = evaluate(`(${complex(1, Z_V * tan_phi)}) / (${complex(1, Z_V ** (-1) * tan_phi)})`);
    const R_V = evaluate(`(1 - ${z_v_i}) / (1 + ${z_v_i})`);
    return {y: abs(R_V), x: f};
});

export default () => {
    new Chart(
        document.getElementById('chart1'),
        {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Яма',
                        data: RN_DATA,
                        showLine: true,
                        borderColor: 'rgb(0 91 187)',
                        backgroundColor: 'rgb(0 91 187)',
                    },
                    {
                        label: 'Бар\'єр',
                        data: RV_DATA,
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
                            text: 'R',
                        },
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Залежність коефіцієнта проходження від частоти'
                    }
                }
            }
        }
    );
}
