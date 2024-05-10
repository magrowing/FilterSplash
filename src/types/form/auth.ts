export type Form = {
  text: string,
  isValid: boolean,
  message: string,
}

export const initFormState : Form ={
  text: '',
  isValid: false,
  message: '',
}