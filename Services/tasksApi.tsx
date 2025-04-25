import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the tasksApi with the existing posts endpoint and the new comments endpoint
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => 'posts', // Fetch posts (courses)
    }),
    getComments: builder.query({
      query: (courseId) => `posts/${courseId}/comments`, // Fetch comments for a specific course
    }),
  }),
});

export const { useGetTasksQuery, useGetCommentsQuery } = tasksApi;
