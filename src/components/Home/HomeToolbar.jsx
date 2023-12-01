import { Typography, Stack, Button } from "@mui/material"
import TimerIcon from '@mui/icons-material/Timer';
import { useDispatch, useSelector } from "react-redux";
import { startWatch } from "../../redux/reducers/stopWatchReducer";
import ModalRoot from "../Modals/ModalRoot";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { toast } from "react-toastify";

import { useState } from "react";
import ConfirmationModal from "../Modals/ConfirmationModal";

import { clearWorkout } from "../../redux/reducers/workoutReducer";
import { clearExercises } from "../../redux/reducers/exerciseReducer";
import { clearSets } from "../../redux/reducers/setReducer";
import { stopWatch } from "../../redux/reducers/stopWatchReducer";
import FormModal from "../Modals/FormModal";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const HomeToolbar = () => {
    console.log("Rendering HomeToolbar");

    return (
        <>
            <Typography variant="h6" >
                Home
            </Typography>
        </>
    )
}

export default HomeToolbar