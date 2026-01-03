import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "../components/Button.jsx";
import { TextInput } from "../components/TextInput.jsx";
import { FormHeader } from "../components/FormHeader.jsx";

import './Form.css';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>

        <FormHeader
            title="Welcome Back"
            subtitle="Login to continue"
        />

        <TextInput
          type="email"
          placeholder="Email address"
          iconClass="email-icon"
          register={register("email", { required: "Email is required" })}
          error={errors.email}
        />

        <TextInput
          type="password"
          placeholder="Password"
          iconClass="lock-icon"
          register={register("password", { required: "Password is required" })}
          error={errors.password}
        />

        {/* Forgot password */}
        <div className="forgot-password">
          <Link to="/reset-password">Forgot password?</Link>
        </div>

        <Button type="submit" variant="secondary">
          Login
        </Button>

        <p className="login-text">
          Don’t have an account?
          <Link to="/register"> Register</Link>
        </p>

      </form>
    </div>
  );
}
