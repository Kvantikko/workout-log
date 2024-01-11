import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { AppBar, Typography, Box, CircularProgress, Button } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LineChart } from '@mui/x-charts/LineChart'
import { axisClasses } from "@mui/x-charts"

import { formatDateTime } from '../../utils/Date'

const chartSetting = {
    /*  yAxis: [
         {
             label: "rainfall (mm)"
         }
     ], */
    /* width: 500,
    height: 300, */
    height: 300,
    sx: {
        margin: 1,
        /* [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "rotate(-90deg) translate(0px, -20px)",
            
        }, */
        [`.${axisClasses.root}`]: {
            height: 1000,
            margin: 1000
        },
        [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
            transform: "rotateZ(-30deg) translate(-10px, 10px)",

        }
    }
};

const MeasurementChart = ({ measurement }) => {

    console.log("Rendering MeasurementChart ", );

    const measurementEntries = useSelector(state =>
        state.measurements.entries[new String(measurement.name).toLowerCase()]
    )

    const dates = measurementEntries?.map(entry => new Date(entry.createdAt))

    return (
        <LineChart
            xAxis={[
                {
                    id: 'Dates',
                    scaleType: 'time',
                    //tickMaxStep: 10,
                    //tickLabelInterval: 10,
                    data: dates,
                    min: dates[0],
                    max: dates[dates.length - 1],
                    valueFormatter: (date) => {
                        return formatDateTime(date)
                    },
                },
            ]}
            series={[
                {
                    //curve: "linear",
                    data: measurementEntries?.map(entry => entry.value),
                },
            ]}
            {...chartSetting}
        />
    )
}

export default MeasurementChart