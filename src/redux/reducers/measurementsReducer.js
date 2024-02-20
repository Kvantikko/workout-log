import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import measurementService from '../../services/measurements'
import { toCamelCase } from '../../utils/toCamelCase'
import { logout } from "./userReducer"

const initialState = {
    names: [],
    entries: {
        weight: [],
        bodyfat: [],
        calories: [],
        neck: [],
        shoulders: [],
        chest: [],
        leftArm: [],
        rightArm: [],
        leftForearm: [],
        rightForearm: [],
        waist: [],
        leftThigh: [],
        rightThigh: [],
        leftCalf: [],
        rightCalf: [],
    }
}

const measurementsSlice = createSlice({
    name: 'measurements',
    initialState,
    reducers: {
        setMeasurements(state, action) {
            state.names = action.payload //.names
            return state
        },
        setMeasurementValues(state, action) {
            const values = action.payload

            for (const [key, value] of Object.entries(state.entries)) {
                values.forEach(value => {
                    if (key === toCamelCase(value.measurement.name)) {
                        //delete value.measurement
                        const obj = {
                            id: value.id,
                            value: value.value,
                            createdAt: value.createdAt,
                            unit: value.measurement.unit
                        }
                        state.entries[key].push(obj)
                    }
                })
            }

            return state
        },
        addEntry(state, action) {
            state.entries[toCamelCase(action.payload.name)].push(action.payload)
            return state
        },
        updateEntry(state, action) {

            const index = state.entries[toCamelCase(action.payload.measurementName)]
                .findIndex(value => value.id === action.payload.measurementValueId)

            state.entries[toCamelCase(action.payload.measurementName)][index] = action.payload.newValue
            return state
        },
        removeEntry(state, action) {
            const index = state.entries[toCamelCase(action.payload.measurementName)]
                .findIndex(value => value.id === action.payload.measurementValueId)

            state.entries[toCamelCase(action.payload.measurementName)].splice(index, 1)
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    },
});

export const {
    setMeasurements,
    setMeasurementValues,
    addEntry,
    updateEntry,
    removeEntry
} = measurementsSlice.actions;

export default measurementsSlice.reducer

export const saveMeasurementValue = (measurementId, value) => {
    return async (dispatch, getState) => {
        let response
        try {
            response = await measurementService.createNewValue(getState().user.email, measurementId, value)
            dispatch(addEntry(response))
        } catch (error) {
            throw new Error(error)
            toast.error(error)
        }
    }
}

export const updateMeasurementValue = (measurementValueId, measurementName, value) => {
    return async (dispatch, getState) => {
        let response
        try {
            response = await measurementService.updateValue(measurementValueId, value)
            dispatch(updateEntry({ measurementValueId, measurementName, newValue: response }))
        } catch (error) {
            throw new Error(error)
            toast.error(error)
        }
    }
}

export const deleteMeasurementValue = (measurementValueId, measurementName) => {
    return async (dispatch, getState) => {
        let response
        try {
            response = await measurementService.removeValue(measurementValueId)
            dispatch(removeEntry({ measurementValueId, measurementName }))
        } catch (error) {
            throw new Error(error)
            toast.error(error)
        }
    }
}