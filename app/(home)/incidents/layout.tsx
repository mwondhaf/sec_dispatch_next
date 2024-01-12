"use client";
import IncidentsLeftSideBar from "@/components/incidents/left-side-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="md:container">
      <div className="hidden md:flex">
        <ResizablePanelGroup direction="horizontal" className="max-w-full">
          <ResizablePanel defaultSize={40} minSize={35}>
            <div className="h-screen overflow-y-scroll border-l">
              <IncidentsLeftSideBar />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} minSize={35}>
            <div className="h-screen overflow-y-scroll border-r">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="max-w-full">
        <div className="md:hidden">
          <div className="h-screen overflow-y-scroll border-b">
            <IncidentsLeftSideBar />
          </div>
          <div className="hidden h-screen overflow-y-scroll border-b md:flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
