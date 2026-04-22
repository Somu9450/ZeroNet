import React from "react";
import { MapPin, Stethoscope, Clock, Map, UserPlus, Check } from "lucide-react";

function CaseAlertCard({
  sosId,
  caseName,
  location,
  type,
  elapsedTime,
  onLocate,
  onAssign,
  onResolve,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between mb-3">

      {/* LEFT SECTION */}
      <div className="flex items-start gap-4">

        {/* Red SOS Badge */}
        <div className="bg-red-800 text-white text-xs font-bold px-3 py-2 rounded-md">
          {sosId}
        </div>

        {/* Case Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {caseName}
          </h2>

          {/* Time */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span className="w-2 h-2 bg-red-800 rounded-full"></span>
            {elapsedTime} elapsed
          </div>

          {/* Details Row */}
          <div className="flex gap-8 mt-3">

            {/* Location */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase">Location</p>
                <p className="text-sm font-medium text-gray-800">
                  {location}
                </p>
              </div>
            </div>

            {/* Type */}
            <div className="flex items-start gap-2">
              <Stethoscope className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500 uppercase">Type</p>
                <p className="text-sm font-medium text-gray-800">
                  {type}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SECTION (Buttons) */}
      <div className="flex flex-col gap-2 w-[160px]">

        <button
          onClick={onLocate}
          className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-sm py-2 rounded-md"
        >
          <Map size={16} />
          Locate
        </button>

        <button
          onClick={onAssign}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md"
        >
          <UserPlus size={16} />
          Assign
        </button>

        <button
          onClick={onResolve}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-green-600 text-md py-2 rounded-md"
        >
          <Check size={16} />
          Resolve
        </button>

      </div>
    </div>
  );
}

export default CaseAlertCard;