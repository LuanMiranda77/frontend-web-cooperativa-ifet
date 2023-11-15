import React from "react";

interface TitleProps {
  text: string;
  value: string | number;
  color?: string;
  className?: string;
}

export const TitleMDe: React.FC<TitleProps> = (props) => {
  return (
    <p
      className={`font-bold font-16-responsive ${
        props.color ? props.color : "color-tertiary"
      } ${props.className}`}
    >
      <p className="font-bold color-primary font-14-responsive">{props.text}</p>
      {props.value}
    </p>
  );
};
