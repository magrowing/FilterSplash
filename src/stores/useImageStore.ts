import { create } from 'zustand'

type userImage = {
  query : string;
  page : number; 
  setQuery : (value :string) =>void; 
  setPage : (value :number) =>void; 
}

export const useUserImageStore = create<userImage>()((set) => ({
  query: 'random',
  page : 1,
  setQuery: (value :string) => set({ query: value}),
  setPage: (value:number) => set({page: value }),
}))

