import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Chart = ({ data }) => {
  // Transform dashboard statistics into chart data
  const chartData = data ? [
    {
      name: "To Do",
      total: data.tasks?.todo || 0,
    },
    {
      name: "In Progress", 
      total: data.tasks?.["in progress"] || 0,
    },
    {
      name: "Completed",
      total: data.tasks?.completed || 0,
    },
  ] : [];

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={chartData}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
};
