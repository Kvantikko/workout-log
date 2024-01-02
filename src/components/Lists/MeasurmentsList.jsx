import { ListItem, ListItemButton, ListItemText, List, Typography } from "@mui/material"

const MeasurementsList = ({ measurements, title, handleListClick }) => {

    return (
        <>
            <Typography textAlign={'center'} paddingBottom={1}>
                {title}
            </Typography>

            {measurements.map((measurement, index) =>
                <ListItem key={measurement.name} disableGutters disablePadding >
                    <ListItemButton onClick={() => handleListClick(measurement.id)}  >
                        <ListItemText primary={measurement.name} />
                        <ListItemText
                            // secondaryTypographyProps={}
                            secondary={
                                <Typography textAlign={'right'} variant="body2" color="text.secondary">
                                    {`${measurement.value} ${measurement.unit}` }
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>

            )}
        </>
    )
}

export default MeasurementsList