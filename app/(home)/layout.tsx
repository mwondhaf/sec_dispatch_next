import React from "react";
import MainNav from "./navbar";
import { Toaster } from "@/components/ui/toaster";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <MainNav />
      <div className="p-3 text-sm md:hidden">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            Warning - This is meant to be used on bigger screens
          </AlertTitle>
          <AlertDescription>
            Please use the mobile app to access more features
          </AlertDescription>
        </Alert>
      </div>
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
