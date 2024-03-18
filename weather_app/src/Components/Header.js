import PropTypes from "prop-types";
import React from "react";
import "./Header.css";
/*
export default function Header(){
    return (
        <>
            <h1>Ignore this page</h1>
        </>
    )
}
*/
export const Header = ({ property1, className }) => {
    return (
      <div className={`header ${property1} ${className}`}>
        {property1 === "RUNNER-ICON" && (
          <div className="overlap-group">
            <img className="RUNNER" alt="Runner" src="../Image/RUNNER.png" />
            <div className="ellipse" />
          </div>
        )}
  
        {["dropdown-menu", "search-1"].includes(property1) && (
          <img
            className="search"
            alt="Search"
            src={property1 === "dropdown-menu" ? "../Image/dropdown-menu.png" : "../Image/search.png"}
          />
        )}
      </div>
    );
};
  
Header.propTypes = {
    property1: PropTypes.oneOf(["RUNNER-ICON", "search-1", "dropdown-menu"]),
};