interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps): React.ReactElement => {
  return <button>{text}</button>;
};

export default Button;
