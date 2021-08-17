import { createTheme, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react'
import "./header.css";
import categories from '../../data/category';

const header = ({setCategory, category , word, setWord, LightTheme}) => {

    const darkTheme = createTheme({
        palette: {
            primary:{
                main:LightTheme?"#fff" : '#fff'
            },
          type: LightTheme?"dark":'dark',
        },
      });

      const handleChange = (e) => {
        setCategory(e);
        setWord("");
        //setMeanings([]);
      };
    
        
    
    return (
        <div className='header'>
            <span className='title'> {word ? word : "Dictionary"} </span>
            <div className='inputs'>
                <ThemeProvider theme={ darkTheme }>
                    <TextField 
                        className = 'search' 
                        label = "Search a word"
                        value={word} 
                        onChange={(e)=>setWord(e.target.value)}> 
                    </TextField>
                    <TextField
                            className="select"
                            select 
                            label="Language"
                            value = {category}
                            onChange = {(e)=>handleChange(e.target.value)}
                            >
                                {
                                    categories.map((option) => (
                                         <MenuItem key={option.label} value={option.label}>{ option.value }</MenuItem>
                                    ))
                                }
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default header;
