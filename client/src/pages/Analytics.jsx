import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "New", value: 5 },
  { name: "In Progress", value: 8 },
  { name: "Completed", value: 12 },
];

const revenueData = [
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 25000 },
  { month: "Apr", revenue: 40000 },
];

const COLORS = ["#3B82F6", "#FACC15", "#22C55E"];
export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10">
        Analytics Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PIE CHART */}
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-5">
            Lead Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-5">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#3B82F6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}