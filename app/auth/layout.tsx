import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen max-w-[1440px] mx-auto">
      <div className="grid md:grid-cols-2">
        <div className="hidden p-16 md:flex justify-center items-end bg-gradient-to-r from-cyan-500 to-blue-500">
          <h1 className="text-6xl font-bold text-zinc-100">
            Welcome to Dispatch Report
          </h1>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
