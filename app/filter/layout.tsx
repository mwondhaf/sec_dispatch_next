import React from "react";
import MainNav from "../(home)/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <MainNav />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
