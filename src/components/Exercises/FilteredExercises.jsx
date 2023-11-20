import { Stack, TextField, Divider, Box, Typography } from '@mui/material'
import ExerciseListItem from './ExerciseListItem'


const FilteredExercises = ({ exercises }) => {

    // addind <div>'s made sx margin work
    return (
        <Box
            display="flex"
            flexDirection="column"
            //justifyContent="center"
            alignItems="center"
            //minHeight="75vh"
            //minWidth="75vh"
            //padding={4}
        >

            {/*  <List>
                {exercises.map((exercise, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={ReactRouterLink} to={`/${text.toLowerCase()}`} onClick={() => setPage(text)}>
                            <ListItemIcon>
                                {index === 0 && <FitnessCenterIcon />}
                                {index === 1 && <HistoryIcon />}
                                {index === 2 && <FormatListBulletedIcon />}
                                {index === 3 && <StraightenIcon />}
                                {index === 4 && <PersonIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
            <Stack
                spacing={1.75}
                sx={{
                    marginTop: 2,
                    padding: 2, width: "1",
                    overflow: "hidden",
                    //maxWidth: '90vw', suuremmissa ruuduissa
                }}
                justifyContent="space-between"
                alignItems="center"

            >
                {exercises.length === 0 && <Typography variant='h6'>No exercises found &#129300;</Typography>}
                {exercises.map(exercise =>
                    <ExerciseListItem key={exercise.id} exercise={exercise} />
                )}
            </Stack>
        </Box>
    )
}

export default FilteredExercises