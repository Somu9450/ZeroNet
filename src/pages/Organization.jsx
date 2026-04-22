import BroadcastSend from "../components/BroadcastSend";
import CaseAlertCard from "../components/CaseAlertCard";
import MapView from "../components/MapView";

const cases = [
  {
    sosId: "SOS-8821",
    caseName: "Multiple Vehicle Collision",
    location: "Intersection of 5th & Broadway",
    type: "Critical Medical Response",
    elapsedTime: "03:45 mins",
    description:"the patient was found unconscious on the road."
  },
  {
    sosId: "SOS-8824",
    caseName: "Unconscious Citizen",
    location: "Central Transit Terminal - Level 2",
    type: "Unknown Medical Emergency",
    elapsedTime: "01:12 mins",
  },
  {
    sosId: "SOS-8821",
    caseName: "Multiple Vehicle Collision",
    location: "Intersection of 5th & Broadway",
    type: "Critical Medical Response",
    elapsedTime: "03:45 mins",
    description:"the patient was found unconscious on the road."
  },
  {
    sosId: "SOS-8821",
    caseName: "Multiple Vehicle Collision",
    location: "Intersection of 5th & Broadway",
    type: "Critical Medical Response",
    elapsedTime: "03:45 mins",
    description:"the patient was found unconscious on the road."
  },
  {
    sosId: "SOS-8821",
    caseName: "Multiple Vehicle Collision",
    location: "Intersection of 5th & Broadway",
    type: "Critical Medical Response",
    elapsedTime: "03:45 mins",
    description:"the patient was found unconscious on the road."
  }
];

const markers = [
  { lat: 28.6200, lng: 77.2100 },
];

const Organization = () => {
  return (
    <div className="flex bg-slate-100 gap-5 ml  pl-5">
    <section>
    <div className="p-3">
        <BroadcastSend />
    </div>

    {/* MAP PLACEHOLDER */}
    <div className="mt-4 bg-white rounded-xl shadow-sm border h-[300px] flex items-center justify-center text-gray-400">
        <MapView markers={markers}/>
    </div>
</section>


{/* 🔥 SECOND SECTION (UPDATED) */}
<section className="flex flex-col bg-white shadow rounded-xl p-4 w-[380px]">

    {/* Header */}
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
            Active Venue Alerts
        </h2>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
            {cases.length} LIVE
        </span>
    </div>

    {/* Cards */}
    <div className="flex flex-col gap-4">
        {cases.map((item, index) => (
            <div
                key={index}
                className="bg-gray-50 rounded-xl p-4  flex flex-col gap-3"
            >

                {/* Top Row */}
                <div className="flex justify-between items-center gap-0.5">
                    <span className="text-[12px] minw-[19px] font-bold bg-blue-100 rounded-2xl p-1 text-red-600 uppercase">
                        {item.sosId}
                    </span>

                    <span className="text-xs font-semibold text-red-600 uppercase">
                        {item.type}
                    </span>

                    <span className="text-xs text-gray-400">
                        {item.elapsedTime} ago
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-900">
                    {item.caseName}
                </h3>

                {/* Description (dummy for now) */}
                <p className="text-xs text-gray-500">
                    Patient reported collapsed in seating area. Bystander CPR initiated.
                </p>

                {/* Action Row */}
                <div className="flex items-center justify-between mt-2">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center cursor-pointer hover:bg-blue-200 gap-2">
                        👤 Assign Staff
                    </button>

                    <button className="ml-2 text-gray-400 text-xl">
                        ⋮
                    </button>
                </div>

            </div>
        ))}
    </div>

</section>
    </div>
  );
};

export default Organization;
