import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const TrendChart = ({ trendData }) => {
  const data = {
    labels: trendData.map(item => item.date),
    datasets: [
      {
        label: "Stress Level",
        data: trendData.map(item => item.stress),
        borderColor: "#ffffff",
        backgroundColor: "rgba(255,255,255,0.3)",
        tension: 0.4
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.2)" }
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.2)" }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default TrendChart;
