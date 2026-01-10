import StatsCard from "../../components/StatsCard.jsx";
import renter from "../../assets/renter.png"
import key from "../../assets/key.png"


import '../../css/Home.css';

export default function Home(){

    return(
        <>
            <div className="home-container">
                <div className="stats-bar">
                    <StatsCard title = "renters"
                     value ="50+"
                     icon= {renter}
                     subicon={renter}
                     subtitle="believe in our service"/>
                </div>
            </div>
        </>
    )
}