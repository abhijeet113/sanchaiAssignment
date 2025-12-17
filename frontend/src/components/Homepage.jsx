
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import React from 'react'; 

import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import Weather from "./Weather";

function Homepage() {
    const [data, setData] = useState("");
    
    const navigate = useNavigate();


    

    return (
        <div className="text-center p-4">
            <Navbar />
            <h1 className="text-4xl font-bold mb-4">Welcome to Sanchai</h1>
            <p className="text-lg mb-8">Your personal weather assistant powered by AI.</p>
            <Weather />
            
            
        </div>
    );
}

export default Homepage;