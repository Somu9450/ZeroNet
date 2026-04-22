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
    orgType: "Hospital",
    email: "",
    phone: "",
    address: "",
    license: "",
    contactPerson: "",
    emergencyContact: "",
    website: "",
  });

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // 🔹 COORDS
  const [coords, setCoords] = useState({
    lat: "",
    lng: "",
  });

  const [radius, setRadius] = useState(50);

  // 🔹 OTP
  const [agreed, setAgreed] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [otpVerified, setOtpVerified] = useState(false);

  // 🔹 FEATURES (checkboxes)
  const [features, setFeatures] = useState({
    cctv: false,
    fireSafety: false,
    medicalSupport: false,
    securityStaff: false,
    evacuationPlan: false,
  });

  // 🔹 LOCATION SELECT
  const handleLocationSelect = (data) => {
    setCity(data.city || "");
    setState(data.state || "");

    if (data.lat && data.lng) {
      setCoords({ lat: data.lat, lng: data.lng });
    }
  };

  // 🔥 GET DEVICE LOCATION
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setCoords({ lat, lng });
      },
      (err) => {
        console.log(err);
        alert("Location access denied");
      },
      { enableHighAccuracy: true }
    );
  };

  // 🔹 OTP TIMER
  useEffect(() => {
    let interval;
    if (showOTP && timer > 0) {
      interval = setInterval(() => setTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  // 🔹 HANDLERS
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
    <div className="min-h-screen flex bg-gray-50">

      {/* 🔥 LEFT PANEL REDESIGN */}
      <div className="w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">ZeroNet</h1>
          <p className="text-lg font-medium">Emergency Response Network</p>
          <p className="text-sm mt-4 opacity-80">
            Register your organization to enable smart alerts, geofencing,
            and rapid response coordination.
          </p>
        </div>

        <div className="text-xs opacity-70">
          📍 Live Tracking <br />
          🚨 Instant Alerts <br />
          🛡️ Secure Network
        </div>
      </div>

      {/* 🔹 RIGHT PANEL */}
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-4">Organization Setup</h1>

        <form onSubmit={handleSubmit}>

          {/* 🔹 BASIC */}
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Organization Name"
              className="p-3 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, orgName: e.target.value })
              }
            />

            <select
              className="p-3 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, orgType: e.target.value })
              }
            >
              <option>Hospital</option>
              <option>Mall</option>
              <option>Hotel</option>
              <option>Restaurant</option>
              <option>Office</option>
            </select>

            <input
              type="email"
              placeholder="Email"
              className="p-3 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="p-3 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          {/* 🔹 EXTRA */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              placeholder="Full Address"
              className="p-3 border rounded col-span-2"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            <input
              placeholder="License ID"
              className="p-3 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, license: e.target.value })
              }
            />

            <input
              placeholder="Contact Person"
              className="p-3 border rounded"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactPerson: e.target.value,
                })
              }
            />

            <input
              placeholder="Emergency Contact"
              className="p-3 border rounded"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyContact: e.target.value,
                })
              }
            />

            <input
              placeholder="Website"
              className="p-3 border rounded col-span-2"
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
            />
          </div>

          {/* 🔹 LOCATION */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <LocationAutocomplete
              placeholder="City"
              onSelect={handleLocationSelect}
              className="p-3 border rounded"
            />

            <input
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-3 border rounded"
            />

            <input placeholder="PIN" className="p-3 border rounded" />

            {/* 🔥 LAT LNG BACK */}
            <input
              placeholder="Latitude"
              value={coords.lat}
              readOnly
              className="p-3 border rounded"
            />

            <input
              placeholder="Longitude"
              value={coords.lng}
              readOnly
              className="p-3 border rounded"
            />

            <button
              type="button"
              onClick={handleGetLocation}
              className="bg-blue-600 text-white rounded"
            >
              Get Location
            </button>
          </div>

          {/* MAP */}
          <div className="h-64 mt-4">
            <MapView center={coords} radius={radius} />
          </div>

          {/* RADIUS */}
          <input
            type="range"
            min="10"
            max="150"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full mt-4"
          />
          <p>{radius} metres</p>

          {/* 🔹 FEATURES */}
          <div className="mt-6">
            <p className="font-medium mb-2">Available Facilities</p>

            {Object.keys(features).map((key) => (
              <label key={key} className="block text-sm">
                <input
                  type="checkbox"
                  checked={features[key]}
                  onChange={() =>
                    setFeatures({
                      ...features,
                      [key]: !features[key],
                    })
                  }
                />{" "}
                {key}
              </label>
            ))}
          </div>

          {/* CONSENT */}
          <div className="mt-6">
            <label>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              I confirm all details are correct.
            </label>

            <button
              type="button"
              disabled={!agreed}
              onClick={handleContinue}
              className="block mt-2 bg-blue-600 text-white px-4 py-2"
            >
              Continue
            </button>
          </div>

          {/* OTP */}
          {showOTP && (
            <div className="mt-6">
              <p>OTP sent to {formData.email}</p>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />

              <button type="button" onClick={handleVerifyOTP}>
                Verify OTP
              </button>

              <p>
                {timer > 0
                  ? `Resend in ${timer}s`
                  : "Resend OTP"}
              </p>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={goBack}>
              Back
            </button>

            <button type="submit" disabled={!otpVerified}>
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;