import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const OccurrenceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pr-5">
      <div className="grid grid-cols-4 gap-5">
        <div className="min-h-[80vh] space-y-5 border-r px-2 py-5">
          <Link href="/settings/incident-types" className="">
            <div className="flex items-center justify-between py-5">
              <div className="text-sm text-gray-500">Incident Types</div>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </div>
          </Link>
          <Link href="/settings/incident-categories" className="">
            <div className="flex items-center justify-between py-5">
              <div className="text-sm text-gray-500">Incident Categories</div>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </div>
          </Link>
          <Link href="/settings/reporter-departments" className="">
            <div className="flex items-center justify-between py-5">
              <div className="text-sm text-gray-500">Reporter Departments</div>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </div>
          </Link>
        </div>
        <div className="col-span-3 p-5">{children}</div>
      </div>
    </div>
  );
};

export default OccurrenceLayout;
