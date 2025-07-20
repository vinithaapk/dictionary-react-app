
import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, 
  Switch, 
  styled,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import Header from "./components/Header/header";
import Definitions from "./components/Definitions/Definitions";
import { grey } from "@mui/material/colors";

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Theme switch component
  const ThemeSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
      color: grey[100],
      '&.Mui-checked': {
        color: '#121212',
        '& + .MuiSwitch-track': {
          backgroundColor: '#121212',
        },
      },
    },
    '& .MuiSwitch-track': {
      backgroundColor: grey[300],
    },
  }));

  // Update theme in localStorage and apply system-wide
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  // Fetch word definitions
  useEffect(() => {
    const fetchDefinitions = async () => {
      try {
        if (!word.trim()) {
          setMeanings([]);
          return;
        }

        setLoading(true);
        setError(null);

        // Try the Free Dictionary API first
        try {
          const { data } = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/${category}/${encodeURIComponent(word.trim())}`
          );
          setMeanings(data);
          return;
        } catch (e) {
          // If Free Dictionary API fails, try LibreTranslate API
          try {
            const response = await axios.post('https://libretranslate.com/translate', {
              q: word.trim(),
              source: 'auto',
              target: category,
              format: 'text'
            });
            
            // Transform LibreTranslate response to match our format
            const transformedData = [{
              word: word.trim(),
              phonetics: [],
              meanings: [{
                partOfSpeech: 'translation',
                definitions: [{
                  definition: response.data.translatedText,
                  example: undefined,
                  synonyms: [],
                  antonyms: []
                }]
              }]
            }];
            
            setMeanings(transformedData);
          } catch (error) {
            throw new Error('No translation or definition found');
          }
        }
      } catch (error) {
        setError(error.message);
        setMeanings([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchDefinitions, 600);
    return () => clearTimeout(debounceTimer);
  }, [word, category]);

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <Container maxWidth="lg" className="container">
        <div className="theme-switch">
          <span>{darkMode ? "Light" : "Dark"} Mode</span>
          <ThemeSwitch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <Header 
          category={category} 
          setCategory={setCategory} 
          word={word} 
          setWord={setWord} 
          darkMode={darkMode}
        />

        {loading ? (
          <div className="loading-container">
            <CircularProgress color={darkMode ? "inherit" : "primary"} />
          </div>
        ) : (
          meanings.length > 0 && (
            <Definitions 
              word={word} 
              meanings={meanings} 
              category={category}
              darkMode={darkMode}
            />
          )
        )}

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setError(null)} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default App;
