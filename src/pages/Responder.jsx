import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { Bell } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

// 🔥 Incident Data (with coordinates added)
const incidents = [
  {
    id: 1,
    title: "Medical Emergency: Cardiac Arrest",
    time: "14:02:11",
    color: "red",
    coords: { lat: 28.6139, lng: 77.3910 },
  },
  {
    id: 2,
    title: "Traffic Collision (No Injuries)",
    time: "13:58:45",
    color: "yellow",
    coords: { lat: 28.646, lng: 77.37 },
  },
  {
    id: 3,
    title: "Public Gathering Notification",
    time: "13:45:00",
    color: "blue",
    coords: { lat: 28.67, lng: 77.45 },
  },
];

const Responder = () => {
  const mapRef = useRef(null);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // 🔥 Map Load
  const onLoad = (map) => {
    mapRef.current = map;
  };

  // 🔥 Zoom to Incident
  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);

    if (mapRef.current) {
      mapRef.current.panTo(incident.coords);
      mapRef.current.setZoom(20); // zoom in 🔥
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 🔥 MAP SECTION */}
      <div className="flex-1 relative">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={11}
            onLoad={onLoad}
          >
            {/* 🔴 All Markers */}
            {incidents.map((incident) => (
              <Marker
                key={incident.id}
                position={incident.coords}
              />
            ))}
          </GoogleMap>
        </LoadScript>

        {/* 🔥 Broadcast Bar */}
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
                Notifying incident data to all units
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 RIGHT PANEL (INCIDENT LIST) */}
      <div className="w-80 bg-white border-l p-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800">
            Active Incidents
          </h2>
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
            LIVE
          </span>
        </div>

        {/* Incident List */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {incidents.map((item) => (
            <div
              key={item.id}
              onClick={() => handleIncidentClick(item)}
              className="cursor-pointer border-l-4 bg-gray-50 p-3 rounded-lg flex flex-col gap-1 hover:bg-gray-100 transition"
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

              <div className="flex p-2 justify-between">
                <button className=" text-sm text-white font-bold  px-3 py-1 rounded-[2px] bg-[#3b82f6]">
                   Accept
                </button>
                <button className=" text-sm  font-bold  px-3 py-0.5 rounded-[2px] bg-slate-300">
                   Navigate
                </button>
                <button className=" text-sm  font-bold  px-3 py-0.5 rounded-[2px] bg-slate-300">
                   Resolved
                </button>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Responder;