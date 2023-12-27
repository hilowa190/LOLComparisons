import React from 'react';
import { Grid, Paper } from '@mui/material';

const CharacterGrid = ({ characters, onSelect, selectedCharacters }) => {
  return (
    <Grid container spacing={1}>
      {characters.map((character) => (
        <Grid item xs={1} key={character.id}>
          <Paper 
            onClick={() => onSelect(character)}
            style={{ 
              textAlign: 'center',
              opacity: selectedCharacters.some(selected => selected.id === character.id) ? 0.5 : 1,
              cursor: 'pointer'
            }}
          >
            <img src={character.icon} alt={character.name} style={{ width: '100%', height: 'auto' }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterGrid;