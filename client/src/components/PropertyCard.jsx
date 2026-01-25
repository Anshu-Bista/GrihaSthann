import favourite from "../assets/favourite.png";
import bed from "../assets/bed.png";
import bath from "../assets/shower.png";
import area from "../assets/area.png";

export default function PropertyCard({item}){
    
    //DETERMINE image  to display
    const propertyImage = item.images && item.images.length > 0 ?
        `http:localhost:5000${item.images[0]}`:
        "/home.jpg";

    return(
        <div className="flex flex-col bg-soft-purple">
            <img src={propertyImage} alt=""/>
            <div className="flex flex-row">
                <p className="bg-old">{item.price || "Unknown Price"}/month</p>
                <div className="w-full h-full rounded-full bg-off-white flex items-center justify-center">
                    <img src={favourite} alt="" className="max-w-[55%] max-h-[55%] object-contain" />
                </div>
            </div>
            <h3 className="bg-forest green">item.title</h3>
            <p className="bg-dark-grey">{item.locationArea},{item.city}</p>
            <div className="flex flex-row">
                <img src={bed} alt="" className="max-w-[55%] max-h-[55%]"/>{item.bed}
                <img src={bath} alt="" className="max-w-[55%] max-h-[55%]"/>{item.bath}
                <img src={area} alt="" className="max-w-[55%] max-h-[55%]"/>{item.area}
            </div>
        </div>
    )
}