import { Button } from "../../components/Button.jsx";
import StatsSection from "../../components/StatsSection.jsx";

export default function Admin(){
    return(
        <div className="p-6 max-w-[1200px] mx-auto px-6">
            <div className="flex flex-row gap-16">
                <div className="mt-16 w-[300px]">
                    <Button> Users </Button>
                    <Button className="mt-1"> Reports </Button>
                </div>
                
                {/* Stats Section */}
                <StatsSection/>
            </div>
        </div>
    )
}