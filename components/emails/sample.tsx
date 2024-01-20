import React from "react";

interface SampleEmailProps {
  name: string;
}

const SampleEmail: React.FC<SampleEmailProps> = ({ name }) => {
  return (
    <div>
      <h2 className="">Hello{name}</h2>
    </div>
  );
};

export default SampleEmail;
