import StatsCard from "./StatsCard.jsx";

import renter from "../assets/renter.png";
import key from "../assets/key.png";
import property from "../assets/property.png";
import search from "../assets/search.png";
import location from "../assets/location.png";
import pin from "../assets/pin.png";
import visit from "../assets/visit.png";
import calender from "../assets/calender.png";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api.js";

export default function StatsSection(){
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalLocations: 0,
        totalVisits: 0,
        totalProperties: 0
    });

    useEffect(()=>{
        const getStats = async()=>{
            try{
                const data = await apiRequest("GET", "/admin/stats");
                setStats(data);
            }catch(err){
                console.error("Failed to fetch stats", err);
            }
        };
        getStats();
    },[]);

    return(
        <div className="flex justify-between gap-8 mt-10 w-full">
            <StatsCard
            title="renters"
            value={stats.totalUsers}
            icon={renter}
            subicon={key}
            subtitle="believe in our service"
            />

            <StatsCard
            title="properties"
            value={stats.totalProperties}
            icon={property}
            subicon={search}
            subtitle="and house ready for occupancy"
            />

            <StatsCard
            title="locations"
            value={stats.totalLocations}
            icon={location}
            subicon={pin}
            subtitle="covered across key cities"
            />

            <StatsCard
            title="visits"
            value={stats.totalVisits}
            icon={visit}
            subicon={calender}
            subtitle="requested by users"
            />
        </div>
    )
}