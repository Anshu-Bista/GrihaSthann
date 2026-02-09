import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";
import { useApi } from "../../hooks/useAPI.js";
import "../../css/Form.css";
import { registerSchema } from "../../schema/auth.schema.js";

export default function Profile() {
  const { callApi } = useApi();
  const [profile, setProfile] = useState(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await callApi("get", "/users/profile");
        setProfile(res);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const profileImage =
    profile?.images && profile.images.length > 0
      ? `http://localhost:5000/${profile.images[0]}`
      : "/home.jpg";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      gender: profile?.gender || "",
    },
    resolver: zodResolver(registerSchema), // Add your schema if you have one
  });

  const onSubmit = async (data) => {
    try {
      const res = await callApi("put", "users/profile", { data });
      console.log("Profile updated:", res);
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6">
      {/* Left: Image + Registered Date */}
      <div className="flex flex-col items-center w-full md:w-[250px]">
        <img
          src={profileImage}
          alt="Profile"
          className="w-[200px] h-[200px] object-cover rounded-full mb-4"
        />
        <p className="text-gray-500 text-sm">
          Registered: {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Right: Form */}
      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextInput
            name="name"
            placeholder="Full Name"
            register={register}
            error={errors.name}
          />

          <TextInput
            type="email"
            name="email"
            placeholder="Email address"
            register={register}
            error={errors.email}
          />

          <TextInput
            type="tel"
            name="phone"
            placeholder="Phone number"
            register={register}
            error={errors.phone}
          />

          <TextInput
            name="address"
            placeholder="Address"
            register={register}
            error={errors.address}
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" value="male" {...register("gender")} />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="female" {...register("gender")} />
              Female
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="other" {...register("gender")} />
              Other
            </label>
          </div>
          {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

          <div className="mt-4">
            <Button type="submit" variant="secondary">
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
