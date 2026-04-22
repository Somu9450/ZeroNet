import React from "react";
import MapView from "../components/MapView";

const IncidentDetails = () => {
  // 🔥 Dummy Data (later backend se replace karna)
  const incident = {
    title: "Structure Fire: 4th Ave Commercial Complex",
    description:
      "Reporting rapid smoke emission from the northeast corner. Structural integrity compromised.",
    location: "Sector B-4, Lucknow",
    time: "10:42 AM",
    coords: {
      lat: 26.8467,
      lng: 80.9462,
    },
    responders: [
      { name: "Engine 42", status: "Active Suppression" },
      { name: "Ambulance R7", status: "Medical Standby" },
      { name: "Patrol 201", status: "Traffic Control" },
    ],
    timeline: [
      "Initial Alert Broadcasted",
      "Fire Engine Arrived",
      "Perimeter Established",
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* 🔥 HEADER */}
      <div className="mb-6">
        <p className="text-xs text-red-500 font-semibold">CRITICAL INCIDENT</p>
        <h1 className="text-2xl font-bold text-gray-900">
          {incident.title}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {incident.description}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {incident.location} • {incident.time}
        </p>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">

          {/* 🔹 MAP */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm font-semibold mb-3">Live Location</p>

            <div className="h-64 rounded overflow-hidden">
              <MapView center={incident.coords} radius={100} />
            </div>
          </div>

          {/* 🔹 TIMELINE */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm font-semibold mb-3">Timeline of Events</p>

            <div className="space-y-3">
              {incident.timeline.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-100 rounded text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* 🔹 RESPONDERS */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm font-semibold mb-3">
              Official Responders
            </p>

            <div className="space-y-3">
              {incident.responders.map((res, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded"
                >
                  <span className="text-sm font-medium">{res.name}</span>
                  <span className="text-xs text-gray-500">
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 ACTION BUTTONS */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Update Status
            </button>

            <button className="w-full bg-red-500 text-white py-2 rounded">
              Escalate Severity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;