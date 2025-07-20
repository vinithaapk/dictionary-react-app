import React from 'react';
import { 
  createTheme, 
  MenuItem, 
  TextField, 
  ThemeProvider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Search as SearchIcon, Translate as TranslateIcon } from '@mui/icons-material';
import "./header.css";
import categories from '../../data/category';

const Header = ({ setCategory, category, word, setWord, darkMode }) => {
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? '#90caf9' : '#1976d2',
            },
            background: {
                paper: darkMode ? '#1e1e1e' : '#fff',
                default: darkMode ? '#121212' : '#fff',
            },
        },
        typography: {
            fontFamily: "'Poppins', sans-serif",
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& fieldset': {
                            borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                        },
                    },
                },
            },
        },
    });

    const handleChange = (newCategory) => {
        setCategory(newCategory);
        setWord("");
    };

    return (
        <div className='header'>
            <div className='title-container'>
                <h1 className='title'>{word ? word : "Dictionary"}</h1>
                {word && <div className="title-underline" />}
            </div>
            
            <div className='inputs'>
                <ThemeProvider theme={theme}>
                    <TextField
                        className='search'
                        label="Search a word"
                        value={word}
                        variant="outlined"
                        onChange={(e) => setWord(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    
                    <TextField
                        className="select"
                        select
                        label="Language"
                        value={category}
                        variant="outlined"
                        onChange={(e) => handleChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TranslateIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    >
                        {categories.map((option) => (
                            <MenuItem
                                key={option.label}
                                value={option.label}
                            >
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default Header;
