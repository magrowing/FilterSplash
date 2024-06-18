export type InputProps = {
  valid: boolean;
};

export type PasswordIconBtnProps = {
  active: boolean;
};

export type TextFieldProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  isValid: boolean;
  message: string;
  onChange: (value: string) => void;
  isShowPw?: boolean;
};
