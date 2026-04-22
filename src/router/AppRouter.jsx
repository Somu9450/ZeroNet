import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Heatmap from "../pages/Heatmap";
import IncidentDetails from "../pages/IncidentDetails";
import LiveMap from "../pages/LiveMap";
import Organization from "../pages/Organization";
import Responder from "../pages/Responder";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/incidentDetails" element={<IncidentDetails />} />
          <Route path="/livemap" element={<LiveMap />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/responder" element={<Responder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
