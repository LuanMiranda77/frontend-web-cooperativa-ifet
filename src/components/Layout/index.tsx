import React, { useContext, useState } from "react";
import { ContainerMenu, Grid } from "./styles";
import { MainHeader } from "../MainHeader";
import { Aside } from "../Aside";
import { Content } from "../Content";
import { ThemeContext } from "styled-components";
import { Drawer, List } from 'devextreme-react';
import { MenuAside } from "../MenuAside";

interface Props {
  //adicionar os props
  alterTheme(): void;
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = (props) => {
  const { colors, title } = useContext(ThemeContext);
  const [sizeAside, setSizeAside] = useState("71px");
  const [sizeMenu, setMenu] = useState("0px");

  const visibleAside = () => {
    // let aside = sizeAside === "71px" ? "200px" : "71px";
    // setSizeAside(aside);
    let menu = sizeMenu === "0px" ? "250px" : "0px";
    setMenu(menu);
  };

  const onCloseMenu = () => {
    if(sizeMenu === "250px"){
      setMenu('0px');
    }
  };

  return (
      <Grid style={{ gridTemplateColumns: '71px' }}>
        <MainHeader
          alterTheme={props.alterTheme}
          onClickMenu={visibleAside}
          onClose={onCloseMenu}
        />
        <Aside />
        <Content closeMenu={onCloseMenu}>{props.children}</Content>
      </Grid>
  );
};
