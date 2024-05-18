import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Divider } from "../Divider";
interface Props {
  title: string;
  className?:string;
}

const TitleDivider: React.FC<Props> = (props) => {
  const { colors, title } = useContext(ThemeContext);
  return (
    <div className={props.className}>
      <p
        className="font-bold text-xs"
        style={{
          color: title === "dark" ? colors.textLabel : colors.tertiary,
        }}
      >
        {props.title}
      </p>
      <Divider tipo="horizontal" />
    </div>
  );
};

export default TitleDivider;
