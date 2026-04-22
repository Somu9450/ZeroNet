import React from "react";
import { Mic, Send } from "lucide-react";

function BroadcastSend() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      
      {/* LEFT CARD - Emergency Trigger */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex max-w-2xs flex-col justify-between">
        
        <div>
          <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">
            Critical Action
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-2">
            Trigger Venue Emergency
          </h2>

          <p className="text-sm text-gray-600 font-semibold mt-2">
            Instantly notify all users and responders within the geofenced zone
            of a high-priority threat.
          </p>
        </div>

        <button className="mt-6 bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
          <span className="text-lg">⬤</span>
          TRIGGER EMERGENCY
        </button>
      </div>

      {/* RIGHT CARD - Broadcast System */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between">
        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Broadcast System
          </h2>

          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        </div>

        {/* Text Area */}
        <div className="relative mt-4">
          <textarea
            placeholder="Enter broadcast message to all venue users..."
            className="w-full h-28 resize-none rounded-lg border bg-gray-100 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Mic Icon */}
          <div className="absolute bottom-3 right-3 bg-white shadow rounded-md p-2 cursor-pointer">
            <Mic size={16} className="text-gray-500" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
            <Send size={16} />
            SEND TEXT
          </button>

          <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
            <Mic size={16} />
            LIVE VOICE
          </button>
        </div>
      </div>

    </div>  
  );
}

export default BroadcastSend;