import React from "react";
import MainNav from "./navbar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <MainNav />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
