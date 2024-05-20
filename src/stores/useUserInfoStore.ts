import { create } from 'zustand'

type User = {
  name : string; 
  image : string; 
  email : string; 
}

type userInfo = {
  uid : string;
  user : User; 
  category : (string)[]; 
  setUid : (value :string) =>void; 
  setUser : (user : User ) => void
  setCategory : (value :string[]) =>void; 
}

export const useUserInfoStore = create<userInfo>()((set) => ({
  uid: '',
  user : {
    name : '', 
    image : '',
    email : '',
  },
  category : [],
  setUid: (value :string) => set({ uid: value}),
  setUser : (user : User) => set({user : {...user}}),
  setCategory: (value:string[]) => set({ category: [...value] }),
}))

