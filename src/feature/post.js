import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "data",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `data/${id}`,
        method: "DELETE",
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: `data`,
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json;",
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (updataUserData) => {
        const { id, ...data } = updataUserData;
        // console.log(data);
        return {
          url: `data/${id}`,
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            Accept: "application/json;",
          },
        };
      },
    }),
  }),
});
export const {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = postAPI;
