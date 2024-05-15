import React, {useState, useEffect} from "react"
import { useForm } from "react-hook-form"

export const Form = ({ addUser }) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const [isFormComplete, setIsFormComplete] = useState(false);
   
    const Submit = async (data) => {
        const stringify = JSON.stringify(data)
        const fetching = await fetch(`http://localhost:8008/form?${stringify}`)
        const json = await fetching.json()
        const jsonparse = JSON.parse(json)
        addUser(jsonparse)
        setIsFormComplete(false)
    }

    useEffect(() => {
        if (watch("name") && watch("surname") && watch("city") && watch("birthdate") && watch("gender")) {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    }, [watch("name"), watch("surname"),watch("city"), watch("birthdate"), watch("gender")]);

    return (
        <div>
        <form onSubmit={handleSubmit(Submit)}>
            <label>
                Name:
                <input type="text" name="name"{...register("name", {required: true})}/>
            </label>
            <label>
                Surname:
                <input type="text" name="surname" {...register("surname", {required: true})}/>
            </label>
            <label>
                City:
                <input type="text" name="city" {...register("city", {required: true})}/>
            </label>
            <label>
                Birth date:
                <input type="date" name="birthdate" {...register("birthdate", {required: true})}/>
            </label>
            <label>
                Gender:
                <div>
                    <label>
                        Male <input type="radio" name="male" value={"male"} {...register("gender", {required: true})}/> 
                    </label>
                   <label>
                        Female <input type="radio" name="female" value={"female"} {...register("gender", {required: true})}/> 
                   </label>
                </div>
            </label>
            <button type="submit" disabled={!isFormComplete}>Submit</button>
        </form>
        </div>
    )
}