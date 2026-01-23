import { useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";

export default function Add(){
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);
      };
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div class="flex flex-column space-y-6">

                <section class="p-4 border rounded-lg">
                    <h3 class="font-bold mb-2">Basic Property Details</h3>

                    <label class="block text-sm font-medium text-gray-600 mb-1">
                    Property Title
                    </label>
                    <TextInput 
                    name="title"
                    register={register}
                    error={errors.name}
                    />

                    <div className="flex felx-row">
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                        Price per Month
                        </label>
                        <TextInput 
                        name="price"
                        type="number"
                        register={register}
                        error={errors.price}
                        />
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                        Total Area
                        </label>
                        <TextInput name="area"
                        type="number"
                        register={register}
                        error={errors.area}
                        />
                    </div>

                    <label class="block text-sm font-medium text-gray-600 mb-1">
                        Description
                    </label>
                    <TextInput name="area"
                    type="number"
                    register={register}
                    error={errors.area}
                    />
                </section>

                <section class="p-4 border rounded-lg">
                    <h3 class="font-bold mb-2">Amenities Section</h3>   
                </section>

                <section class="p-4 border rounded-lg">
                    <h3 class="font-bold mb-2">Location Details</h3> 

                    <label class="block text-sm font-medium text-gray-600 mb-1">
                    Area
                    </label>
                    <TextInput 
                    name="area"
                    register={register}
                    error={errors.area}
                    />

                    <label class="block text-sm font-medium text-gray-600 mb-1">
                    Street Address
                    </label>
                    <TextInput 
                    name="street"
                    register={register}
                    error={errors.street}
                    />

                    <label class="block text-sm font-medium text-gray-600 mb-1">
                    ZIP Code
                    </label>
                    <TextInput 
                    name="street"
                    register={register}
                    error={errors.street}
                    />

                </section>
                
                <section class="p-4 border rounded-lg">
                    <h3 class="font-bold mb-2">Lease and Furnishing Details</h3>   
                </section>

                <section class="p-4 border rounded-lg">
                    <h3 class="font-bold mb-2">Property Information</h3>

                    <label class="block text-sm font-medium text-gray-600 mb-1">
                    Year Built
                    </label>
                    <TextInput 
                    name="year"
                    register={register}
                    error={errors.area}
                    />

                    <label class="block text-sm font-medium text-gray-600 mb-1">
                    Number of Levels
                    </label>
                    <TextInput 
                    name="level"
                    register={register}
                    error={errors.level}
                    />

                    <div class="flex flex-row">
                        <label class="block text-sm font-medium text-gray-600 mb-1">
                        Bedroom
                        </label>
                        <TextInput 
                        name="bed"
                        register={register}
                        error={errors.bed}
                        />

                        <label class="block text-sm font-medium text-gray-600 mb-1">
                        Bathroom
                        </label>
                        <TextInput 
                        name="bath"
                        register={register}
                        error={errors.bath}
                        />

                        <label class="block text-sm font-medium text-gray-600 mb-1">
                        Kitchen
                        </label>
                        <TextInput 
                        name="kitchen"
                        register={register}
                        error={errors.kitchen}
                        />
                    </div>
  
                </section>
                <div className="button-wrapper">
                    <Button type="submit" variant="secondary">
                        Register
                    </Button>
                </div>
            </div>
            
        </form>
    )
}