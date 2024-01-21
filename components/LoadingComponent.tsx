import React from "react";
import { LoaderIcon } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center align-middle">
      <LoaderIcon className="animate-spin" />
    </div>
  );
};

export default LoadingComponent;
