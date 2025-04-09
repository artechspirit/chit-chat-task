import { Inbox } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getMessages: builder.query<Inbox[], void>({
      query: () => "getMessages",
    }),
    getMessagesById: builder.query<{ id: number }[], number>({
      query: (id) => `getMessages/${id}`,
    }),
  }),
});

export const { useGetMessagesQuery, useGetMessagesByIdQuery } = apiSlice;
