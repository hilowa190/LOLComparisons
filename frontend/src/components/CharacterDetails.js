import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const CharacterDetails = ({ character, otherCharacter }) => {

    const compareStat = (stat1, stat2) => {
        if (!otherCharacter) return 'neutral'; // No comparison if only one character
        return stat1 > stat2 ? 'higher' : stat1 < stat2 ? 'lower' : 'equal';
      };
    
      // Determine the status of HP and armor stats
      const hpStatus = otherCharacter ? compareStat(character.stats.hp, otherCharacter.stats.hp) : 'neutral';
      const hpperlevelStatus = otherCharacter ? compareStat(character.stats.hpperlevel, otherCharacter.stats.hpperlevel) : 'neutral';
      const mpStatus = otherCharacter ? compareStat(character.stats.mp, otherCharacter.stats.mp) : 'neutral';
      const mpperlevelStatus = otherCharacter ? compareStat(character.stats.mpperlevel, otherCharacter.stats.mpperlevel) : 'neutral';
      const armorStatus = otherCharacter ? compareStat(character.stats.armor, otherCharacter.stats.armor) : 'neutral';
      const attackdamageStatus = otherCharacter ? compareStat(character.stats.attackdamage, otherCharacter.stats.attackdamage) : 'neutral';
      const attackspeedStatus = otherCharacter ? compareStat(character.stats.attackspeed, otherCharacter.stats.attackspeed) : 'neutral';
      const attackrangeStatus = otherCharacter ? compareStat(character.stats.attackrange, otherCharacter.stats.attackrange) : 'neutral';
      const movespeedStatus = otherCharacter ? compareStat(character.stats.movespeed, otherCharacter.stats.movespeed) : 'neutral';

      // Function to get color based on comparison status
      const getColor = (status) => {
        switch (status) {
          case 'higher': return 'green';
          case 'lower': return 'red';
          default: return 'white';
        }
      };


      
  return (
    <Box>
        <Grid container style={{ padding: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'rgba(0, 0, 0, 0.75)',}}>
            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={character.icon} alt={character.name} style={{ width: 200, height: 200 }} />
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Typography variant="h4" style={{ color: '#ffd1b3'}}>{character.name}</Typography>
                <Typography variant="subtitle1" style={{ color: '#cca78f'}}>{character.title}</Typography>
          
          <Typography 
            variant="subtitle1"
            style={{ color: getColor(hpStatus) }}
          >
            HP: {character.stats.hp}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ color: getColor(hpperlevelStatus) }}
          >
            HP Per Level: {character.stats.hpperlevel}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ color: getColor(mpStatus) }}
          >
            MP: {character.stats.mp}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ color: getColor(mpperlevelStatus) }}
          >
            MP Per Level: {character.stats.mpperlevel}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ color: getColor(armorStatus) }}
          >
            Armor: {character.stats.armor}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ color: getColor(attackdamageStatus) }}
          >
            Attack Damage: {character.stats.attackdamage}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ color: getColor(attackspeedStatus) }}
          >
            Attack Speed: {character.stats.attackspeed}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ color: getColor(attackrangeStatus) }}
          >
            Attack Range: {character.stats.attackrange}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ color: getColor(movespeedStatus) }}
          >
            Move Speed: {character.stats.movespeed}
          </Typography>
            </Grid>
        </Grid>
    </Box>
  );
};

export default CharacterDetails;