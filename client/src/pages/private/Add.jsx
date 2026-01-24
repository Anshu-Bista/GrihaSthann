import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../../components/TextInput.jsx";
import { Button } from "../../components/Button.jsx";
import { SelectInput } from "../../components/SelectInput.jsx";
import { ImageInput } from "../../components/ImageInput.jsx";
import { AmenityChips } from "../../components/AmenityChips.jsx";
import { propertySchema } from "../../schema/property.schema.js";

export default function Add() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues:{
        amenities:[]
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.propertyImage[0]);
    console.log(data.amenities);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto p-6">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col space-y-6">
          {/* Basic */}
          <section className=" p-5 rounded-xl shadow-sm border border-sand-beige
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg hover:border-forest-green/50">
                    
            <h3 className="font-bold mb-4">Basic Property Details</h3>
            <TextInput
              name="title"
              label="Property Title"
              register={register}
              error={errors.title}
            />

            <SelectInput
              name="propertyType"
              label="Property Type"
              register={register}
              error={errors.propertyType}
              options={[
                { value: "room", label: "Room" },
                { value: "apartment", label: "Apartment" },
                { value: "house", label: "House" },
                { value: "commercial", label: "Commercial" },
                { value: "villa", label: "Villa" },
                { value: "office", label: "Office" },
                { value: "warehouse", label: "Warehouse" },
              ]}
            />

            <div className="flex flex-row gap-4">
              <TextInput
                name="price"
                type="number"
                label="Price per Month"
                register={register}
                error={errors.price}
              />

              <TextInput
                name="area"
                type="number"
                label="Total Area"
                register={register}
                error={errors.area}
              />
            </div>

            <TextInput
                name="description"
                label="Property Description"
                placeholder="Write details about the property..."
                register={register}
                error={errors.description}
                multiline
                rows={5}
            />

          </section>

          {/* Location */}
          <section className=" p-5 rounded-xl shadow-sm border border-sand-beige
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg hover:border-forest-green/50">

            <h3 className="font-bold mb-4">Location Details</h3>

            <TextInput
              name="locationArea"
              label="Area"
              register={register}
              error={errors.locationArea}
            />

            <SelectInput
              name="city"
              label="City"
              register={register}
              error={errors.city}
              options={[
                { value: "lalitpur", label: "Lalitpur" },
                { value: "kathmandu", label: "Kathmandu" },
                { value: "bhaktapur", label: "Bhaktapur" },
              ]}
            />

            <TextInput
              name="street"
              label="Street Address"
              register={register}
              error={errors.street}
            />

            <TextInput
              name="zip"
              label="ZIP Code"
              register={register}
              error={errors.zip}
            />
          </section>

          {/* Images */}
          <section className=" p-5 rounded-xl shadow-sm border border-sand-beige
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg hover:border-forest-green/50">

            <h3 className="font-bold mb-2">Image Section</h3>
            <ImageInput
              name="propertyImage"
              register={register}
              error={errors.propertyImage}
              multiple
            />
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col space-y-6">
          {/* Amenities */}
          <section className=" p-5 rounded-xl shadow-sm border border-sand-beige
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg hover:border-forest-green/50">

            <h3 className="font-bold mb-2">Amenities Section</h3>
            <AmenityChips
                name="amenities"
                register={register}
                setValue={setValue}
                error={errors.amenities}
                options={[
                { value: "wifi", label: "WiFi" },
                { value: "parking", label: "Parking" },
                { value: "ac", label: "AC" },
                { value: "lift", label: "Lift" },
                { value: "gym", label: "Gym" },
                { value: "water", label: "24/7 Water" },
                { value: "security", label: "Security" },
                { value: "cctv", label: "CCTV" },
                { value: "balcony", label: "Balcony" },
                { value: "furnished", label: "Furnished" },
                ]}
            />
          </section>

          {/* Lease */}
          <section className=" p-5 rounded-xl shadow-sm border border-sand-beige
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg hover:border-forest-green/50">

            <h3 className="font-bold mb-2">Lease & Furnishing</h3>
            <SelectInput
              name="leaseType"
              label="Lease Type"
              register={register}
              error={errors.leaseType}
              options={[
                { value: "short", label: "Short-term" },
                { value: "long", label: "Long-term" },
              ]}
            />

            <SelectInput
              name="tenantType"
              label="Tenant Type"
              register={register}
              error={errors.tenantType}
              options={[
                { value: "family", label: "Family" },
                { value: "solo", label: "Solo" },
              ]}
            />

            <SelectInput
              name="furnishingStatus"
              label="Furnishing Status"
              register={register}
              error={errors.furnishingStatus}
              options={[
                { value: "yes", label: "Furnished" },
                { value: "no", label: "Unfurnished" },
              ]}
            />
          </section>

          {/* Property Info */}
          <section className=" p-5 rounded-xl shadow-sm border border-sand-beige
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg hover:border-forest-green/50">

            <h3 className="font-bold mb-4">Property Information</h3>
            <TextInput
              name="year"
              label="Year Built"
              register={register}
              error={errors.year}
            />

            <TextInput
              name="level"
              label="Number of Levels"
              register={register}
              error={errors.level}
            />

            <div className="flex flex-row gap-4">
              <TextInput
                name="bed"
                label="Bedroom"
                register={register}
                error={errors.bed}
              />

              <TextInput
                name="bath"
                label="Bathroom"
                register={register}
                error={errors.bath}
              />

              <TextInput
                name="kitchen"
                label="Kitchen"
                register={register}
                error={errors.kitchen}
              />
            </div>
          </section>

          {/* Submit */}
          <div className="sticky bottom-4 self-end bg-mint-green p-3 rounded-xl">
            <Button type="submit" variant="secondary">
              Register
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
