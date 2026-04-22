import React, { useEffect, useState } from "react";
import LocationAutocomplete from "../../components/LocationAutocomplete";
import { useNavigate } from "react-router-dom";
import MapView from "../../components/MapView";

function Register() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  // 🔹 FORM DATA
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "Mall",
    registrationId: "", // Mandatory
    email: "",
    phone: "",
    address: "",
    license: "",
    contactPerson: "",
    emergencyContact: "",
    website: "",
    // New Fields
    startTime: "09:00",
    endTime: "21:00",
    is24Hours: false,
    totalFloors: "1",
    securityStaffCount: "",
  });

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // 🔹 COORDS
  const [coords, setCoords] = useState({
    lat: "",
    lng: "",
  });

  const [radius, setRadius] = useState(50);

  // 🔹 OTP & CONSENT
  const [agreed, setAgreed] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [otpVerified, setOtpVerified] = useState(false);

  // 🔹 FEATURES
  const [features, setFeatures] = useState({
    cctv: false,
    fireSafety: false,
    medicalSupport: false,
    securityStaff: false,
    evacuationPlan: false,
  });

  const handleLocationSelect = (data) => {
    setCity(data.city || "");
    setState(data.state || "");
    if (data.lat && data.lng) {
      setCoords({ lat: data.lat, lng: data.lng });
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => alert("Location access denied"),
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    let interval;
    if (showOTP && timer > 0) {
      interval = setInterval(() => setTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  const handleContinue = () => {
    if (agreed) {
      setShowOTP(true);
      setTimer(30);
    }
  };

  const handleVerifyOTP = () => {
    if (otp === "123456") setOtpVerified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) return;

    const payload = {
      ...formData,
      city,
      state,
      coords,
      features,
      radius,
    };

    console.log("FINAL DATA:", payload);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* LEFT PANEL */}
      <div className="fixed h-screen w-1/3 left-0 top-0 bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-10 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">ZeroNet</h1>
          <p className="text-xl font-light">The Crisis Coordination Bridge</p>
          <div className="h-1 w-12 bg-blue-400 my-6"></div>
          <p className="text-sm opacity-80 leading-relaxed">
            Onboard your venue to the ZeroNet mesh network. Enable localized emergency broadcasts and instant responder dispatching.
          </p>
        </div>
        <div className="space-y-3 text-sm font-medium opacity-70">
          <p>✔ Verified Organization Node</p>
          <p>✔ Real-time Geofence Alerts</p>
          <p>✔ ML-Powered Incident Analysis</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="ml-[33.333333%] w-[66.666667%] h-screen p-12 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Organization Setup</h2>
        <p className="text-gray-500 mb-8">Please provide your official venue details to join the network.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 🔹 SECTION 1: IDENTITY */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Organization Name *</label>
                <input
                  required
                  placeholder="e.g. Grand Plaza Mall"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Venue Type *</label>
                <select
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                >
                  <option value="Mall">Shopping Mall</option>
                  <option value="Hotel">Hotel / Resort</option>
                  <option value="Hospital">Hospital / Medical Center</option>
                  <option value="Restaurant">Restaurant / Bar</option>
                  <option value="Office">Corporate Office</option>
                  <option value="Stadium">Stadium / Arena</option>
                  <option value="Educational">School / University</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Registration ID / GSTIN *</label>
                <input
                  required
                  placeholder="Official ID Number"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-blue-100 bg-blue-50/30"
                  onChange={(e) => setFormData({ ...formData, registrationId: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Official Website</label>
                <input
                  placeholder="https://"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 🔹 SECTION 2: OPERATIONAL HOURS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 border-b pb-2">Operational Timing</h3>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600"
                  checked={formData.is24Hours}
                  onChange={(e) => setFormData({ ...formData, is24Hours: e.target.checked })}
                />
                <span className="font-medium text-gray-700">Open 24/7</span>
              </label>

              {!formData.is24Hours && (
                <div className="flex items-center gap-3 animate-fadeIn">
                  <input
                    type="time"
                    className="p-2 border rounded-md"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="time"
                    className="p-2 border rounded-md"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 🔹 SECTION 3: CONTACTS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-2 gap-4">
             <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Admin Email *</label>
                <input type="email" required placeholder="admin@org.com" className="p-3 border rounded-lg" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
             </div>
             <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Primary Phone *</label>
                <input required placeholder="Phone number" className="p-3 border rounded-lg" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
             </div>
             <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Emergency Contact (24/7) *</label>
                <input required placeholder="Security Room Number" className="p-3 border rounded-lg border-red-100" onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })} />
             </div>
             <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Security Staff Count</label>
                <input type="number" placeholder="Total guards" className="p-3 border rounded-lg" onChange={(e) => setFormData({ ...formData, securityStaffCount: e.target.value })} />
             </div>
          </div>

          {/* 🔹 SECTION 4: LOCATION & GEOFENCE */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 border-b pb-2">Venue Geofencing</h3>
            <div className="grid grid-cols-3 gap-4">
              <LocationAutocomplete placeholder="Search Venue Location" onSelect={handleLocationSelect} className="p-3 border rounded-lg col-span-2" />
              <button type="button" onClick={handleGetLocation} className="bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-100 hover:bg-indigo-100 transition">
                Pin Current Location
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 italic text-xs text-gray-500">
              <p>Lat: {coords.lat || "N/A"}</p>
              <p>Lng: {coords.lng || "N/A"}</p>
              <p>State: {state || "N/A"}</p>
            </div>

            <div className="h-72 rounded-xl overflow-hidden border">
              <MapView center={coords} radius={radius} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Geofence Radius (Bridge Range)</label>
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">{radius} meters</span>
              </div>
              <input type="range" min="10" max="150" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>
          </div>

          {/* 🔹 SUBMIT SECTION */}
          <div className="bg-gray-100 p-6 rounded-xl flex flex-col items-center space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-5 h-5" />
              <span className="text-gray-700 font-medium text-sm">I verify that this organization is authorized to use ZeroNet.</span>
            </label>

            {!showOTP ? (
              <button
                type="button"
                disabled={!agreed || !formData.registrationId}
                onClick={handleContinue}
                className={`w-full py-4 rounded-xl font-bold text-lg transition ${agreed && formData.registrationId ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Verify & Continue
              </button>
            ) : (
              <div className="w-full space-y-4 animate-slideUp">
                <div className="flex gap-2">
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="flex-1 p-3 border rounded-lg text-center tracking-widest font-mono text-xl"
                  />
                  <button type="button" onClick={handleVerifyOTP} className="bg-green-600 text-white px-6 rounded-lg font-bold">Verify</button>
                </div>
                <p className="text-center text-sm text-gray-500">
                  {timer > 0 ? `Resend available in ${timer}s` : <span className="text-blue-600 cursor-pointer font-bold">Resend OTP Now</span>}
                </p>
              </div>
            )}

            {otpVerified && (
              <button type="submit" className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:opacity-90 transition">
                Finalize Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;