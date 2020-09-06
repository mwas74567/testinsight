import React from 'react';
import { Chart } from "react-google-charts";


const styles = {

}

const SupervisorAgentAnalytics = () => {

   
    return (
        <>
    <div style={{ display: 'flex', maxWidth: 900 }}></div>
           <Chart
    width={800}
    height={500}
    chartType="ColumnChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Sales', '2010 Sales', '2000 Sales'],
      ['Agent 1', 8175000, 8008000],
      ['Agent 2', 3792000, 3694000],
      ['Agent 3', 2695000, 2896000],
      ['Agent 4', 2099000, 1953000],
      ['Agent 5', 1526000, 1517000],
    ]}
    options={{
      title: 'Sales VS Agents',
      chartArea: { width: '30%' },
      hAxis: {
        title: 'Agents',
        minValue: 0,
      },
      vAxis: {
        title: 'Sales',
      },
    }}
    legendToggle
  />
        </>
    )
}


export default(SupervisorAgentAnalytics);
