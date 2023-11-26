import * as React from 'react';
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
    Stack
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

import { pushHistory } from '../../redux/reducers/navReducer';

import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';

const HistoryListCard = ({ workout }) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const formatDayAndMonthFinnish = (objDate) => {
        const locale = "fi-fi"
        const month = objDate.toLocaleString(locale, { month: "long" }) + "ta"
        return objDate.getDate() + ". " + month
    }

    const countSets = (sets) => {
        let count = 0
        sets.forEach(set => {
            if (!set.warmup) {
                count = count + 1
            }
        })
        return count
    }

    const handleClick = () => {
        dispatch(pushHistory(`history/${workout.id}`))
    }

    return (
        <Card sx={{ width: 1, maxWidth: 600, border: '1px solid #878787' }} >
            <CardActionArea component={Link} to={`/history/${workout.id}`} onClick={handleClick}>
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
                    <Typography sx={{ mb: 0.5 }} color="text.secondary" textAlign={'center'} noWrap >
                        {formatDayAndMonthFinnish(new Date(workout.createdAt))} {/* {new Date(workout.createdAt).toLocaleDateString()} */}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" noWrap >
                        {workout.title}
                    </Typography>
                    <Stack>
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
    );
}

export default HistoryListCard