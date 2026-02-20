import { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";
import { useApi } from "../../hooks/useAPI.js";
import { profileSchema } from "../../schema/profile.schema.js";
import { apiUpload } from "../../utils/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Profile() {
  const { callApi } = useApi();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      image: null, // add this
    },
  });

  const watchedImage = watch("image");

  // Show preview when image changes
  useEffect(() => {
    if (watchedImage) {
      setPreviewImage(URL.createObjectURL(watchedImage));
    }
  }, [watchedImage]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await callApi("get", "/users/profile");
        setProfile(res);

        reset({
          name: res.name || "",
          email: res.email || "",
          phone: res.phone || "",
          address: res.address || "",
          gender: res.gender || "",
        });

        if (res.profile?.length > 0) {
          setPreviewImage(`http://localhost:5000/${res.profile[0]}`);
        }
      } catch (err) {
        toast.error("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Save profile
  const onSubmit = async (data) => {
    console.log("SUBMIT DATA:", data);
    try {
      setUpdating(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("gender", data.gender);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await apiUpload("/users/profile", formData, "patch");
      toast.success("Profile updated successfully 🎉");

      // Refresh profile
      const updatedProfile = await callApi("get", "/users/profile");
      setProfile(updatedProfile);
      reset({
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        address: updatedProfile.address,
        gender: updatedProfile.gender,
      });

      if (updatedProfile.profile?.length > 0) {
        setPreviewImage(`http://localhost:5000/${updatedProfile.profile[0]}`);
      }
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="p-6 max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6 mt-8">
      {/* Left Side: Image + Logout */}
      <div className="flex flex-col items-center w-full md:w-[400px]">
        <Controller
          name="image"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef} // <--- important
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    field.onChange(file); // send File to RHF
                    setPreviewImage(URL.createObjectURL(file)); // preview
                  }
                }}
              />

              <div
                className="w-40 h-40 rounded-full overflow-hidden border border-gray-300 cursor-pointer mb-4"
                onClick={() => {
                  fileInputRef.current.click(); // trigger the hidden input
                }}
              >
                <img
                  src={previewImage || "/home.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        />
        <p className="text-gray-500 text-sm mt-2">
          Registered: {new Date(profile.createdAt).toLocaleDateString()}
        </p>

        <div className="mt-4">
          <Button onClick={handleLogout} variant="primary">
            Log Out
          </Button>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextInput
            name="name"
            placeholder="Name"
            register={register}
            error={errors.name}
          />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            error={errors.email}
          />
          <TextInput
            type="tel"
            name="phone"
            placeholder="Phone"
            register={register}
            error={errors.phone}
          />
          <TextInput
            name="address"
            placeholder="Address"
            register={register}
            error={errors.address}
          />

          {/* Gender */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" value="male" {...register("gender")} /> Male
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="female" {...register("gender")} />{" "}
              Female
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="other" {...register("gender")} /> Other
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}

          <div className="mt-4">
            <Button type="submit" variant="secondary" disabled={updating}>
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
