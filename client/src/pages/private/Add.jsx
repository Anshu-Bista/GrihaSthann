import { useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput.jsx";
import { Button } from "../../components/Button.jsx";
import { SelectInput } from "../../components/SelectInput.jsx";

export default function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col p-4 space-y-6">
        {/* Basic Details */}
        <section className="p-4 border rounded-lg">
          <h3 className="font-bold mb-4">Basic Property Details</h3>

          <TextInput
            name="title"
            label="Property Title"
            register={register}
            error={errors.title}
            required="Title is required"
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
            label="Description"
            register={register}
            error={errors.description}
          />
        </section>

        {/* Amenities */}
        <section className="p-4 border rounded-lg">
          <h3 className="font-bold mb-2">Amenities Section</h3>
        </section>

        {/* Location */}
        <section className="p-4 border rounded-lg">
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
              { value: "bhaktapur", label: "Bhaktapur" }
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

        {/* Lease */}
        <section className="p-4 border rounded-lg">
          <h3 className="font-bold mb-2">Lease and  Furnishing Details</h3>
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
        <section className="p-4 border rounded-lg">
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
        <div className="button-wrapper">
          <Button type="submit" variant="secondary">
            Register
          </Button>
        </div>
      </div>
    </form>
  );
}
