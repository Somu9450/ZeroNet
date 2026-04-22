import React from 'react'
// import logo from '../assets/zeronet.png'
import {
    LayoutDashboard,
    Map,
    Layers2,
    ShieldAlert,  
    Users,
    Building2,
    Hotel
} from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom';

function Sidebar() {

  const navigate = useNavigate();

    const menu = [
            {name:"Dashboard", icon:LayoutDashboard, link:"/", active:true},
            {name:"Live Map", icon:Map, link:"/livemap", active:true},
            {name:"Heatmaps", icon:Layers2, link:"/heatmap", active:true},
            {name:"Incidents", icon:ShieldAlert, link:"/incidentDetails", active:true},
            {name:"Responders", icon:Users, link:"/responder", active:true},
            {name:"Organizations", icon:Building2, link:"", active:true},
            {name:"My Organization", icon:Hotel, link:"/organization", active:true},
        ]

  return (
    <div className="w-72 h-screen bg-gray-100 p-6 flex flex-col sticky">

      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {/* <img src={logo}/> */}
          F
        </div>
        <div>
          <h1 className="text-lg font-bold text-blue-600">ZeroNet</h1>
          <p className="text-xs text-gray-400 tracking-widest">
            Forget Emergency
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-3">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              onClick={() =>{navigate(item.link)}}
              className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition
              ${
                item.active
                  ? "bg-white text-blue-600 shadow-sm border-r-4 border-blue-600"
                  : "text-gray-500 hover:bg-white"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}

export default Sidebar