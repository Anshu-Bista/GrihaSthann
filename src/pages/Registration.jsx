
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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
                <div>
                    <label>
                    Name
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name", { required: "Name is required" })}
                    />
                    </label>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label>
                    Email
                    <input
                        type="email"
                        placeholder="Email address"
                        {...register("email", {
                        required: "Email is required"
                        })}
                    />
                    </label>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <label>
                    Phone Number <span>(optional)</span>
                    <input
                        type="tel"
                        placeholder="98XXXXXXXX"
                        {...register("phone")}
                    />
                    </label>
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                {/* Address */}
                <div>
                    <label>
                    Address <span>(optional)</span>
                    <input
                        type="text"
                        placeholder="Your address"
                        {...register("address")}
                    />
                    </label>
                    {errors.address && <p>{errors.address.message}</p>}
                </div>

                {/* Gender */}
                <div>
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
                <div>
                    <label>
                    Password
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                        required: "Password is required"}
                        )}
                    />
                    </label>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                    <label>
                    Confirm Password
                    <input
                        type="password"
                        placeholder="Confirm password"
                        {...register("confirmPassword", {
                        required: "Confirm your password"}
                    )}
                    />
                    </label>
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>

                {/* Buttons */}
                <button type="submit">Register</button>

                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        
        </>
    );
}