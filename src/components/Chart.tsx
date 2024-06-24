import { useEffect, useState } from "react";
import { getMonthlyRevenue } from "../services/getMonthlyRevue";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface MonthlyRevenueData {
  GEL: number;
  USD: number;
  EURO: number;
}

const ChartData = () => {
  const [monthlyRevenue, setMonthlyRevenue] =
    useState<MonthlyRevenueData | null>(null);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await getMonthlyRevenue();
        setMonthlyRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  if (!monthlyRevenue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-20 2xl:grid-cols-3 2xl:gap-6 mt-20 mb-20 justify-items-center">
      <div className="max-h-[400px] w-[400px]">
        <h3 className="text-xl font-bold text-center mb-4">
          თვიური შემოსავალი (ლარი)
        </h3>
        <Bar
          data={{
            labels: ["ლარი"],
            datasets: [
              {
                label: "თვიური შემოსავალი (ლარი)",
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
                hoverBorderColor: "rgba(54, 162, 235, 1)",
                data: [monthlyRevenue.GEL || 0],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return value.toLocaleString("en-US", {
                      style: "currency",
                      currency: "GEL",
                    });
                  },
                },
              },
            },
          }}
        />
      </div>

      <div className="max-h-[400px] w-[400px]">
        <h3 className="text-xl font-bold text-center mb-4">
          თვიური შემოსავალი (დოლარი)
        </h3>
        <Bar
          data={{
            labels: ["დოლარი"],
            datasets: [
              {
                label: "თვიური შემოსავალი (დოლარი)",
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
                hoverBorderColor: "rgba(255, 99, 132, 1)",
                data: [monthlyRevenue.USD || 0],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return value.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    });
                  },
                },
              },
            },
          }}
        />
      </div>

      <div className="max-h-[400px] w-[400px]">
        <h3 className="text-xl font-bold text-center mb-4">
          თვიური შემოსავალი (ევრო)
        </h3>
        <Bar
          data={{
            labels: ["ევრო"],
            datasets: [
              {
                label: "თვიური შემოსავალი (ევრო)",
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
                hoverBorderColor: "rgba(75, 192, 192, 1)",
                data: [monthlyRevenue.EURO || 0],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return value.toLocaleString("en-US", {
                      style: "currency",
                      currency: "EUR",
                    });
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartData;
