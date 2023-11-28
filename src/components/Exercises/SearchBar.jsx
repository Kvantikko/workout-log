import React, { useState } from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Paper component="form" sx={{ display: 'flex', alignItems: 'center', maxWidth: 300 }}>
      {isExpanded && (
        <IconButton onClick={handleSearchClick} sx={{ padding: 1 }}>
          <SearchIcon />
        </IconButton>
      )}
      <InputBase
        placeholder="Search..."
        fullWidth
        onFocus={handleSearchClick}
        onBlur={handleSearchClick}
        sx={{
            ml: isExpanded ? 1 : -1,
            flexGrow: isExpanded ? 1 : 0,
            backgroundColor: 'red',
            color: 'red'
        }}
      />
    </Paper>
  );
};

export default SearchBar;
