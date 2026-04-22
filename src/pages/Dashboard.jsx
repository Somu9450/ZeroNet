import React from "react";
import StatCard from "../components/StatCard";
import { Bell, Flame, Users, Clock, Filter } from "lucide-react";
import LiveClock from "../components/LiveClock";
import CaseAlertCard from "../components/CaseAlertCard";
import MapView from "../components/MapView";

const chartData = [
  { name: "1", value: 28 },
  { name: "2", value: 34 },
  { name: "3", value: 56 },
  { name: "4", value: 28 },
  { name: "5", value: 25 },
  { name: "6", value: 78 },
  { name: "7", value: 12 },
];

const cases = [
  {
    sosId: "SOS-8821",
    caseName: "Multiple Vehicle Collision",
    location: "Intersection of 5th & Broadway",
    type: "Critical Medical Response",
    elapsedTime: "03:45 mins",
  },
  {
    sosId: "SOS-8824",
    caseName: "Unconscious Citizen",
    location: "Central Transit Terminal - Level 2",
    type: "Unknown Medical Emergency",
    elapsedTime: "01:12 mins",
  },
];

const stats = [
    {
      heading: "Active SOS Alerts",
      value: "04",
      details: "24% from last hour",
      Icon: Bell,
      variant: "red",
    },
    {
      heading: "High Priority Incidents",
      value: "12",
      details: "Requiring immediate action",
      Icon: Flame,
      variant: "amber",
    },
    {
      heading: "Responders in Field",
      value: "87",
      details: "92% connection rate",
      Icon: Users,
      variant: "blue",
    },
    {
      heading: "Today's Resolved",
      value: "142",
      Icon: Clock,
      variant: "light",
      chart: chartData,
    },
  ];

  // 🔥 Filter Config (NO HARDCODE UI)
  const filters = [
    {
      label: "Status",
      icon: Flame,
      options: [
        "All Alerts",
        "Reported",
        "Accepted",
        "In Progress",
        "Resolved",
      ],
    },
    {
      label: "Type",
      icon: Users,
      options: [
        "Emergency",
        "Fire",
        "Accident",
        "Medical",
        "Flood",
        "Stampede",
      ],
    },
    {
      label: "Time",
      icon: Clock,
      options: [
        "Last 1 Hour",
        "Last 4 Hours",
        "Last 8 Hours",
        "Last 12 Hours",
        "Last 24 Hours",
        "Last 3 Days",
        "Last 1 Week",
        "Past 1 Month",
        "Past 3 Months",
        "Past 6 Months",
        "Past 12 Months",
      ],
    },
  ];

  const markers = [
  { lat: 28.6200, lng: 77.2100 },
];

function Dashboard() {
  

  return (
    <div className="flex flex-col">
      
      {/* 🔹 Top Section */}
      <section>
        <div className="px-4 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Organization Overview
              </h1>
              <p className="text-sm text-gray-500">
                Real-time emergency monitoring and responder coordination for the Metro District.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600 w-fit">
              <Clock className="h-5 w-5 text-blue-600" />
              <LiveClock />
            </div>

          </div>

          {/* Cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.heading}
                heading={stat.heading}
                value={stat.value}
                details={stat.details}
                Icon={stat.Icon}
                variant={stat.variant}
                chart={stat.chart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 Filter Section */}
      <section>
        <div className="px-4 bg-slate-100 rounded-xl p-4 mt-6 flex flex-wrap items-center gap-10">

          {/* Label */}
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <Filter size={18} />
            <span>Filters:</span>
          </div>

          {/* Dynamic Filters */}
          {filters.map((filter, index) => {
            const Icon = filter.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm"
              >
                <Icon size={16} className="text-gray-400" />

                <select className="outline-none text-sm bg-transparent">
                  {filter.options.map((option, i) => (
                    <option key={i}>{option}</option>
                  ))}
                </select>
              </div>
            );
          })}

        </div>
      </section>

      {/* 🔹 Future Sections */}
      <section className="px-4 mt-6 flex gap-4">

  <div className="flex flex-col">
    {cases.map((item, index) => (
    <CaseAlertCard
      key={index}
      {...item}
      onLocate={() => console.log("Locate", item.sosId)}
      onAssign={() => console.log("Assign", item.sosId)}
      onResolve={() => console.log("Resolve", item.sosId)}
    />
  ))}</div>
  <div className=" bg-white rounded-xl shadow-sm border h-[400px] w-[350px] flex items-center justify-center text-gray-400">
    <MapView markers={markers}/>
  </div>
</section>
      <section></section>

    </div>
  );
}

export default Dashboard;