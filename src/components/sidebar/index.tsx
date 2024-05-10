"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SidebarComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const router = useRouter();

  useEffect(() => {
    dropdown();
  }, []);

  const dropdown = () => {
    const submenu = document.getElementById("submenu");
    const arrow = document.getElementById("arrow");
    if (submenu && arrow) {
      submenu.classList.toggle("hidden");
      arrow.classList.toggle("rotate-0");
    }
  };

  const openSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("hidden");
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const navigate = (route: any) => {
    router.push(route);
  };

  const allRoutes: any[] = [
    {
      title: "Dashboard",
      route: "/dashboard",
    },
    {
      title: "Live Feed",
      route: "/live-feed",
    },
  ];

  return (
    <div className={`bg-blue-600`}>
      <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              Road Surveillance App
            </h1>
            <i
              className="bi bi-x cursor-pointer ml-28 lg:hidden"
              onClick={openSidebar}
            ></i>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>

        {allRoutes.map((r, i) => (
          <div
            key={i}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => navigate(r.route)}
          >
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              {r.title}
            </span>
          </div>
        ))}
        <div className="my-4 bg-gray-600 h-[1px]"></div>

        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <i className="bi bi-box-arrow-in-right"></i>
          <span
            className="text-[15px] ml-4 text-gray-200 font-bold"
            onClick={() => signOut()}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
