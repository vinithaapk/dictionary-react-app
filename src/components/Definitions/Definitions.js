import React from "react";
import { Chip, Typography, Box } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import "./Definitions.css";

const Definitions = ({ meanings, word, darkMode, category }) => {
  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const renderPhonetics = (phonetics) => {
    return phonetics.map((phonetic, index) => {
      if (phonetic.audio && phonetic.text) {
        return (
          <div key={index} className="phonetic-item">
            <Typography variant="body1" className="phonetic-text">
              {phonetic.text}
            </Typography>
            {phonetic.audio && (
              <VolumeUp
                className="audio-icon"
                onClick={() => playAudio(phonetic.audio)}
              />
            )}
          </div>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <div className="meanings">
      {word === "" ? (
        <div className="empty-state">
          <Typography variant="h5" className="subtitle">
            Start by typing a word to search
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Discover meanings, examples, and more
          </Typography>
        </div>
      ) : (
        <>
          {meanings[0]?.phonetics?.length > 0 && (
            <div className="phonetics-container">
              {renderPhonetics(meanings[0].phonetics)}
            </div>
          )}

          {meanings.map((mean, index) => (
            <div key={index} className="meaning-group">
              {mean.meanings.map((item, meaningIndex) => (
                <div key={meaningIndex} className="part-of-speech">
                  <Chip
                    label={item.partOfSpeech}
                    className="pos-chip"
                    variant="outlined"
                  />
                  
                  {item.definitions.map((def, defIndex) => (
                    <div key={defIndex} className="single-mean">
                      <Typography variant="body1" className="definition">
                        {def.definition}
                      </Typography>

                      {def.example && (
                        <Box className="example-box">
                          <Typography variant="body2" className="example">
                            "{def.example}"
                          </Typography>
                        </Box>
                      )}

                      {def.synonyms?.length > 0 && (
                        <div className="synonyms">
                          <Typography variant="subtitle2">Synonyms:</Typography>
                          <div className="chips-container">
                            {def.synonyms.map((syn, synIndex) => (
                              <Chip
                                key={synIndex}
                                label={syn}
                                size="small"
                                className="synonym-chip"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {def.antonyms?.length > 0 && (
                        <div className="antonyms">
                          <Typography variant="subtitle2">Antonyms:</Typography>
                          <div className="chips-container">
                            {def.antonyms.map((ant, antIndex) => (
                              <Chip
                                key={antIndex}
                                label={ant}
                                size="small"
                                className="antonym-chip"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Definitions;