import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
  <div className="flex">
    <Sidebar />

    <div className="flex flex-col flex-1">
        <Navbar />
        <div>
            <Outlet />
        </div>

    </div>

  </div>
  )
};

export default MainLayout;
