import { create } from 'zustand';

type SearchStore = {
  headerSearch: string;
  contentSearch: string;
  setHeaderSearch: (value: string) => void;
  setContentSearch: (value: string) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
  headerSearch: '',
  contentSearch: '',
  setHeaderSearch: (value: string) => set({ headerSearch: value }),
  setContentSearch: (value: string) => set({ contentSearch: value }),
}));
