import React from "react";

type ButtonProps = {
  text: string;
};

const Button = ({ text }: ButtonProps): React.ReactElement => {
  return <button>{text}</button>;
};

export default Button;
