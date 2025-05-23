import React from "react";

interface PartTitleProps {
  title: string;
}

const PartTitle: React.FC<PartTitleProps> = ({ title }) => {
  return <h2 className="text-2xl font-semibold text-center text-orange-400 mb-4">{title}</h2>;
};

export default PartTitle;
