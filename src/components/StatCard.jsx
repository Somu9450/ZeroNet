import React from "react";
import BarChartComponent from "./BarChartComponent";

const VARIANT_STYLES = {
  red: {
    card: "bg-red-600 text-white",
    chip: "bg-red-500/40 text-white",
    iconWrap: "bg-white/20 text-white",
  },
  amber: {
    card: "bg-amber-600 text-white",
    chip: "bg-amber-500/40 text-white",
    iconWrap: "bg-white/20 text-white",
  },
  blue: {
    card: "bg-blue-600 text-white",
    chip: "bg-blue-500/40 text-white",
    iconWrap: "bg-white/20 text-white",
  },
  light: {
    card: "bg-white text-gray-800 border",
    chip: "bg-gray-100 text-gray-600",
    iconWrap: "bg-gray-100 text-gray-600",
  },
};

function StatCard({
  heading,  
  value,
  details,
  Icon,
  variant = "light",
  chart = [],
}) {
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.light;
  const showChart = Array.isArray(chart) && chart.length > 0;

  return (
    <div
      className={`rounded-xl p-4 shadow-sm flex flex-col gap-3 min-h-[126px] ${styles.card}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
            {heading}
          </p>
          <h2 className="text-4xl font-bold mt-5 leading-none">{value}</h2>
        </div>
        {Icon && (
          <div className={`p-2 rounded-md ${styles.iconWrap}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      {details && (
        <div className={`inline-flex items-center gap-2 text-xs px-2.5 py-1 mt-6 rounded-full w-fit ${styles.chip}`}>
          {details}
        </div>
      )}

      {showChart && (

        <BarChartComponent data={chart}/>
        // <div className="mt-1 flex items-end gap-1 h-5">
        //   {chart.map((point, index) => (
        //     <div
        //       key={`${heading}-${index}`}
        //       className="flex-1 rounded-sm"
        //       style={{
        //         height: `${Math.max(10, point)}%`,
        //         backgroundColor: variant === "light" ? "#4f83ff" : "rgba(255,255,255,0.6)",
        //       }}
        //     />
        //   ))}
        // </div>
      )}
    </div>
  );
}

export default StatCard;