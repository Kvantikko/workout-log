import { Delete, Edit } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemText, List, Typography, Divider, Button, Box, IconButton, Stack } from "@mui/material"
import { formatDateTime, formatDate } from "../../utils/date"
import { formatUnit } from "../../utils/formatUnit"


const MeasurementEntryListItem = ({ entry, handleDelete, handleUpdate }) => {

    return (
        <>
            <ListItem disableGutters disablePadding >
           {/*      <Stack direction={'row'} justifyContent={'space-evenly'}> */}
                    <ListItemText primary={`${entry.value}`}  /* ${formatUnit(entry.unit)} */ />
                    <ListItemText
                        // secondaryTypographyProps={}
                        //sx={{ paddingRight: 4 }}
                        secondary={
                            <Typography textAlign={'left'} variant="body2" color="text.secondary">
                                {formatDateTime(entry.createdAt)}
                            </Typography>
                        }
                    />
                    <Box>
                        <IconButton color="info" onClick={() => handleUpdate(entry.id, entry.value)}>
                            <Edit/>
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(entry.id)}>
                            <Delete/>
                        </IconButton>
                    </Box>
               {/*  </Stack> */}
            </ListItem>
            <Divider></Divider>
        </>

    )
}

export default MeasurementEntryListItem