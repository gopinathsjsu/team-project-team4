import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const TheatreLocations = () => {
    return (
        <div className="theatre-locations">
            <Header />
            <h1>Here are our theatres.</h1>
        </div>
    );
};

export default TheatreLocations;