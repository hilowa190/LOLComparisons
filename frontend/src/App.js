import React, { useEffect, useInsertionEffect, useState } from 'react'
import {Container, Box, Modal, Button, Typography} from '@mui/material'
import './App.css';
import backgroundImage from './images/LeagueBackground.png'; // Adjust the path to your image
import modalBackground from './images/LeagueIcon.jpg';
import modalBackground2 from './images/LeagueIcon2.jpg';
import CharacterGrid from './components/CharacterGrid';
import CharacterDetails from './components/CharacterDetails';
import useSound from 'use-sound';
import selectSound from './sounds/selectSound.mp3';
import deselectSound from './sounds/deselectSound.mp3';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import backgroundSound from './sounds/Warriors (ft. Imagine Dragons) _ Worlds 2014 - League of Legends-[AudioTrimmer.com].mp3';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [playSelect] = useSound(selectSound, { volume: 0.5 });
  const [playDeselect] = useSound(deselectSound, { volume: 1 });
  const [playBackground] = useSound(backgroundSound, { volume: 0.15 });
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

  const modalStyle = {
    backgroundImage: `url(${modalBackground2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    padding: '16px',
    boxShadow: '24px',
    borderRadius: '4px',
    backgroundOpacity: '0.1'
  };

  const modalOverlayStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(1, 186, 196, 0.18)',
  }

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
    playBackground();
  };

  const renderCharacterDetails = () => {
    console.log("render")
    if (selectedCharacters.length === 1) {
      return <CharacterDetails character={selectedCharacters[0]} />;
    } else if (selectedCharacters.length === 2) {
      return (
        <>
          <CharacterDetails character={selectedCharacters[0]} otherCharacter={selectedCharacters[1]} />
          <CharacterDetails character={selectedCharacters[1]} otherCharacter={selectedCharacters[0]} />
        </>
      );
    }
    return null;
  };

  return (
    <Container maxWidth={false} style={containerStyle}>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box style={modalStyle}>
          <Box style={modalOverlayStyle}>
            <Typography variant="h2" component="h5" style={{color: 'gold'}} textAlign='center' fontFamily='"Segoe UI Symbol"'>
              <b> Welcome to League of Legends Comparisons! </b>
            </Typography>
          <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          <Typography textAlign='left' style={{color: 'gold'}} fontWeight='50' variant="h5">
            <br/> <br/> This website will allow you to compare the statistics between two League of Legends champions. 
            <br/> <br/> In order to use this website, all you need to do is to click the two champions that you wish to compare. Stats like armour and attack speed will be displayed under their respective champion icons.
            Stats will be green if they are higher, white if they are equal, and red if they are lower.
            <br/> <br/> To change which champions you compare again, you must first de-select on the champions you are currently comparing.
            <br/> <br/> Thank you for using League of Legends Comparisons!
          </Typography>
          </Box>

        </Box>
      </Modal>
      <Box style={{flex: 1}}>
        <Box style={{ flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {renderCharacterDetails()}
        </Box>
      </Box>
      <Box style={{flex: 1, overflowY: 'auto', padding: 50}}>
      <CharacterGrid characters={characters} onSelect={handleSelectCharacter} selectedCharacters={selectedCharacters} />

      </Box>

    </Container>
  );
}

export default App;
