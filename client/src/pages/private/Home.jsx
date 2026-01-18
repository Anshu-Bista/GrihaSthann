import StatsCard from "../../components/StatsCard.jsx";
import renter from "../../assets/renter.png"
import key from "../../assets/key.png"
import property from "../../assets/property.png"
import search from "../../assets/search.png"
import location from "../../assets/location.png"
import pin from "../../assets/pin.png"
import visit from "../../assets/visit.png"
import calender from "../../assets/calender.png"


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

                    <StatsCard title = "properties"
                     value ="30+"
                     icon= {property}
                     subicon={search}
                     subtitle="and house ready for occupancy"/>

                    <StatsCard title = "locations"
                     value ="5+"
                     icon= {location}
                     subicon={pin}
                     subtitle="covered across key cities"/>

                    <StatsCard title = "visit"
                     value ="100+"
                     icon= {visit}
                     subicon={calender}
                     subtitle="requested by users"/>
                </div>
            </div>
        </>
    )
}