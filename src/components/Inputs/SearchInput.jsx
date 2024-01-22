import { useState, useRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../../redux/reducers/exerciseLibraryReducer'

import { TextField, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import useMediaQuery from '@mui/material/useMediaQuery'

const SearchInput = () => {

    const [input, setInput] = useState(useSelector(state => state.exerciseLibrary.search.searchString))

    const dispatch = useDispatch()
    const inputRef = useRef(null)

    useEffect(() => {
        dispatch(setSearch({ searchString: input }))
    }, [input])

    const handleChange = (value) => {
        setInput(value)
    }

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
            placeholder='Search exercises'
            autoFocus
            value={input}
            onChange={(event) => handleChange(event.target.value)}
            //onFocus={() => console.log("FOCUSED")}
            //onBlur={handleBlur}
            //onClick={() => console.log("clicked textf")}
            //onMouseDown={() => console.log("mousse down textf")}
            fullWidth
            sx={{
                //paddingY: { xs: 1, sm: 2, },
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