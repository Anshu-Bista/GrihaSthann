import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";
import { useApi } from "../../hooks/useAPI.js";
import { profileSchema } from "../../schema/profile.schema.js";
import { apiRequest } from "../../utils/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Profile() {
  const { callApi } = useApi();
  const { logout } = useAuth();
  
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  // ✅ Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await callApi("get", "/users/profile");

        setProfile(res);

        // 🔥 Important: reset form with fetched data
        reset({
          name: res.name || "",
          email: res.email || "",
          phone: res.phone || "",
          address: res.address || "",
          gender: res.gender || "",
        });
      } catch (err) {
        toast.error("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  // ✅ Update Profile
  const onSubmit = async (data) => {
    try {
      setUpdating(true);
  
      // send the form values directly
      await apiRequest("patch", "/users/profile", {
        data, 
      });
  
      toast.success("Profile updated successfully 🎉");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  //  Log Out
  const handleLogout = () => {
    logout();              // clear context + storage
    navigate("/login");    // redirect
  };
  
  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  const profileImage =
    profile?.images?.length > 0
      ? `http://localhost:5000/${profile.images[0]}`
      : "/home.jpg";

  return (
    <div className="p-6 max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6 mt-8">
      
      {/* Left Side */}
      <div className="flex flex-col items-center w-full md:w-[500px]">
        <img
          src={profileImage}
          alt="Profile"
          className="w-[350px] h-[350px] object-cover rounded-full mb-4"
        />

        <p className="text-gray-500 text-sm">
          Registered:{" "}
          {new Date(profile.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-4">
            <Button onClick={handleLogout}
              variant="primary">
                 Log Out
            </Button>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          <TextInput
            name="name"
            placeholder="Enter your name"
            register={register}
            error={errors.name}
          />

          <TextInput
            type="email"
            name="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
          />

          <TextInput
            type="tel"
            name="phone"
            placeholder="Enter your phone"
            register={register}
            error={errors.phone}
          />

          <TextInput
            name="address"
            placeholder="Enter your address"
            register={register}
            error={errors.address}
          />

          {/* Gender */}
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
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}

          <div className="mt-4">
            <Button
              type="submit"
              variant="secondary"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
