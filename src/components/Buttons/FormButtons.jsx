import { Button, Box, useMediaQuery } from "@mui/material"

const FormButtons = ({ onCancel, confirmButtonText, cancelButtonText }) => {

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
                        {confirmButtonText ? confirmButtonText : "Submit"}
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onCancel}>
                        {cancelButtonText ? cancelButtonText : "Cancel"}
                    </Button>
                </Box>
            }
            {!isSmallScreen &&
                <Box display={'flex'} flexDirection={'row'} gap={2} justifyContent={'right'} paddingTop={4}>
                    <Box width={300} />
                    <Button variant="outlined" fullWidth onClick={onCancel}>
                        {cancelButtonText ? cancelButtonText : "Cancel"}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        {confirmButtonText ? confirmButtonText : "Submit"}
                    </Button>

                </Box>
            }
        </>
    )
}

export default FormButtons