import { useRef, useState } from 'react';

type TextFieldProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  isVaild: boolean;
  message: string;
  onChange: (value: string) => void;
  isShowPw?: boolean;
};

function TextField({
  label,
  type,
  name,
  placeholder,
  value,
  isVaild,
  message,
  onChange,
  isShowPw,
}: TextFieldProps) {
  const idRef = useRef(`textbox-${Math.random().toString().slice(2)}`);
  const [toggleType, setToggleType] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }
    onChange(event.target.value);
  };

  const handleClick = () => {
    setToggleType(!toggleType);
  };

  return (
    <div>
      <div>
        <label htmlFor={idRef.current}>{label}</label>
        <input
          type={toggleType ? 'text' : type}
          name={name}
          placeholder={placeholder}
          id={idRef.current}
          value={value}
          onChange={handleChange}
        />
        {isShowPw && (
          <button type="button" onClick={handleClick}>
            눈모양
          </button>
        )}
      </div>
      <div>{isVaild && <p>{message}</p>}</div>
    </div>
  );
}

export default TextField;
