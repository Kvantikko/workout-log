import { Button, Container, Stack, Box, Typography, Divider } from "@mui/material"

import HideAppBar from "../components/AppBar/HideAppBar"
import BasicToolbar from "../components/Toolbars/BasicToolbar"
import MeasurementsList from "../components/Lists/MeasurmentsList"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setMeasurementsPath } from "../redux/reducers/navReducer"

const Measurements = ({ measurements }) => {

    //console.log("Rendering Measurements ");

    const coreMeasurements = measurements.slice(0, 3)
    const bodyParts = measurements.slice(3, measurements.length)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleListClick = (measurementId) => {
        navigate(`/measure/${measurementId}`)
        dispatch(setMeasurementsPath(`measure/${measurementId}`))
    }

    return (
        <>
            <HideAppBar >
                <BasicToolbar title={"Measure"} />
            </HideAppBar>

            <Box
                alignItems="center"
                minHeight="75vh"
                paddingY={3}
                //paddingX={{ xs: 0, sm: 2, md: 0, lg: 0, xl: 0 }}
            >
                <MeasurementsList
                    measurements={coreMeasurements}
                    title={"Core measurements"}
                    handleListClick={handleListClick}
                    unit={["kg", "%", "kcal"]}
                />
                <Divider sx={{ marginX: 2, marginTop: 1, marginBottom: 3 }} />
                <MeasurementsList
                    measurements={bodyParts}
                    title={"Body part measurements"}
                    handleListClick={handleListClick}
                    unit={["cm"]}
                />
            </Box>
        </>
    )
}

export default Measurements