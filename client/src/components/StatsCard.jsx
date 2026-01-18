export default function StatsCard({ title, value, icon, subicon, subtitle }) {
    return (
      <div className="flex flex-col items-center p-4">
        
        <div className="relative w-[90px] h-[90px] mb-1.5">
          
          <div className="w-full h-full rounded-full bg-soft-purple border-4 border-off-white flex items-center justify-center">
            <img src={icon} alt="" className="max-w-[55%] max-h-[55%] object-contain" />
          </div>
  
          <div className="absolute -bottom-1 -right-1 w-[34px] h-[34px] rounded-full bg-gold border-2 border-off-white flex items-center justify-center">
            <img src={subicon} alt="" className="w-[55%] h-[55%]" />
          </div>
  
        </div>
  
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-[26px] font-bold text-gold leading-none">
              {value}
            </span>
            <span className="text-[18px] font-semibold text-gold leading-none">
              {title}
            </span>
          </div>
  
          <span className="block mt-0.5 text-[13px] text-dark-grey">
            {subtitle}
          </span>
        </div>
      </div>
    );
  }
  