import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import {
  Plus,
  Minus,
  Layers,
  Bell,
} from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 28.6139,
  lng: 77.2090,
};

// 🔥 Dummy data (later WebSocket se aayega)
const incidents = [
  {
    id: 1,
    title: "Medical Emergency: Cardiac Arrest",
    time: "14:02:11",
    color: "red",
  },
  {
    id: 2,
    title: "Traffic Collision (No Injuries)",
    time: "13:58:45",
    color: "yellow",
  },
  {
    id: 3,
    title: "Public Gathering Notification",
    time: "13:45:00",
    color: "blue",
  },
];

const markers = [
  { lat: 37.7749, lng: -122.4194 },
  { lat: 37.78, lng: -122.41 },
];

function LiveMap() {
  return (
    <div className="h-screen flex bg-gray-50">

      {/* 🔹 LEFT SIDEBAR SPACE (already exists in layout) */}
      <div className="flex-1 relative">

        {/* 🔥 MAP */}
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {markers.map((m, i) => (
              <Marker key={i} position={m} />
            ))}
          </GoogleMap>
        </LoadScript>

        {/* 🔥 MAP CONTROLS */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          <button className="bg-white p-2 rounded shadow">
            <Plus size={18} />
          </button>
          <button className="bg-white p-2 rounded shadow">
            <Minus size={18} />
          </button>
          <button className="bg-white p-2 rounded shadow">
            <Layers size={18} />
          </button>
        </div>

        {/* 🔥 INCIDENT POPUP CARD */}
        <div className="absolute top-1/3 left-1/3 bg-white rounded-xl shadow-lg w-80 z-10 border">

          <div className="bg-red-600 text-white text-xs px-3 py-2 rounded-t-xl font-semibold flex justify-between">
            HIGH PRIORITY
            <span className="cursor-pointer">⋮</span>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-gray-800">
              Structural Fire - Zone B4
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              432 Market St, San Francisco
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
              <span>⏱ 12m</span>
              <span>🚑 4 Units</span>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm">
                DISPATCH
              </button>
              <button className="flex-1 bg-gray-100 py-2 rounded text-sm">
                DETAILS
              </button>
            </div>
          </div>
        </div>

        {/* 🔥 BOTTOM BROADCAST BAR */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl flex items-center gap-4 px-4 py-3 z-10">

          <div className="flex items-center gap-2 text-sm">
            <div className="bg-red-600 text-white p-2 rounded">
              <Bell size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-500">
                Global Broadcast Active
              </p>
              <p className="text-sm font-medium">
                Notifying incident data to all units in Sector 4
              </p>
            </div>
          </div>

          <button className="bg-gray-200 px-3 py-1 text-xs rounded">
            STOP
          </button>
          <button className="bg-red-600 text-white px-3 py-1 text-xs rounded">
            MANAGE
          </button>
          <button className="bg-gray-100 px-3 py-1 text-xs rounded">
            IN RESPONSE 08
          </button>
        </div>

      </div>

      {/* 🔥 RIGHT PANEL (ACTIVE STREAM) */}
      <div className="w-80 bg-white border-l p-4 flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800">
            Active Stream
          </h2>
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
            LIVE
          </span>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3 overflow-y-auto">

          {incidents.map((item) => (
            <div
              key={item.id}
              className="border-l-4 bg-gray-50 p-3 rounded-lg flex flex-col gap-1"
              style={{
                borderColor:
                  item.color === "red"
                    ? "#ef4444"
                    : item.color === "yellow"
                    ? "#f59e0b"
                    : "#3b82f6",
              }}
            >
              <p className="text-xs text-gray-400">
                {item.time}
              </p>
              <p className="text-sm font-medium text-gray-800">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default LiveMap;