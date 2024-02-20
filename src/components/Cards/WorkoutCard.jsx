import { memo } from 'react'

import { Link } from "react-router-dom"

import {
    CardActionArea,
    Typography,
    CardContent,
    Card,
    CardHeader,
    IconButton,
    CardMedia,
    CardActions,
    Button,
    Stack,
    Fade,
    Zoom,
    Grow
} from '@mui/material'

import { formatDayAndMonthFinnish } from '../../utils/date'

const WorkoutCard = ({ workout, showDate, onClickFunction, path }) => {
    //console.log("Rendering HistoryListCard ", workout.id, workout)

    const countSets = (sets) => {
        let count = 0
        sets.forEach(set => {
            if (!set.warmup) {
                count = count + 1
            }
        })
        return count
    }

    return (
            <Card
                sx={{
                    width: 1,
                    height: 1,
                    border: '1px solid #878787',
                }}
            >
                <CardActionArea component={Link} to={`/${path}/${workout.id}`}  onClick={(event) => onClickFunction(event, workout.id)} sx={{ height: 1 }} >
                    {/* <CardHeader
                    title={new Date(workout.createdAt).toLocaleDateString()}
                    titleTypographyProps={{ variant: 'body1', color: "text.secondary", noWrap: true, textAlign: 'center' }}
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                /> */}
                    <CardContent >
                        <Typography variant="h6" component="div" noWrap >
                            {workout.title}
                        </Typography>
                        {showDate &&
                            <Typography color="text.secondary" /* textAlign={'center'} */ noWrap >
                                {formatDayAndMonthFinnish(new Date(workout.createdAt))}
                            </Typography>

                        }

                        <Stack marginTop={1.5} sx={{ mT: 2 }}>
                            {workout.workoutExercises.map(wE =>
                                <Stack key={wE.id} direction={'row'} spacing={1} >
                                    <Typography variant="body2" color="text.secondary">{countSets(wE.sets)}</Typography>
                                    <Typography variant="body2" color="text.secondary">x</Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>{wE.name}</Typography>
                                </Stack>
                            )}
                        </Stack>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
                <Button size="small">Perform again</Button>
            </CardActions> */}
            </Card>
    )
}

export default memo(WorkoutCard)