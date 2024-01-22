import { List, Stack, ListItem, Divider, ListItemText, Box, IconButton, Typography, Button } from "@mui/material"
import MeasurementsListItem from "../ListItems/MeasurementListItem"
import MeasurementEntryListItem from "../ListItems/MeasurementEntryListItem"

import { formatUnit } from "../../utils/FormatUnit"

const MeasurementEntryList = ({ entries, measurement, handleUpdate, handleDelete }) => {

    return (
        <>
            <ListItem disableGutters disablePadding sx={{ marginBottom: 2 }}>
                <ListItemText secondary={new String(formatUnit(measurement.unit)).toUpperCase()} />
                <ListItemText secondary={"DATE"} />
                <Box sx={{ width: 100 }}>
                   {/*  <Button color="error" >Delete all</Button> */}
                </Box>
            </ListItem>
         {/*    <Divider sx={{ marginTop: 2 }}></Divider>*/}

            {entries.map((entry, index) =>
                <MeasurementEntryListItem
                    key={entry.id}
                    entry={entry}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            )}
        </>
    )
}

export default MeasurementEntryList