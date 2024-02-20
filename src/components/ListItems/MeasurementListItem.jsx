import { useSelector } from "react-redux"
import { ListItem, ListItemButton, ListItemText, List, Typography } from "@mui/material"
import { toCamelCase } from '../../utils/toCamelCase'

const MeasurementsListItem = ({ measurement, handleListClick, unit }) => {

    const measurementEntries = useSelector(state =>
        state.measurements.entries[toCamelCase(measurement.name)]
    )

    return (
        <ListItem key={measurement.name} disableGutters disablePadding >
            <ListItemButton
                onClick={() => handleListClick(measurement.id)}
                sx={{ paddingX: { xs: 2, sm: 3 } }}
            >
                <ListItemText primary={measurement.name} />
                <ListItemText
                    secondary={
                        <Typography textAlign={'right'} variant="body2" color="text.secondary">
                            {`${measurementEntries?.length === 0 ?
                                "No entries" :
                                measurementEntries[measurementEntries.length - 1].value} 
                            ${measurementEntries?.length === 0 ? "" : unit}`}
                        </Typography>
                    }
                />
            </ListItemButton>
        </ListItem>
    )
}

export default MeasurementsListItem