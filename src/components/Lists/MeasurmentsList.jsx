import { List, Typography } from "@mui/material"
import MeasurementsListItem from "../ListItems/MeasurementListItem"

const MeasurementsList = ({ measurements, title, handleListClick, unit }) => {
    
    return (
        <>
            <Typography textAlign={'center'} paddingBottom={1}>
                {title}
            </Typography>

            {measurements.map((measurement, index) =>
                <MeasurementsListItem
                    key={measurement.name}
                    measurement={measurement}
                    handleListClick={handleListClick}
                    unit={unit.length === 1 ? unit[0] : unit[index] }
                />
            )}
        </>
    )
}

export default MeasurementsList