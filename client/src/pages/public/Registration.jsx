import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";
import { useApi } from "../../hooks/useAPI.js";
import "../../css/Form.css";
import { registerSchema } from "../../schema/auth.schema.js";

export default function Registration() {
  const navigate = useNavigate();
  const { callApi } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (userData) => {
    try {
      const res = await callApi("POST", "/auth/register", {
        data: userData,
      });

      navigate("/login");
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <TextInput
          name="name"
          placeholder="Full Name"
          iconClass="user-icon"
          register={register}
          error={errors.name}
        />

        {/* Email */}
        <TextInput
          type="email"
          name="email"
          placeholder="Email address"
          iconClass="email-icon"
          register={register}
          error={errors.email}
        />

        {/* Phone Number */}
        <TextInput
          type="tel"
          name="phone"
          placeholder="98XXXXXXXX"
          iconClass="phone-icon"
          register={register}
          error={errors.phone}
        />

        {/* Address */}
        <TextInput
          name="address"
          placeholder="Your address"
          iconClass="location-icon"
          register={register}
          error={errors.address}
        />

        {/* Gender */}
        <div className="gender-group">
          <span className="icon gender-icon"></span>

          <label className="gender-option">
            <input type="radio" value="male" {...register("gender")} />
            <span>Male</span>
          </label>

          <label className="gender-option">
            <input type="radio" value="female" {...register("gender")} />
            <span>Female</span>
          </label>

          <label className="gender-option">
            <input type="radio" value="other" {...register("gender")} />
            <span>Other</span>
          </label>

          {errors.gender && (
            <p className="error">{errors.gender.message}</p>
          )}
        </div>

        {/* Password */}
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          iconClass="lock-icon"
          register={register}
          error={errors.password}
        />

        <TextInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          iconClass="lock-icon"
          register={register}
          error={errors.confirmPassword}
        />

        {/* Buttons */}
        <div className="button-wrapper">
          <Button type="submit" variant="secondary">
            Register
          </Button>
        </div>

        <p className="login-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
}
