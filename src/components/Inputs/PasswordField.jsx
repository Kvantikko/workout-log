import { TextField, IconButton, InputAdornment } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const PasswordField = ({ id, showPassword, label, onClick, onVisibilityClick, onChange, error, helperText }) => {

    return (
        <TextField
            id={id}
            type={showPassword ? "text" : "password"}
            label={label}
            size="small"
            onChange={onChange}
            onClick={(event) => onClick(event.target.id)}
            error={error}
            helperText={helperText}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={onVisibilityClick}
                        //onMouseDown={handleClickShowPassword}
                        >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default PasswordField