/**
 * Created by Олександр on 26.01.2017.
 */
'use strict';
import Chart from 'chart.js'
import $ from 'jquery';

let createChartDiv = () => {
    $('#bodyDiv').append('<canvas id="scoresChart" width="200" height="100"></canvas>');
};

let createScoreStatsChart = (datesAndScoreArray) => {
    createChartDiv();
    new Chart($('#scoresChart'), {
        type: 'line',
        data: {
            labels: datesAndScoreArray[0],
            datasets: [{
                label: '% of correct answers',
                data: datesAndScoreArray[1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};

export {
    createScoreStatsChart
};
