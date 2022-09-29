import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const EDAMAM_APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY
const EDAMAM_APP_ID = import.meta.env.VITE_EDAMAM_APP_ID

export const recipeApi = createApi({
    reducerPath: "recipeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.edamam.com/" }),
    endpoints: (builder) => ({
        getRecipes: builder.mutation({
            query: ({ query, health }) => {
                return {
                    url: `search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&&health=${health}`,
                    method: "get",
                };
            },
        }),
    }),
});

export const { useGetRecipesMutation } = recipeApi
