type ErrorBox = {
  text: string;
};

function ErrorBox({ text }: ErrorBox) {
  return <div>{text}</div>;
}

export default ErrorBox;
