import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Container } from './styles';
import { DataLinhaChartType } from './types';
interface LinhaChartProps {
  //adicionar os props
  label: string;
  isLegend: boolean;
  isExoY?: boolean;
  colorLine1: string;
  colorLine2?: string;
  colorLine3?: string;
  colorLine4?: string;
  colorLine5?: string;
  tipo1: string;
  tipo2?: string;
  tipo3?: string;
  tipo4?: string;
  tipo5?: string;
  data: Array<DataLinhaChartType>;
}

export const LinhaChart: React.FC<LinhaChartProps> = (props) => (<Container className='grid p-2'>
  <div className='w-full title-responsive'>
    <label htmlFor="">{props.label}</label>
  </div>
  <div className='w-full h-full'>
    <ResponsiveContainer>
      <LineChart
        data={props.data}
        margin={{ top: 15, right: 10, left: 13, bottom: -5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={"#d2d2d2"} />
        <XAxis dataKey="name" stroke="#1c1c1c" />
        {props.isExoY ? <YAxis /> : ''}
        <Tooltip />
        {props.isLegend ? <Legend /> : ''}
         <Line type="monotone" dataKey={'value1'} stroke={props.colorLine1} name={props.tipo1} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }}/>
         { props.tipo2 ? <Line type="monotone" dataKey={'value2'} stroke={props.colorLine2} name={props.tipo2} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }}/> : ''}
         { props.tipo3 ?<Line type="monotone" dataKey={'value3'} stroke={props.colorLine3} name={props.tipo3} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }}/>: ''}
         { props.tipo4 ?<Line type="monotone" dataKey={'value4'} stroke={props.colorLine4} name={props.tipo4} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }}/>: ''}
         { props.tipo5 ?<Line type="monotone" dataKey={'value5'} stroke={props.colorLine5} name={props.tipo5} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }}/>: ''}
      </LineChart>
    </ResponsiveContainer>
  </div>

</Container>
);