import StatsSection from "../../components/StatsSection.jsx";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto px-6">
      {/* Top Section */}
      <div class="flex flex-col md:flex-row items-center gap-6 p-6 relative">
        {/* Image Wrapper  */}
        <div class="relative w-full md:w-1/2 h-64 overflow-hidden">
          <img src="home.jpg" class="w-full h-full object-cover" />

          {/* -- Fade + Blur -- */}
          <div
            class="absolute bottom-0 left-0 w-full h-28
                        bg-gradient-to-t
                        from-[#E8F5E9]
                        to-transparent"
          ></div>
        </div>
        {/* -- Text --*/}
        <div class="md:w-1/2">
          <h2 class="text-2xl font-bold">Title</h2>
          <p class="mt-2 text-gray-600">Description</p>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection/>
    </div>
  );
}
