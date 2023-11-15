import React from 'react';
import CountUp from 'react-countup';
import { Container } from './styles';

interface SummaryDefaultProps {
  //adicionar os props
  label: string;
  backgroundColor?: string;
  colorBorder?: string;
  icon: React.ReactNode;
  className?: string;
  montante: number;
}

export const SummaryDefault: React.FC<SummaryDefaultProps> = (props) => {
  return <Container className={"card-local " + props.className} 
    id={props.label} 
    style={{ borderTop: '2px solid ' + props.colorBorder, background:props.backgroundColor }} >
    <div className="w-full p-1 ml-1">
      <label className="title-responsive" htmlFor="">{props.label}</label>
    </div>
    <div className="flex font-bold lg:text-2xl justify-between p-2">
      {props.icon}
      <label id={props.label} htmlFor={props.label} style={{ color: props.colorBorder }}>
        <CountUp end={props.montante} prefix='R$ ' separator="." decimal="," decimals={2} />
      </label>
    </div>
  </Container>
}