import StatsSection from "../../components/StatsSection.jsx";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto px-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 relative">
        {/* Image Wrapper  */}
        <div className="relative w-full md:w-1/2 h-64 overflow-hidden">
          <img src="/home.jpg" className="w-full h-full object-cover" />

          {/* -- Fade + Blur -- */}
          <div
            className="absolute bottom-0 left-0 w-full h-28
                        bg-gradient-to-t
                        from-[#E8F5E9]
                        to-transparent"
          ></div>
        </div>
        {/* -- Text --*/}
        <div className="md:w-1/2">
        <h2 className="text-2xl font-bold text-forest-green">
          Explore. Choose. Visit 
        </h2>
        <p className="mt-2 text-gray-600 text-soft-olive">Browse properties and request visits anytime.</p>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection/>
    </div>
  );
}
