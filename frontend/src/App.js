import React, { useEffect, useInsertionEffect, useState } from 'react'
import {Container, Box, Modal, Button, Typography} from '@mui/material'
import './App.css';
import backgroundImage from './images/LeagueBackground.png'; // Adjust the path to your image
import CharacterGrid from './components/CharacterGrid';
import useSound from 'use-sound';
import selectSound from './sounds/selectSound.mp3';
import deselectSound from './sounds/deselectSound.mp3';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [playSelect] = useSound(selectSound, { volume: 0.5 });
  const [playDeselect] = useSound(deselectSound, { volume: 1 });
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  };

  useEffect(() => {
    console.log('fetching')
  
    fetch("/api/getAllStuff")
    .then(
      response => response.json())
    .then(
      data => {
        setCharacters(data);
      }
    ).catch(error => console.error('Error:', error));
  }, [])

  useEffect(() => {
    setShowModal(true); // Show the modal when the component mounts
  }, []);

  const handleSelectCharacter = (character) => {
    if (selectedCharacters.some(selected => selected.id === character.id)) {
      // Deselect if already selected
      playDeselect()
      setSelectedCharacters(selectedCharacters.filter(selected => selected.id !== character.id));
    } else if (selectedCharacters.length < 2) {
      // Add to selection if not already selected and less than two selected
      playSelect()
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    backgroundColor: 'white',
    padding: '16px',
    boxShadow: '24px',
    borderRadius: '4px'
  };

  return (
    <Container maxWidth={false} style={containerStyle}>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box style={modalStyle}>
          <Typography variant="h3" component="h5" style={{color: 'blue'}} textAlign='center'>
            Welcome to the League of Legends Champions Comparitor!
          </Typography>
          <Typography textAlign='center'>
          <br/> My sandwitches are very long and tasty with mushrooms! <br/> Watermelons are bald like my head.
          </Typography>
          <Button onClick={handleCloseModal} style={{ marginTop: '16px' }}>Close</Button>
        </Box>
      </Modal>
      <Box style={{flex: 1}}>

      </Box>
      <Box style={{flex: 1, overflowY: 'auto', padding: 50}}>
      <CharacterGrid characters={characters} onSelect={handleSelectCharacter} selectedCharacters={selectedCharacters} />

      </Box>

    </Container>
  );
}

export default App;
