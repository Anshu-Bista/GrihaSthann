import { useEffect, useState } from "react";
import axios from 'axios';

import PropertyCard from "../../components/PropertyCard";

export default function Browse(){
    const [items, setItems]=useState([]);
    //FETCH items 
    useEffect(()=>{
        axios.get("http://localhost:5000/api/properties")
        .then(res=>{
            setItems(res.data.data);
        })
        .catch(err=>{
            console.error("Failed to fetch properties")
        });
    },[]);

    return(
        <div className="flex flex-col">
            {items.length > 0 
                ? items.map((item)=>(
                    <PropertyCard
                    key={item.propertyId}
                    item ={item}
                    />
                ))
            :<p className="bg-dark-grey">No properties available</p>
            }
        </div>
    )
}