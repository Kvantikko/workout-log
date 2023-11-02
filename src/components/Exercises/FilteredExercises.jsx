import { Stack, TextField, Divider, Box } from '@mui/material'
import ExerciseListItem from './ExerciseListItem'


const FilteredExercises = ({ exercises }) => {

    // addind <div>'s made sx margin work
    return (
        <div>

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
                spacing={2}
                sx={{ marginTop: 2, padding: 2, width: "1", overflow: "hidden" }}
                justifyContent="space-between"
                alignItems="center"

            >
                {exercises.length === 0 && <h3>No exercises found.</h3>}
                {exercises.map(exercise =>
                    <ExerciseListItem key={exercise.id} exercise={exercise} />
                )}
            </Stack>
        </div>
    )
}

export default FilteredExercises