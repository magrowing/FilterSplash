import { create } from 'zustand'

type userInfo = {
  value : string;
  keywords : (string)[]; 
  actions : {
    setValue : (text :string) =>void; 
    setKeywords : (value :string[]) =>void; 
  }
}

export const useSettingCategoriesStore = create<userInfo>()((set) => ({
  value: '',
  keywords : [],
  actions : {
    setValue: (text :string) => set({ value: text}),
    setKeywords: (value:string[]) => set({ keywords: [...value] }),
  }
}))

