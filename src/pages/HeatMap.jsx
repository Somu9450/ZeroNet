import React, { useState, useMemo, } from "react";
import {
  GoogleMap,
  LoadScript,
  HeatmapLayer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 28.6139,
  lng: 77.2090,
};

const libraries = ["visualization"];

// 🔥 Dummy data (later backend)
const allData = [
  { lat: 19.0760, lng: 72.8777, type: "critical", time: "today" },   // Mumbai
  { lat: 13.0827, lng: 80.2707, type: "moderate", time: "week" },    // Chennai
  { lat: 22.5726, lng: 88.3639, type: "low", time: "month" },       // Kolkata
  { lat: 28.7041, lng: 77.1025, type: "critical", time: "today" },   // Delhi
  { lat: 12.9716, lng: 77.5946, type: "moderate", time: "today" },   // Bengaluru
  { lat: 17.3850, lng: 78.4867, type: "critical", time: "week" },    // Hyderabad
  { lat: 23.0225, lng: 72.5714, type: "low", time: "month" },       // Ahmedabad
  { lat: 26.8467, lng: 80.9462, type: "moderate", time: "today" },   // Lucknow
  { lat: 15.2993, lng: 74.1240, type: "critical", time: "today" },   // Goa
  { lat: 34.0837, lng: 74.7973, type: "low", time: "week" },        // Srinagar
  { lat: 26.1445, lng: 91.7362, type: "moderate", time: "month" },   // Guwahati
  { lat: 21.1458, lng: 79.0882, type: "critical", time: "today" },   // Nagpur
  { lat: 11.0168, lng: 76.9558, type: "low", time: "today" },        // Coimbatore
  { lat: 24.5854, lng: 73.7125, type: "moderate", time: "week" },    // Udaipur
  { lat: 20.2961, lng: 85.8245, type: "critical", time: "month" },   // Bhubaneswar
  { lat: 30.7333, lng: 76.7794, type: "low", time: "today" },        // Chandigarh
  { lat: 26.9124, lng: 75.7873, type: "moderate", time: "week" },    // Jaipur
  { lat: 8.5241, lng: 76.9366, type: "critical", time: "today" },    // Thiruvananthapuram
  { lat: 23.2599, lng: 77.4126, type: "low", time: "month" },       // Bhopal
  { lat: 25.5941, lng: 85.1376, type: "moderate", time: "today" },   // Patna
  { lat: 18.5204, lng: 73.8567, type: "critical", time: "week" },    // Pune
  { lat: 21.1702, lng: 72.8311, type: "low", time: "month" },       // Surat
  { lat: 10.8505, lng: 76.2711, type: "moderate", time: "today" },   // Kerala Region
  { lat: 27.1767, lng: 78.0081, type: "critical", time: "today" },   // Agra
  { lat: 32.7266, lng: 74.8570, type: "low", time: "week" },        // Jammu
  { lat: 23.8315, lng: 91.2868, type: "moderate", time: "month" },   // Agartala
  { lat: 15.8497, lng: 74.4977, type: "critical", time: "today" },   // Belgaum
  { lat: 25.3176, lng: 82.9739, type: "low", time: "today" },        // Varanasi
  { lat: 22.3072, lng: 73.1812, type: "moderate", time: "week" },    // Vadodara
  { lat: 9.9312, lng: 76.2673, type: "critical", time: "month" }     // Kochi
];

function HeatMap() {
  const [time, setTime] = useState("today");
  const [type, setType] = useState("all");
  
  // 🔥 Filter Logic
  const filteredData = useMemo(() => {
    return allData.filter(
      (item) =>
        (type === "all" || item.type === type) &&
        (time === "all" || item.time === time)
    );
  }, [time, type]);

  // 🔥 Convert to LatLng
  const heatmapData = useMemo(() => {
    if (!window.google) return [];
    return filteredData.map(
      (item) => new window.google.maps.LatLng(item.lat, item.lng)
    );
  }, [filteredData]);

  return (
    <div className="h-screen w-full bg-gray-50 p-4">

      {/* MAP CONTAINER */}
      <div className="relative h-[85vh] rounded-xl overflow-hidden">

        {/* MAP */}
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
          >
            {heatmapData.length > 0 && (
              <HeatmapLayer
                data={heatmapData}
                options={{
                  radius:25,
                  opacity: 0.6,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>

        {/* 🔥 FILTER PANEL */}
        <div className="absolute top-15 left-3 bg-white p-5 rounded-xl shadow w-[22 %] z-10">

          <h3 className="font-bold text-gray-800 mb-4">
            MAP FILTERS
          </h3>

          {/* TIME FILTER */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">TIME RANGE</p>
            <div className="flex gap-2">
              {["today", "week", "month"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`px-2 cursor-pointer py-1 rounded text-xs ${
                    time === t
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* TYPE FILTER */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">
              EMERGENCY TYPE
            </p>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="all">All Incidents</option>
              <option value="critical">Critical</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* REGION */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">REGION FOCUS</p>
            <select className="w-full p-2 border rounded text-sm">
              <option>Metropolitan Area</option>
              <option>District</option>
            </select>
          </div>
        </div>


        {/* 🔥 STATS */}
        <div className="absolute bottom-6 left-6 bg-white shadow rounded-xl p-4 z-10">
          <p className="text-xs text-gray-500">LIVE DENSITY STATS</p>
          <div className="flex gap-6 mt-2">
            <div>
              <p className="text-xs text-gray-400">TOTAL HOTSPOTS</p>
              <h2 className="text-lg font-bold">allData.length</h2>
            </div>
            <div>
              <p className="text-xs text-gray-400">AVG RESPONSE</p>
              <h2 className="text-lg font-bold">4.2m</h2>
            </div>
          </div>
        </div>

        {/* 🔥 LEGEND */}
        <div className="absolute bottom-6 right-6 bg-white shadow rounded-xl p-4 w-64 z-10">
          <p className="text-xs font-semibold mb-2">
            INTENSITY LEGEND
          </p>
          <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded mb-3" />

          <div className="text-xs space-y-1">
            <p>🟢 Stable Monitoring</p>
            <p>🟡 Elevated Risk Zone</p>
            <p>🔴 Immediate Action Required</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeatMap;