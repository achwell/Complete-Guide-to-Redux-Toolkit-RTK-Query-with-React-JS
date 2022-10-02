import React, {useEffect} from 'react'
import {skipToken} from "@reduxjs/toolkit/query"
import {useParams} from "react-router-dom"
import {toast} from "react-toastify"
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBTypography} from "mdb-react-ui-kit"
import {useFetchBlogQuery} from "../services/blogsApi"
import Spinner from "../components/Spinner"

const Detail = () => {
  const {id} = useParams()
  const {data, error, isError, isLoading} = useFetchBlogQuery(id ? id : skipToken)

  useEffect(() => {
    isError && toast.error(error as string)
  }, [isError, error])

  if (isLoading) {
    return <Spinner/>
  }

  if (!data) {
    return null
  }

  return (
      <MDBCard className="mb-3">
        {data.imgUrl && <MDBCardImage
            src={data.imgUrl}
            alt={data.title}
            position="top"
            style={{height: "600px"}}
        />}
        <MDBCardBody>
          <MDBCardTitle className="h3 fw-bold">{data.title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {data.timestamp && <><span className="fw-bold">Created at - &nbsp;</span>
            <small className="text-muted h6">{data.timestamp.toLocaleString()}</small></>}
            <MDBTypography blockquote={true} className="text-start mb-0">{data.description}</MDBTypography>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
  )
}

export default Detail
