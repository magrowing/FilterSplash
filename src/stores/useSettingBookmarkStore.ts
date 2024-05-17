import { create } from 'zustand'

import { BookmarkData } from '../types/card';

type BookmarkStore = {
  bookmarkData : BookmarkData[]; 
  actions : {
    setBookmarkData : (value :BookmarkData[]) =>void; 
  }
}

export const useBookmarkStore = create<BookmarkStore>()((set) => ({
  bookmarkData : [],
  actions : {
    setBookmarkData: (value:BookmarkData[]) => set({ bookmarkData: [...value] }),
  }
}))

