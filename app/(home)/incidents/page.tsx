import React from "react";
import incidentSVg from "@/public/assets/images/incidentHome.svg";
import Image from "next/image";

const IncidentsHome = () => {
  return (
    <div className="container flex w-full items-center justify-center p-12">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="">
          <Image src={incidentSVg} alt="email sent" width={200} height={200} />
        </div>

        <div className="space-y-4 text-center">
          <h3 className="text-4xl font-bold">Occurrences</h3>
          <p className="text-sm text-gray-400">
            Click on an occurrence on the left pane to view more details
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncidentsHome;
