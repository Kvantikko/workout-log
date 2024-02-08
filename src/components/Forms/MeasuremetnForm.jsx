import BODY_PARTS from "../../utils/Bodyparts"
import { useState } from "react"
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    Stack,
    Box,
    MenuItem,
    Button,
    FormHelperText,
    Typography
} from "@mui/material";

import { useDispatch } from "react-redux"
import FormButtons from "../Buttons/FormButtons"

import { formatUnit } from "../../utils/FormatUnit"


const MeasurementForm = ({ measurement, entryValue, onSubmit, onCancel }) => {

    const [value, setValue] = useState(entryValue ? entryValue : "")

    const handleChange = (event) => {
        event.preventDefault()
        setTargetMuscle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={1}>
                    <TextField
                        id={`${measurement.name}Value`}
                        label={`${measurement.name} value`}
                        fullWidth
                        autoComplete="off"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        inputProps={{ min: 0 }}
                        onKeyDown={(event) => {
                            if (event?.key === '-' ||
                                event?.key === '+' ||
                                event?.key === '.' ||
                                event?.key === 'e' ||
                                event?.key === 'E') {
                                event.preventDefault();
                            }
                        }}
                    />
                    <Typography width={"fit-content"} alignSelf={'center'} >{formatUnit(measurement.unit)}</Typography>
                </Stack>

            </Stack>

            <FormButtons onCancel={onCancel} confirmButtonText="Save" />

        </form>
    )
}

export default MeasurementForm

