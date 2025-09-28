import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_APP_BASE_URL || "http://localhost:8800";

const baseQuery = fetchBaseQuery({ 
  baseUrl: `${API_URI}/api`,
  credentials: 'include', // Include cookies for authentication
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Task", "User"],
  endpoints: (builder) => ({
    // Task endpoints
    createTask: builder.mutation({
      query: (data) => ({
        url: "/task/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    
    getTasks: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        url: `/task?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    getTask: builder.query({
      query: (id) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    updateTask: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/task/update/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    trashTask: builder.mutation({
      query: ({ _id }) => ({
        url: `/task/${_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Task"],
    }),

    createSubTask: builder.mutation({
      query: ({ data, id }) => ({
        url: `/task/create-subtask/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `/task/duplicate/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Task"],
    }),

    postTaskActivity: builder.mutation({
      query: ({ data, id }) => ({
        url: `/task/activity/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    dashboardStatistics: builder.query({
      query: () => ({
        url: "/task/dashboard",
        method: "GET",
      }),
    }),

    deleteRestoreTask: builder.mutation({
      query: ({ id, actionType }) => ({
        url: `/task/delete-restore/${id}?actionType=${actionType}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    // User endpoints
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),

    getTeamList: builder.query({
      query: () => ({
        url: "/user/get-team",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    changeUserPassword: builder.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    activateUserProfile: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: { isActive },
      }),
      invalidatesTags: ["User"],
    }),

    deleteUserProfile: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getNotificationsList: builder.query({
      query: () => ({
        url: "/user/notifications",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useTrashTaskMutation,
  useCreateSubTaskMutation,
  useDuplicateTaskMutation,
  usePostTaskActivityMutation,
  useDashboardStatisticsQuery,
  useDeleteRestoreTaskMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useGetTeamListQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangeUserPasswordMutation,
  useActivateUserProfileMutation,
  useDeleteUserProfileMutation,
  useGetNotificationsListQuery,
} = apiSlice;
