import React, {FC, useEffect, useState} from 'react'
import {Controller, useForm} from "react-hook-form"
import {useNavigate, useParams} from "react-router-dom"
import {skipToken} from "@reduxjs/toolkit/query"
import {toast} from "react-toastify"
import {MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBTextArea, MDBValidation, MDBValidationItem} from "mdb-react-ui-kit"
import {getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {useAddBlogMutation, useFetchBlogQuery, useUpdateBlogMutation} from "../services/blogsApi"
import Blog from "../types/Blog"
import Spinner from "../components/Spinner";
import {storage} from "../firebase";

interface Props {
}

const blog = {
    id: "",
    title: "",
    description: ""
}

const AddEditBlog: FC<Props> = ({}) => {

    const [file, setFile] = useState<File>()
    const [progress, setProgress] = useState(0)
    const [addBlog] = useAddBlogMutation()
    const [updateBlog] = useUpdateBlogMutation()
    const {id} = useParams()
    const {data, error, isError, isLoading} = useFetchBlogQuery(id ? id : skipToken)
    const navigate = useNavigate()

    const {control, formState: {errors}, handleSubmit, reset, watch} = useForm<Blog>({defaultValues: blog})

    useEffect(() => {
        isError && toast.error(error as string)
    }, [isError, error])

    useEffect(() => {
        if (id && data) {
            reset({...data})
        }
    }, [id, data])

    useEffect(() => {
        const uploadFile = () => {
            if (!file) {
                return
            }
            const name = new Date().getTime() + file.name
            const fileRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(fileRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                    }
                },
                (error) => {
                    toast.error(error.message)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        toast.info("Image Upload Successsfully: " + downloadURL)
                        reset((prev) => ({
                            ...prev,
                            imgUrl: downloadURL
                        }))
                    });
                }
            )
        }
        uploadFile()
    }, [file])

    const submit = async (data: Blog) => {
        if (!id) {
            await addBlog(data)
        } else {
            await updateBlog(data)
        }
        navigate("/")
    }

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px"}}
             className="container">
            <MDBCard alignment="center">
                <h4 className="fw-bold">Create Blog</h4>
                <MDBCardBody>
                    <MDBValidation className="row g3" noValidate onSubmit={handleSubmit(submit)}>
                        <Controller
                            control={control}
                            name="title"
                            rules={{required: "Du må skrive tittel"}}
                            render={({field: {onChange, onBlur, value}}) => (
                                <MDBValidationItem className="col-md-12"
                                                   feedback={errors.title ? errors.title.message : "Please provide title"}
                                                   invalid>
                                    <MDBInput
                                        className="form-control"
                                        label="Title"
                                        type="text"
                                        required
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}/>
                                </MDBValidationItem>
                            )}
                        />
                        <Controller
                            control={control}
                            name="description"
                            rules={{required: "Du må skrive description"}}
                            render={({field: {onChange, onBlur, value}}) => (
                                <MDBValidationItem className="col-md-12"
                                                   feedback={errors.description ? errors.description.message : "Please provide description"}
                                                   invalid>
                                    <MDBTextArea
                                        className="form-control"
                                        label="Description"
                                        required
                                        rows={4}
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}/>
                                </MDBValidationItem>
                            )}
                        />
                        <div className="col-md-12">
                            <MDBInput type="file" onChange={(e) => {
                                let files = e.target.files
                                const file = files ? files[0] : undefined
                                setFile(file)
                            }}/>
                        </div>
                        <div className="col-12">
                            <MDBBtn type="submit" style={{width: "100%"}}
                                    disabled={!!progress && progress < 100}>Submit</MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default AddEditBlog
