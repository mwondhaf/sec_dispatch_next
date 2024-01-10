import LeftSideBar from "@/components/settings/left-side-bar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container flex h-[90vh] justify-between overflow-y-scroll">
      <div className="border-r">
        <LeftSideBar />
      </div>
      <div className="w-3/4 p-4">{children}</div>
    </div>
  );
};

export default Layout;
