import { Link } from 'react-router-dom'
import { Stack, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const BasicToolbar = ({ children, title, showBack, backFunction, link }) => {

    return (
        <>
            <Stack direction={"row"} spacing={1} overflow={'hidden'}>
                {showBack &&
                    <IconButton component={Link}  to={link} onClick={backFunction} >
                        <ArrowBackIcon />
                    </IconButton>
                }
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginLeft: 1 }}
                    alignSelf={'center'}
                    overflow={'hidden'}
                    noWrap
                    margin={0}
                >
                    {title}
                </Typography>
            </Stack>

            <Stack direction={"row"} spacing={2} alignSelf={'flex-start'} >
                {children}
            </Stack>
        </>
    )
}

export default BasicToolbar