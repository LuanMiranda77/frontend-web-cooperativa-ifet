import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Container } from "./styles";
import { ThemeContext } from "styled-components";

interface TabNav {
  label: string;
  disabled?: boolean;
}

interface NavTabProps {
  //adicionar os props
  value: number;
  setValue: (value: number) => void;
  tabs: TabNav[];
  children: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export function TabItem(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const NavTab: React.FC<NavTabProps> = ({
  children,
  value,
  setValue,
  tabs = [],
}) => {

  const { title, colors } = useContext(ThemeContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Container className="w-full">
      <Box sx={{ borderBottom: 1, borderColor: "divider", padding:'0px', }}>
        <Tabs
          onChange={handleChange}
          aria-label="tabs"
          value={value}
          // textColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          style={{color:colors.primary}}
          sx={{padding:'0px', borderColor:colors.primary}}
        >
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              className='font-16-responsive'
              label={tab.label}
              value={i}
              disabled={tab.disabled ? tab.disabled : false}
              wrapped
              color={colors.primary}
              sx={{fontWeight:'bold', textTransform: 'capitalize', marginBottom:'0px', fontSize:'14px'}}
            />
          ))}
        </Tabs>
      </Box>
      {children}
    </Container>
  );
};
