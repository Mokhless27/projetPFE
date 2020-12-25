import React from "react";
import CardProductt from "./cardProductt";

const CardsProductts = () => {
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="row">
        <div className="col-md-4">
          <CardProductt />
        </div>
        <div className="col-md-4">
          <CardProductt />
        </div>
        <div className="col-md-4">
          <CardProductt />
        </div>
        <div className="col-md-4">
          <CardProductt />
        </div>
      </div>
    </div>
  );
};

export default CardsProductts;
