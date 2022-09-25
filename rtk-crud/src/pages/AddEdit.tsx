import React, {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {
    useAddContactMutation,
    useContactQuery,
    useUpdateContactMutation,
} from "../services/contactsApi"
import "./AddEdit.css"
import {useForm} from "react-hook-form";
import Contact from "../model/contact.model";

const defaultValues = {
    name: "",
    email: "",
    contact: "",
}

const AddEdit = () => {
    const [editMode, setEditMode] = useState(false)
    const [addContact] = useAddContactMutation()
    const [updateContact] = useUpdateContactMutation()

    const navigate = useNavigate()

    const {id} = useParams()
    const {data, error} = useContactQuery(id!)

    const {formState: { errors }, handleSubmit, register, reset} = useForm<Contact>({defaultValues: defaultValues})



    useEffect(() => {
        if (error && id) {
            toast.error("Something went wrong")
        }
    }, [error])

    useEffect(() => {
        if (id) {
            setEditMode(true)
            if (data) {
                reset(data)
            }
        } else {
            setEditMode(false)
            reset(defaultValues)
        }
    }, [id, data])


    const submit = async (data: Contact) => {
        if (!editMode) {
            await addContact(data)
            navigate("/")
            toast.success("Contact Added Successfully")
        } else {
            await updateContact(data)
            navigate("/")
            setEditMode(false)
            toast.success("Contact Updated Successfully")
        }
    }
    return (
        <div style={{marginTop: "100px"}}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit(submit)}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Name ..."
                    {...register("name", { required: "Name is required." })}
                />
                {errors.name && <div className="error">{errors.name.message}</div>}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter Email ..."
                    {...register("email", { required: "Email is required." })}
                />
                {errors.email && <div className="error">{errors.email.message}</div>}
                <label htmlFor="contact">Contact</label>
                <input
                    type="number"
                    id="contact"
                    placeholder="Enter Contact no. ..."
                    {...register("contact", { required: "Contact no. is required." })}
                />
                {errors.contact && <div className="error">{errors.contact.message}</div>}
                <input type="submit" value={editMode ? "Update" : "Add"}/>
            </form>
        </div>
    )
}

export default AddEdit
