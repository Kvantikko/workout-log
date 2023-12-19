import { Box, Button, Stack, TextField, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState, useRef, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CancelIcon from '@mui/icons-material/Cancel'
import ClearIcon from '@mui/icons-material/Clear';
import FormModal from '../Modals/FormModal';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';

import { setSearch } from '../../redux/reducers/searchReducer';



const SearchInput = ({ exercises, setVisibleExercises, placeholder }) => {
    console.log("Rendering ExerciseToolbar ");

    // const searchState = useSelector(state => state.search)



    //const [showFullWidthSearch, setShowFullWidthSearch] = useState(searchState.showFullWidth)

    const [input, setInput] = useState('')

    useEffect(() => {
        let filteredExercises = exercises?.filter(
            e => e.name.toLowerCase().includes(input.toLowerCase())
        )
        setVisibleExercises(filteredExercises)
        //dispatch(setSearchExercises(filteredExercises))
    }, [input, exercises])


    const handleChange = (value) => {
        setInput(value)
    }


    //const isSmallScreen = useMediaQuery('(max-width:700px)');

    const inputRef = useRef(null);

    //const dispatch = useDispatch()

    /*  useEffect(() => {
         setInput(searchState.searchString)
         setShowFullWidthSearch(searchState.showFullWidth)
     }, []) */

    /*  const handleSearchClick = (event) => {
         setShowFullWidthSearch(true)
     } */

    /*    const handleClick = () => {
           if (isSmallScreen) {
   
           }
           setShowFullWidthSearch(false)
           setInput('')
           dispatch(
               setSearch({
                   searchString: '',
                   showFullWidth: false
               })
           )
       } */

    /*  const handleBlur = () => {
  
         dispatch(
             setSearch({
                 searchString: input,
                 showFullWidth: showFullWidthSearch
             })
         )
     }
  */
    /*     const handleClear = (event) => {
            inputRef.current.focus()
        }
     */
      const handleMouseDown = (event) => {
            event.preventDefault()
            setInput('')
            inputRef.current.focus()
        }



    return (
        <TextField
            //label="Search field"
            autoComplete="off"
            ref={inputRef}
            size='small'
            type="text"
            variant="outlined"
            placeholder={placeholder}
            autoFocus
            value={input}
            onChange={(event) => handleChange(event.target.value)}
            //onFocus={() => console.log("FOCUSED")}
            //onBlur={handleBlur}
            //onClick={() => console.log("clicked textf")}
            //onMouseDown={() => console.log("mousse down textf")}
            fullWidth
            sx={{
                paddingY: { xs: 1, sm: 2,},
                //paddingRight: { xs: 2, sm: 5,},
            }}
            //width={1000}


            //InputProps={{ sx: { borderRadius: 0 } }}
            InputProps={{
                sx: {
                    //backgroundColor: '#3a88d6',
                    input: {
                        //color: 'white',
                        //backgroundColor: '#42a1f5'
                    }
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: input && (
                    <IconButton
                        onClick={() => console.log("clicked clear button")}
                        onMouseDown={handleMouseDown}
                        color='white'
                    >
                        <ClearIcon sx={{ color: 'white' }} />
                    </IconButton>
                )
            }}
        />

    )
}

export default SearchInput