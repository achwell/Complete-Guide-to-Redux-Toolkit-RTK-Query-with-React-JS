import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react"
import {collection, query, getDocs, getDoc, doc, setDoc, deleteDoc} from "firebase/firestore";
import {toast} from "react-toastify"
import Blog from "../types/Blog"
import {db} from "../firebase"

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Blog"],
    endpoints: build => ({
        fetchBlogs: build.query({
            async queryFn() {
                try {
                    const q = query(collection(db, "blogs"))
                    const querySnapshot = await getDocs(q)
                    const blogs: Blog[] = []
                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        const blog: Blog = {
                            id: doc.id,
                            description: data.description,
                            timestamp: data.timestamp.toDate(),
                            title: data.title,
                            imgUrl: data.imgUrl,
                        };
                        blogs.push(blog)
                    })
                    return {data: blogs}
                } catch (e) {
                    toast.error((e as Error).message)
                    return {error: e}
                }
            },
            providesTags: ["Blog"]
        }),
        fetchBlog: build.query({
            queryFn: async function (id: string) {
                try {
                    const docRef = doc(db, "blogs", id)
                    const docSnap = await getDoc(docRef)
                    let blog: Blog
                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        blog = {
                            id,
                            description: data!.description,
                            timestamp: data!.timestamp.toDate(),
                            title: data!.title,
                            imgUrl: data!.imgUrl,
                        }
                    } else {
                        blog = {id, description: "", title: ""}
                    }
                    return {data: blog}
                } catch (e) {
                    toast.error((e as Error).message)
                    return {error: e}
                }
            },
            providesTags: ["Blog"]
        }),
        addBlog: build.mutation({
            async queryFn(blog: Blog) {
                try {
                    await setDoc(doc(db, "blogs"), {
                        ...blog,
                        timestamp: new Date(),
                    });
                    return {data: "ok"}
                } catch (e) {
                    toast.error((e as Error).message)
                    return {error: e}
                }
            },
            invalidatesTags: ["Blog"]
        }),
        deleteBlog: build.mutation({
            async queryFn(id: string) {
                try {
                    await deleteDoc(doc(db, "blogs", id));
                    return {data: "ok"}
                } catch (e) {
                    toast.error((e as Error).message)
                    return {error: e}
                }
            },
            invalidatesTags: ["Blog"]
        }),
        updateBlog: build.mutation({
            async queryFn(blog: Blog) {
                try {
                    await setDoc(doc(db, "blogs", blog.id), {
                        ...blog,
                        timestamp: new Date(),
                    });
                    return {data: "ok"}
                } catch (e) {
                    toast.error((e as Error).message)
                    return {error: e}
                }
            },
            invalidatesTags: ["Blog"]
        })
    })
})

export const {
    useAddBlogMutation,
    useDeleteBlogMutation,
    useFetchBlogQuery,
    useFetchBlogsQuery,
    useUpdateBlogMutation
} = blogApi
