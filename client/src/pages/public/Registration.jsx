import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {Button} from '../../components/Button.jsx';
import { TextInput } from "../../components/TextInput.jsx";
import { useApi } from "../../hooks/useAPI.js";
import '../../css/Form.css';
import { registerSchema } from "../../schema/auth.schema.js";

export default function Registration(){
    const navigate = useNavigate();
    const { callApi } = useApi();
    const {
        register,
        handleSubmit,
        formState:{errors}
        }= useForm({
            resolver: zodResolver(registerSchema)
        });
    

    console.log(errors);
    const onSubmit = async (userData) => {
        try {
            const res = await callApi("POST", "/auth/register", { data: userData });
            // THEN navigate
            navigate("/login");
            console.log(res);
        } catch (err) {
        console.log(err.message);
        }
    };

    return(
        <>
            <div className="register-wrapper">
                
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <TextInput
                    placeholder="Full Name"
                    iconClass="user-icon"
                    register={register("name")}
                    error={errors.name}
                    />

                    {/* Email */}
                    <TextInput
                        type="email"
                        placeholder="Email address"
                        iconClass="email-icon"
                        register={register("email")}
                        error={errors.email}
                        />

                        {/* Phone Number */}
                    <TextInput
                        type="tel"
                        placeholder="98XXXXXXXX"
                        iconClass="phone-icon"
                        register={register("phone")}
                        error={errors.phone}
                    />

                {/* Address */}
                    <TextInput
                        placeholder="Your address"
                        iconClass="location-icon"
                        register={register("address")}
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
                    </div>


                    {/* Password */}
                    <TextInput
                        type="password"
                        placeholder="Password"
                        iconClass="lock-icon"
                        register={register("password")}
                        error={errors.password}
                    />

                    <TextInput
                        type="password"
                        placeholder="Confirm password"
                        iconClass="lock-icon"
                        register={register("confirmPassword")}
                        error={errors.confirmPassword}
                    />

                    {/* Buttons */}
                    <div className="button-wrapper">
                        <Button type="submit" variant="secondary">Register</Button>
                    </div>

                    <p className="login-text">
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>

                </form>
            </div>
        
        </>
    );
}