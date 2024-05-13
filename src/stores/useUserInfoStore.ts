import { create } from 'zustand'

type userInfo = {
  uid : string;
  category : (string)[]; 
  setUid : (value :string) =>void; 
  setCategory : (value :string[]) =>void; 
}

export const useUserInfoStore = create<userInfo>()((set) => ({
  uid: '',
  category : [],
  setUid: (value :string) => set({ uid: value}),
  setCategory: (value:string[]) => set({ category: [...value] }),
}))

