import React from "react";

const page = ({ params }) => {
  console.log(params);
  return <div>{params._id}</div>;
};

export default page;

