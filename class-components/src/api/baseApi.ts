import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['Character'],
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 600,
});
