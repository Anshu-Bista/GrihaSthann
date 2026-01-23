import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";
import { FormHeader } from "../../components/FormHeader.jsx";
import { loginSchema } from "../../schema/auth.schema.js";
import { useApi } from "../../hooks/useAPI.js";
import "../../css/Form.css";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (loginData) => {
    try {
      const res = await callApi("POST", "/auth/login", {
        data: loginData,
      });

      login(res.access_token, res.user);

      console.log("LOGIN SUCCESS, NAVIGATING...");
      navigate("/home", { replace: true });

      console.log(res);
    } catch (e) {
      console.error("Login failed:", e.message);
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <FormHeader title="Welcome Back" subtitle="Login to continue" />

        <TextInput
          type="email"
          name="email"
          placeholder="Email address"
          iconClass="email-icon"
          register={register}
          error={errors.email}
        />

        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          iconClass="lock-icon"
          register={register}
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
