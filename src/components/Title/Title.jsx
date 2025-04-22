import React from "react";

const Title = ({ texto, className }) => {
  return <h1 className={className || ""}>{texto}</h1>;
};

export default Title;
