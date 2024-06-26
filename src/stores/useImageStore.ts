import { create } from 'zustand';

type userImage = {
  query: string;
  page: number;
  actions: {
    setQuery: (value: string) => void;
    setPage: (value: number) => void;
    setScrollPage: () => void;
  };
};

export const useUserImageStore = create<userImage>()((set) => ({
  query: 'random',
  page: 1,
  actions: {
    setQuery: (value: string) => set({ query: value }),
    setPage: (value: number) => set({ page: value }),
    setScrollPage: () => set((state) => ({ page: state.page + 1 })),
  },
}));
