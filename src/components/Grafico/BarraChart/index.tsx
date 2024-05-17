import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Container } from "./styles";
import { DataBarraChartType } from "./types";
interface BarraChartProps {
  //adicionar os props
  label: string;
  isLegend: boolean;
  isExoY?: boolean;
  colorBar1: string;
  colorBar2?: string;
  colorBar3?: string;
  colorBar4?: string;
  colorBar5?: string;
  tipo1: string;
  tipo2?: string;
  tipo3?: string;
  tipo4?: string;
  tipo5?: string;
  data: Array<DataBarraChartType>;
}

export const BarraChart: React.FC<BarraChartProps> = (props) => (
  <Container className="grid p-2">
    <div className="w-full title-responsive">
      <label htmlFor="">{props.label}</label>
    </div>
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {props.isExoY ? <YAxis tickFormatter={(value) => value.toFixed(2)} /> : ""}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                let v:any=0;
                if(payload[0]?.value){
                  v=payload[0]?.value;
                }
                return (
                  <div className="bg-white p-1">
                    <p>{`${payload[0].name}`}</p>
                    <p className="font-bold" style={{color:props.colorBar1}}>{`R$ ${v.toFixed(2)}`}</p>
                  </div>
                );
              }

              return null;
            }}
          />
          {props.isLegend ? <Legend /> : ""}
          <Bar dataKey="value1" fill={props.colorBar1} name={props.tipo1} />
          {props.tipo2 ? <Bar dataKey="value2" fill={props.colorBar2} name={props.tipo2} /> : ""}
          {props.tipo3 ? <Bar dataKey="value2" fill={props.colorBar3} name={props.tipo3} /> : ""}
          {props.tipo4 ? <Bar dataKey="value2" fill={props.colorBar4} name={props.tipo4} /> : ""}
          {props.tipo5 ? <Bar dataKey="value2" fill={props.colorBar5} name={props.tipo5} /> : ""}
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Container>
);
