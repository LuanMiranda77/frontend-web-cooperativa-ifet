import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Container, Legend, LegendContainer, SideLeft, SideRight } from './styles';
import { DataPizzaChartType } from './types';
interface PizzaChartProps {
  //adicionar os props
  label: string;
  data: Array<DataPizzaChartType>;
}

export const PizzaChart: React.FC<PizzaChartProps> = (props) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x + 4} y={y - 5} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='font-bold text-xs'>
        {`${(percent / 100 * 100).toFixed(1)}%`}
      </text>
    );
  };
  return <Container className='grid p-2'>
    <label htmlFor={props.label} className='title-responsive'>{props.label}</label>
    <SideRight className='w-full h-full'>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={props.data}
            labelLine={false}
            label={renderCustomizedLabel}
            // outerRadius={80}
            // fill="#8884d8"
            dataKey="percent"
          >
            {props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
    <SideLeft>
      <LegendContainer className='grid grid-cols-2 gap-0 overflow-y-auto max-h-12' >
        {props.data.map((value, index) => (
          <Legend key={index} className='flex text-center mb-1' color={value.color}>
            <div style={{ color: value.color }}></div>
            <label className='ml-1 font-bold text-xs' htmlFor="">{value.name}</label>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>
  </Container>
};