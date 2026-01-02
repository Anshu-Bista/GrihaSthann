
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


import {Button} from '../components/Button.jsx'
import './Registration.css'

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
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="input-group">
                    <span className="icon user-icon"></span>
                    <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                    />
                </div>
                {errors.name && <p className="error">{errors.name.message}</p>}

                {/* Email */}
                <div className="input-group">
                    <span className="icon email-icon"></span>
                    <input
                    type="email"
                    placeholder="Email address"
                    {...register("email", { required: "Email is required" })}
                    />
                </div>
                {errors.email && <p>{errors.email.message}</p>}

                {/* Phone Number */}
                <div  className="input-group">
                    <span className="icon phone-icon"></span>
                    <input
                        type="tel"
                        placeholder="98XXXXXXXX"
                        {...register("phone")}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                {/* Address */}
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Your address"
                        {...register("address")}
                    />
                </div>
                {errors.address && <p>{errors.address.message}</p>}
                

                {/* Gender */}
                <div className="input-group">
                    <label>Gender <span>(optional)</span></label>
                    <div className="gender-group">
                    <label>
                        <input
                        type="radio"
                        value="male"
                        {...register("gender")}
                        />
                        Male
                    </label>

                    <label>
                        <input
                        type="radio"
                        value="female"
                        {...register("gender")}
                        />
                        Female
                    </label>

                    <label>
                        <input
                        type="radio"
                        value="other"
                        {...register("gender")}
                        />
                        Other
                    </label>
                    </div>
                    {errors.gender && <p>{errors.gender.message}</p>}
                </div>

                {/* Password */}
                <div className="input-group">
                <span className="icon lock-icon"></span>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                        required: "Password is required"}
                        )}
                    />
                </div>
                {errors.password && <p>{errors.password.message}</p>}
                

                {/* Confirm Password */}
                <div className="input-group">
                    <span className="icon lock-icon"></span>
                    
                    <input
                        type="password"
                        placeholder="Confirm password"
                        {...register("confirmPassword", {
                        required: "Confirm your password"}
                    )}
                    />
                </div>
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                

                {/* Buttons */}
                <Button type="submit" variant="secondary">Register</Button>

                <p className="login-text">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </form>
        
        </>
    );
}