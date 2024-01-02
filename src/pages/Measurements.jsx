import { Button, Container, Stack, Box, Typography, Divider } from "@mui/material"

import HideAppBar from "../components/AppBar/HideAppBar"
import BasicToolbar from "../components/Toolbars/BasicToolbar"
import MeasurementsList from "../components/Lists/MeasurmentsList"
import { useNavigate } from "react-router-dom"

const Measurements = ({ user, drawerWidth }) => {

    const bodyParts = [
        { name: "Neck", value: 12 },
        { name: "Shoulders", value: null },
        { name: "Chest", value: null },
        { name: "Left arm", value: null },
        { name: "Right arm", value: null },
        { name: "Left forearm", value: null },
        { name: "Rigth forearm", value: null },
        { name: "Waist", value: null },
        { name: "Left thigh", value: null },
        { name: "Right thigh", value: null },
        { name: "Left calf", value: null },
        { name: "Right calf", value: null },
    ]

    const coreMeasurements = [
        { name: "Weigth", value: 12 },
        { name: "Body fat percentage", value: null },
        { name: "Caloric intake", value: null },
    ]

    const navigate = useNavigate()

    const handleListClick = (measurementId) => {
        navigate(`/measure/${measurementId}`)
    }

    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <BasicToolbar title={"Measure"} />
            </HideAppBar>

            <Box
                alignItems="center"
                minHeight="75vh"
                paddingY={3}
            >
                <MeasurementsList
                    measurements={coreMeasurements}
                    title={"Core measurements"}
                    handleListClick={handleListClick}
                />
                <Divider sx={{ marginX: 2, marginTop: 1, marginBottom: 3 }} />
                <MeasurementsList
                    measurements={bodyParts}
                    title={"Body part measurements"}
                    handleListClick={handleListClick}
                />
            </Box>
        </>
    )
}

export default Measurements