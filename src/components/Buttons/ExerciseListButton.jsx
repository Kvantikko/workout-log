import {
    Box, ListItemButton, Typography, Divider, Fade,
    Zoom,
    Grow
} from "@mui/material"
import { useState } from "react"
import DoneIcon from "@mui/icons-material/Done"

const ExerciseListButton = ({ exercise, handleListClick }) => {

    //const [selected, setSelected] = useState(false)

    const handleClick = () => {
        /*   if (selected) {
              setSelected(false)
          } else {
              setSelected(true)
          } */

   

        handleListClick(exercise)
    }

    return (
        <Fade in={true}>
            <Box /*  <ListItem disablePadding /> */
                key={exercise.id}
                sx={{
                    //overflow: "hidden",
                    //textOverflow: 'ellipsis',
                    // width: 1,
                    width: 0,
                    minWidth: 1 //{ xs: '100%', sm: '80%', md: '60%'}
                }}
            >
                <ListItemButton
                    //component={Link}
                    //to={`/exercises/${exercise.id}`}
                    onClick={handleClick}
                //selected={selected}
                //sx={{ justifyContent: 'space-between' }}
                >
                    <Typography paddingY={0.75} noWrap>
                        {exercise.name}
                    </Typography>
                    {/*   {selected && <DoneIcon />} */}
                </ListItemButton>
                <Divider></Divider>
            </Box>
        </Fade>
    )

}

export default ExerciseListButton