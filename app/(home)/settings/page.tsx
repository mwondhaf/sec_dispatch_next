import React from "react";
import incidentSVg from "@/public/assets/images/settingsSvg.svg";
import Image from "next/image";

const SettingsPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Image src={incidentSVg} alt="email sent" width={400} height={400} />
    </div>
  );
};

export default SettingsPage;
