import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

const labels = ['Scores'];

const ChartComponent = ({sujet, gram, arg, arg2, plan2, ex2}) => {
  const data = {
    labels: 'Score 1',
    datasets: [
      {
        label: 'Sujet',
        data: [sujet] ,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Plan',
        data: [plan2] ,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Argumentation',
        data: [arg] ,
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
      },
      {
        label: 'Arguments',
        data: [arg2] ,
        borderColor: 'red',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Exemples',
        data: [ex2] ,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Grammaire',
        data: [gram] ,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive:true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: window.innerWidth < 768 ? 8 : 12, // Adapte la taille de la légende
              },
              boxWidth: window.innerWidth < 768 ? 8 : 40, // Taille des rectangles
                // boxHeight: window.innerWidth < 768 ? 10 : 20, // Hauteur des rectangles (optionnelle)
              },
            },
        },
        scales: {
          x: {
            type: 'category',
            labels: labels,
            position: 'bottom',
          },
          y: {
            min: 0,
            max: 100,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);
  
  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
