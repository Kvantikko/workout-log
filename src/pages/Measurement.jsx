import { toCamelCase } from '../utils/ToCamelCase'

import { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { resetMeasurementsPath } from '../redux/reducers/navReducer'
import { deleteMeasurementValue, saveMeasurementValue, updateMeasurementValue } from '../redux/reducers/measurementsReducer'

import { AppBar, Typography, Box, CircularProgress, Button } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import BasicToolbar from '../components/Toolbars/BasicToolbar'
import FormModal from '../components/Modals/FormModal'
import MeasurementForm from '../components/Forms/MeasuremetnForm'
import HideAppBar from '../components/AppBar/HideAppBar'
import MeasurementEntryList from '../components/Lists/MeasurmentEntryList'
import MeasurementChart from '../components/Charts/MeasurementChart'
import BasicModal from '../components/Modals/BasicModal'

const Measurement = ({ measurement, drawerWidth }) => {

    console.log("Rendering measurement ", measurement);

    /* const history = useSelector(state => state.history)
    const user = useSelector(state => state.user) */
    //const [workoutExercises, setworkoutExercises] = useState([])
    const [loading, setLoading] = useState(false)
    const isSmallScreen = useMediaQuery('(min-width:900px)')
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)

    const measurementEntries = useSelector(state =>
        state.measurements.entries[toCamelCase(measurement.name)]
    )

    const dates = measurementEntries?.map(entry => new Date(entry.createdAt))

    const ref = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)


    const dispatch = useDispatch()

    const handleCreate = () => {
        setOpenCreateModal(true)
    }

    const handleDeleteClick = (valueId) => {
        setOpenDeleteModal(true)
        ref.current = valueId
    }

    const handleUpdateClick = (valueId, prevValue) => {
        setOpenUpdateModal(true)
        ref2.current = valueId
        ref3.current = prevValue
    }

    const handleDelete = () => {
        setOpenDeleteModal(false)
        dispatch(deleteMeasurementValue(ref.current, measurement.name))
    }

    const handleSubmit = (value) => {
        setOpenCreateModal(false)
        dispatch(saveMeasurementValue(measurement.id, value))
    }

    const handleEdit = (value) => {
        setOpenUpdateModal(false)
        dispatch(updateMeasurementValue(ref2.current, measurement.name, value))
    }




    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <BasicToolbar
                    title={measurement.name}
                    showBack={true}
                    link={"/measure"}
                    backFunction={() => dispatch(resetMeasurementsPath())}
                >
                    {isSmallScreen ?
                        <Button
                            sx={{ height: 0.1, alignSelf: "center" }}
                            variant="contained"
                            onClick={() => handleCreate()}

                        >
                            New entry
                        </Button>
                        :
                        null
                    }

                </BasicToolbar>
            </HideAppBar>

            <div>

                {loading ?
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="75vh"
                        //minWidth="75vh"
                        padding={4}
                    //maxWidth="75vw"
                    //sx={{ maxWidth: 600 }}
                    //minHeight="75vh"
                    >
                        <CircularProgress />
                    </Box>
                    :

                    < div >
                        {(measurementEntries.length === 0) ?
                            <Box
                                display="flex"
                                flexDirection="column"
                                //justifyContent="center"
                                alignItems="center"
                                minHeight="75vh"
                                //minWidth="75vh"
                                padding={4}
                            //maxWidth="75vw"
                            //sx={{ maxWidth: 600 }}
                            //minHeight="75vh"
                            >
                                <Typography variant='h6' textAlign={"center"}>
                                    No entries yet for {new String(measurement.name).toLowerCase()} &#128586;
                                </Typography>
                                {isSmallScreen &&
                                    < Button
                                        variant='text'
                                        sx={{ margin: 3 }}
                                        onClick={() => setOpenCreateModal(true)}
                                        fullWidth
                                    >
                                        Create entry
                                    </Button>
                                }

                            </Box>
                            :
                            <>
                                <MeasurementChart measurement={measurement} />
                                <Box paddingY={{ xs: 2, md: 5 }} paddingX={{ xs: 2, sm: 4, md: 6 }}  >
                                    <MeasurementEntryList
                                        measurement={measurement}
                                        entries={measurementEntries}
                                        handleDelete={handleDeleteClick}
                                        handleUpdate={handleUpdateClick}
                                    />
                                </Box>
                            </>
                        }






                    </div>
                }
            </div >

            <AppBar
                position="fixed"
                color=""
                elevation={0}
                sx={{
                    top: 'auto',
                    // bottom: theme => theme.isSmallScreen ? 0 : 56,
                    bottom: isSmallScreen ? 0 : 56,
                    padding: 2,
                    paddingBottom: 2,
                    //width: isSmallScreen ? `calc(100% - ${drawerWidth}px)` :   '100%',
                    display: { xs: 'flex', md: 'none' },
                }}
            >
                <Button variant="contained" onClick={handleCreate} >
                    New entry
                </Button>
                {openCreateModal &&
                    <FormModal
                        open={openCreateModal}
                        onClose={() => setOpenCreateModal(false)}
                        title={`Create new ${new String(measurement.name).toLowerCase()} entry`}
                    >
                        <MeasurementForm
                            onSubmit={handleSubmit}
                            onCancel={() => setOpenCreateModal(false)}
                            measurement={measurement}
                        />
                    </FormModal>
                }

                {/* <BasicModal
                    open={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    title={`Create new ${new String(measurement.name).toLowerCase()} entry`}
                    confirmButtonText={"Save"}
                    onSubmit={() => copy()}
                >
                    
                </BasicModal> */}
            </AppBar>

            {openDeleteModal &&
                <BasicModal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete entry?"
                    subTitle={`Are you sure you want to delete the ${new String(measurement.name).toLowerCase()}
                    entry? This action cannot be undone.`}
                    onSubmit={handleDelete}
                    confirmButtonText="Delete"
                    confirmButtonColor="error"
                />
            }
            {openUpdateModal &&
                <FormModal
                    confirmButtonText="Save"
                    open={openUpdateModal}
                    onClose={() => setOpenUpdateModal(false)}
                    title={`Edit ${new String(measurement.name).toLowerCase()} entry`}
                >
                    <MeasurementForm
                        onSubmit={handleEdit}
                        onCancel={() => setOpenUpdateModal(false)}
                        measurement={measurement}
                        entryValue={ref3.current}
                    />
                </FormModal>
            }
        </>
    )
}

export default Measurement