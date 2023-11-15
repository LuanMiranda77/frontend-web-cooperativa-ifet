import React, { useState } from 'react';
import { Container } from './styles';
import { TabType } from './types';

interface TabDefaultProps {
  //adicionar os props
  className?: string;
  tabs: Array<TabType>;
  onSelectTab: (value: string) => React.ReactNode;

}

export const TabsDefault: React.FC<TabDefaultProps> = (props) => {
  const [activeTab, setActiveTab] = useState(props.tabs[0].value);
  return <>
    <Container className={props.className}>
      <div className="Tabs">
        <ul className="nav">
          {
            props.tabs.map((tab, key) => {
              return <li key={key} id={tab.value}
                className={activeTab === tab.value ? "active" : ""}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </li>
            })
          }
        </ul>
      </div>
    </Container>
    {props.onSelectTab(activeTab)}
  </>;
}