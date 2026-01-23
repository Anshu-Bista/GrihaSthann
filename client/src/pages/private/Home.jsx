import StatsCard from "../../components/StatsCard.jsx";

import renter from "../../assets/renter.png";
import key from "../../assets/key.png";
import property from "../../assets/property.png";
import search from "../../assets/search.png";
import location from "../../assets/location.png";
import pin from "../../assets/pin.png";
import visit from "../../assets/visit.png";
import calender from "../../assets/calender.png";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto px-6">

      {/* Top Section */}
        <div class="flex flex-col md:flex-row items-center gap-6 p-6 relative">
            {/* Image Wrapper  */}
            <div class="relative w-full md:w-1/2 h-64 overflow-hidden">
                <img
                    src="home.jpg"
                    class="w-full h-full object-cover"
                />

                {/* -- Fade + Blur -- */}
                <div
                    class="absolute bottom-0 left-0 w-full h-28
                        bg-gradient-to-t
                        from-[#E8F5E9]
                        to-transparent">
                </div>
            </div>
            {/* -- Text --*/}
            <div class="md:w-1/2">
            <h2 class="text-2xl font-bold">Title</h2>
            <p class="mt-2 text-gray-600">Description</p>
            </div>
        </div>

      {/* Stats Section */}
      <div className="flex justify-between gap-8 mt-10 w-full">

        <StatsCard
          title="renters"
          value="50+"
          icon={renter}
          subicon={key}
          subtitle="believe in our service"
        />

        <StatsCard
          title="properties"
          value="30+"
          icon={property}
          subicon={search}
          subtitle="and house ready for occupancy"
        />

        <StatsCard
          title="locations"
          value="5+"
          icon={location}
          subicon={pin}
          subtitle="covered across key cities"
        />

        <StatsCard
          title="visits"
          value="100+"
          icon={visit}
          subicon={calender}
          subtitle="requested by users"
        />

      </div>
    </div>
  );
}
