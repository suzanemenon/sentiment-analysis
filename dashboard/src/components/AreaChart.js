import React from 'react';
import { Chart } from "react-google-charts";

const AreaChart = React.forwardRef((props, ref) => {
  const {
    data,
    positiveComments,
    negativeComments,
    onClick,
    title,
  } = props;

  return(
    <Chart
      width={1000}
      height={'300px'}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: title,
        hAxis: { title: '', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        chartArea: { width: '50%', height: '70%' },
      }}
      chartEvents={[
        {
          eventName: 'select',
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart()
            const selection = chart.getSelection()
            if (selection.length === 1) {
              const [selectedItem] = selection
              // const dataTable = chartWrapper.getDataTable()
              const { row, column } = selectedItem
              const date = data[row + 1][0]
              // const count = dataTable.getValue(row, column)
              
              let filteredComments = []
              if(column === 1) {
                filteredComments = positiveComments.filter((d) => d[0] === date.toString())[0]
              } else {
                filteredComments = negativeComments.filter((d) => d[0] === date.toString())[0]
              }
              onClick([column, filteredComments[1]])
            } 
          },
        },
      ]}
    />
  )
})

AreaChart.displayName = 'AreaChart';
export default AreaChart;
