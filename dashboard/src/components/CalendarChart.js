import React from 'react';
import { Chart } from "react-google-charts";

const CalendarChart = React.forwardRef((props, ref) => {
  const {
    data,
    onClick,
    title,
  } = props;

  return(
    <Chart
      width={1000}
      height={350}
      chartType="Calendar"
      loader={<div>Loading Chart</div>}
      data={data}
      chartEvents={[
        {
          eventName: "select",
          callback({ chartWrapper }) {
            const index = chartWrapper.getChart().getSelection()[0].row;
            onClick(index)
          }
        }
      ]}
      options={{ title: title }}
      rootProps={{ 'data-testid': '1' }}
    />
  )
})

CalendarChart.displayName = 'CalendarChart';
export default CalendarChart;
