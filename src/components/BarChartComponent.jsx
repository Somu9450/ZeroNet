import { BarChart, Bar, ResponsiveContainer } from "recharts";

function BarChartComponent({ data, color = "#3b82f6" }) {
  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={data}>
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;