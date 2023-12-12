import { Button, Box, useMediaQuery } from "@mui/material"

const FormButtons = ({ onCancel }) => {

    const isSmallScreen = useMediaQuery('(max-width:900px)')

    return (
        <>
            {isSmallScreen &&
                <Box paddingTop={4}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    >
                        Submit
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onCancel}> Cancel </Button>
                </Box>
            }
            {!isSmallScreen &&
                <Box display={'flex'} flexDirection={'row'} gap={2} justifyContent={'right'} paddingTop={4}>
                    <Box width={300} />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onCancel}> Cancel </Button>
                </Box>
            }
        </>
    )
}

export default FormButtons