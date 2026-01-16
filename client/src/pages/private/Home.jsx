import StatsCard from "../../components/StatsCard.jsx";
import renter from "../../assets/renter.png"
import key from "../../assets/key.png"
import property from "../../assets/property.png"
import pin from "../../assets/pin.png"
import time from "../../assets/time.png"
import visit from "../../assets/visit.png"


import '../../css/Home.css';

export default function Home(){
console.log("home")
    return(
        <>
            <div className="home-container">
                <div className="stats-bar">
                    <StatsCard title = "renters"
                     value ="50+"
                     icon= {renter}
                     subicon={key}
                     subtitle="believe in our service"/>

                    <StatsCard title = "renters"
                     value ="50+"
                     icon= {renter}
                     subicon={key}
                     subtitle="believe in our service"/>

                    <StatsCard title = "renters"
                     value ="50+"
                     icon= {renter}
                     subicon={key}
                     subtitle="believe in our service"/>

                    <StatsCard title = "renters"
                     value ="50+"
                     icon= {renter}
                     subicon={key}
                     subtitle="believe in our service"/>
                </div>
            </div>
        </>
    )
}