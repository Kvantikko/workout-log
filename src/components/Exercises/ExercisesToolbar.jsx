import { Box, Button, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ModalRoot from '../Modals/ModalRoot';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    //width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        // maxWidth: '60%',
        // marginLeft: 20,
        //marginRight: 20
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: "green"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        //width: "100%",
        width: "18ch",
        "&:focus": {
            width: "35ch"
        },
        [theme.breakpoints.down("sm")]: {
            width: "0ch",
            "&:focus": {
                width: "15.3ch",
                maxWidth: '100%'
            }
        }
    },
    //backgroundColor: 'yellow'
}));

const ExercisesToolbar = ({ setInput, setOpen }) => {

    const [style, setStyle] = useState({})

    const handleFocus = (event) => {
        const width = event.target.offsetWidth

        console.log("window " , window.innerWidth);

        if (window.innerWidth < 600) {
            /* setStyle({
                textIndent: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }) */
        }
        // console.log("perse ", event.target.offsetWidth);
       
    }

    const stylee = {
        overflow: "hidden",
        //justifyContent: "left",
    }

    const style2 = {
        overflow: "hidden"
    }




    return (
        <>

            <Typography variant="h6" component="div" sx={stylee}>
                Exercises
            </Typography>

            <Stack direction={"row"} spacing={2} >
                <Search onClick={() => console.log()}  >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    {/*   <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="standard"
                    fullWidth
                /> */}
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(event) => setInput(event.target.value)}
                        //onFocus={(event) => handleFocus(event)}
                        //onBlur={(event) => setStyle({})}
                    />
                </Search>
                <Button variant="contained" onClick={() => setOpen(true)} sx={style2} >
                    <AddIcon />
                </Button>
            </Stack>

        </>
    )
}

export default ExercisesToolbar