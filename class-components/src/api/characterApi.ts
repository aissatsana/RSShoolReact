import { baseApi } from './baseApi';
import type { CharacterDetail, CharactersResponse } from '../types';

type QueryParams = { page?: number; name?: string };

export const characterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCharacters: build.query<CharactersResponse, QueryParams | void>({
      query: (arg) => {
        const page = arg?.page ?? 1;
        const params = new URLSearchParams();
        params.set('page', String(page));
        if (arg?.name) params.set('name', arg.name);
        const qs = params.toString();
        return `/character${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result) =>
        result?.results
          ? [
              ...result.results.map((c) => ({
                type: 'Character' as const,
                id: c.id,
              })),
              { type: 'Character', id: 'LIST' },
            ]
          : [{ type: 'Character', id: 'LIST' }],
    }),

    getCharacterById: build.query<CharacterDetail, number>({
      query: (id) => ({ url: `/character/${id}` }),
      providesTags: (_res, _err, id) => [{ type: 'Character', id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterApi;
