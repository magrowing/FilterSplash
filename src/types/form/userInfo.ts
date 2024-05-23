
export type User = {
  name: string;
  image: string;
  email: string;
  category: string[];
};

export const nullUser: User = {
  name: '',
  image: '',
  email: '',
  category: [],
};