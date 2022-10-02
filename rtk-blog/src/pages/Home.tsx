import React, {useEffect} from 'react'
import {useDeleteBlogMutation, useFetchBlogsQuery} from "../services/blogsApi"
import Spinner from "../components/Spinner";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBIcon,
    MDBRow
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Home = () => {

    const {data, error, isError, isLoading} = useFetchBlogsQuery({})
    const [deleteBlog] = useDeleteBlogMutation()

    useEffect(() => {
        isError && toast.error(error as string)
    }, [isError, error])

    if (isLoading) {
        return <Spinner/>
    }

    const excerpt = (str: string = "", count: number) => {
        if (str.length > count) {
            str = str.substring(0, count) + "..."
        }
        return str
    }

    const handleDelete = (id: string) => {
        if(window.confirm("Are you sure to delete?")) {
            deleteBlog(id)
            toast.success("Blog deleted successfully")
        }
    }

    return (
        <div style={{margin: "auto", padding: "15px", maxWidth: "1200px", alignContent: "center"}}>
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                {
                    data?.map(item => {
                            return <MDBCol key={item.id}>
                                <MDBCard className="h-100">
                                    {item.imgUrl && <MDBCardImage src={item.imgUrl} alt={item.title}/>}
                                    <MDBCardBody>
                                        <MDBCardTitle className="text-start">{item.title}</MDBCardTitle>
                                        <MDBCardText className="text-start">
                                            {excerpt(item.description, 80)}
                                            <Link to={`/detail/${item.id}`}>Read More</Link>
                                        </MDBCardText>
                                        <div style={{marginLeft: "5px", float: "right"}}>
                                            <MDBBtn className="mt-1" tag="a" color="none"
                                                    onClick={() => handleDelete(item.id)}>
                                                <MDBIcon
                                                    fas
                                                    icon="trash"
                                                    style={{color: "#dd4b39"}}
                                                    size="lg"
                                                />
                                            </MDBBtn>
                                            <Link to={`/update/${item.id}`}>
                                                <MDBIcon
                                                    fas
                                                    icon="edit"
                                                    style={{color: "#55acee", marginLeft: "10px"}}
                                                    size="lg"
                                                />
                                            </Link>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>;
                        }
                    )
                }
            </MDBRow>
        </div>
    )
}

export default Home
