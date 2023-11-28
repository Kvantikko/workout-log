import { Stack, TextField, Divider, Box, Typography } from '@mui/material'
import ExerciseListItem from './ExerciseListItem'
import { ListItem, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'



const FilteredExercises = ({ exercises }) => {

    // use List instead of Stack?
    return (

        <Stack
            spacing={0}
            sx={{
                marginTop: 2,
                paddingX: { xs: 0, sm: 2, md: 4 },
                //overflow: "hidden",
                //textOverflow: 'ellipsis',
               // width: 1,
            }}



        >
            {exercises.length === 0 && <Typography variant='h6'>No exercises found &#129300;</Typography>}
            {exercises.map(exercise =>
                <Box sx={{
                    //overflow: "hidden",
                    //textOverflow: 'ellipsis',
                   // width: 1,
                    width: 0,
                    minWidth: 1 //{ xs: '100%', sm: '80%', md: '60%'}
                }} >
                    <ListItem key={exercise.id} disablePadding>
                        <ListItemButton component={Link} to={`/exercises/${exercise.id}`} onClick={() => console.log("dad")}>
                            <Typography paddingY={0.75} noWrap>
                                {exercise.name}

                            </Typography>
                            {/*  <ExerciseListItem key={exercise.id} exercise={exercise} /> */}
                        </ListItemButton>
                       {/*  <div>dadwadaw</div> */}
                    </ListItem>
                    <Divider></Divider>
                </Box>
            )}
        </Stack>
    )
}

export default FilteredExercises