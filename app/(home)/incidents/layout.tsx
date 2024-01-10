"use client";
import IncidentsLeftSideBar from "@/components/incidents/left-side-bar";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Plus } from "lucide-react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <ResizablePanelGroup direction="horizontal" className="max-w-full">
        <ResizablePanel defaultSize={40} minSize={35}>
          <div className="h-screen overflow-y-scroll border-l">
            <IncidentsLeftSideBar />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={35}>
          <div className="h-screen overflow-y-scroll border-r">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Layout;
