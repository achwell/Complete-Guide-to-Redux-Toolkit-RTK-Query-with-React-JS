import React, {FormEvent, useState} from "react"
import { Input, Button, Card, Space } from "antd"
import { useNavigate } from "react-router-dom"
import { createPost } from "../features/postSlice"
import {useAppDispatch, useAppSelector} from "../app/hooks"
import LoadingCard from "./LoadingCard"
import Post from "../types/Post";

const CreatePost = () => {
    const [values, setValues] = useState<Partial<Post>>({ title: "", body: "" })
    const { post, loading } = useAppSelector((state) => ({ ...state.app }))
    const [showPost, setShowPost] = useState(false)
    const { title, body } = values
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createPost(values))
        setValues({ title: "", body: "" })
        setShowPost(true)
    }

    const showPostBlog = () => {
        return (
            <>
                {loading ? (
                    <LoadingCard count={1} />
                ) : (
                    <div className="site-card-border-less-wrapper">
                        <Card type="inner" title={post[0].title}>
                            <p>User Id: {post[0].id}</p>
                            <span>{post[0].body}</span>
                        </Card>
                    </div>
                )}
            </>
        )
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create Post</h1>
                <Input
                    placeholder="Enter Title"
                    type="text"
                    onChange={(e) => setValues({ ...values, title: e.target.value })}
                    value={title}
                    style={{ width: "400px" }}
                />
                <br />
                <br />
                <Input.TextArea
                    placeholder="Enter Body"
                    onChange={(e) => setValues({ ...values, body: e.target.value })}
                    value={body}
                    style={{ width: "400px" }}
                    size="large"
                />
                <br />
                <br />
                <Space style={{ margin: 10 }}>
                    <Button onClick={() => navigate("/")}>Go Back</Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </form>
            <br />
            <br />
            {showPost && <div>{showPostBlog()}</div>}
        </div>
    )
}

export default CreatePost
