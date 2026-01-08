import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


import {Button} from '../../components/Button.jsx';
import { TextInput } from "../../components/TextInput.jsx";
import '../../css/Form.css';

export function Registration(){
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors}
        }= useForm();
    
        function onSubmit(data){
            console.log("Form values:", data);
            reset();
        }
    return(
        <>
            <div className="register-wrapper">
                
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <TextInput
                    placeholder="Full Name"
                    iconClass="user-icon"
                    register={register("name", { required: "Name is required" })}
                    error={errors.name}
                    />

                    {/* Email */}
                    <TextInput
                        type="email"
                        placeholder="Email address"
                        iconClass="email-icon"
                        register={register("email", { required: "Email is required" })}
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
                        register={register("password", { required: "Password is required" })}
                        error={errors.password}
                    />

                    <TextInput
                        type="password"
                        placeholder="Confirm password"
                        iconClass="lock-icon"
                        register={register("confirmPassword", {
                            required: "Confirm your password"
                        })}
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