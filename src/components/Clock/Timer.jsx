import { useSelector } from "react-redux"
import { Typography } from "@mui/material"

const Timer = ({ isRestTimer, size }) => {

    const time = isRestTimer ?
        useSelector(state => state.stopWatch.restWatch.time) :
        useSelector(state => state.stopWatch.workoutWatch.time)

    return (
        <Typography variant={size} textAlign={'center'} padding={0} margin={0}>
            <span className="digits">
                {("0" + Math.floor(((time) / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor(((time) / 1000) % 60)).slice(-2)}
            </span>
            {/*  <span className="digits mili-sec">
                {("0" + ((props.time / 10) % 100)).slice(-2)}
            </span> */}
        </Typography>
    )
}

export default Timer