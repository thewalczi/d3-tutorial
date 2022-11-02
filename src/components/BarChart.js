import React from 'react'
import {scaleBand, scaleLinear, max, format} from 'd3'
import { useData } from '../hooks/useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'

const WIDTH = 960
const HEIGHT = 500
const MARGIN = {top: 20, right: 30, bottom: 60, left: 220}

const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom
const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right
const XAXIS_LABEL_OFFSET = 50

const siFormat = format(".2s")

const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B')


export const BarChart = () => {
  const data = useData();

  const yValue = d => d.Country
  const xValue = d => d.Population
  
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, INNER_HEIGHT])
    .padding(0.1);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, INNER_WIDTH])

  if (!data) {
    return <pre>Loading...</pre>
  }

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        <AxisBottom 
          xScale={xScale} 
          innerHeight={INNER_HEIGHT} 
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft 
          yScale={yScale}
        />
        <text 
          className="axis-label" 
          x={INNER_WIDTH / 2} 
          y={INNER_HEIGHT + XAXIS_LABEL_OFFSET} 
          text-anchor="middle"
        >
            Population
          </text>
        <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  )
}
