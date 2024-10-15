import React, { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material/styles';

import { useStore } from "./context";
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DynamicQuiz from './DynamicQuiz';


const Item_HEIGHT = 48;
const Item_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: Item_HEIGHT * 4.5 + Item_PADDING_TOP,
      width: 250,
    },
  },
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



function App() {
  const { generateNewTest,
    validateCurrentTest,
    setWordList,
    setFirstWordIndex,
    setLastWordIndex,
    setQuestionCount } = useStore();



  const theme = useTheme();
  const [selectedWord, setSelectedWord] = React.useState([]);

  const playJennyAudio = () => {
    let audioUrl = `audio/tts_models-en-jenny-jenny-${selectedWord}.wav`
    new Audio(audioUrl).play();
  }

  const playFastPitchAudio = () => {
    let audioUrl = `audio/tts_models-en-ljspeech-fast_pitch-${selectedWord}.wav`
    new Audio(audioUrl).play();
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedWord(
      // On autofill we get a stringified value.
      value
    );
  };

  const useFetch = (url) => {
    const [data, setData] = useState([]);;

    useEffect(() => {
      async function fetchData() {
        const response = await fetch(url);
        const text = await response.text();
        let arr = text.split("\n");
        setData(arr);
        setWordList(arr);
      }
      fetchData();
    }, [url]);


    return data;
  };

  const URL = '/audio/words.txt';
  let result = useFetch(URL);


  return (
    <div className="App">

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Word</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={selectedWord}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {
                <Chip key={selected} label={selected} />
                //selected.map((value) => (
                //  <Chip key={value} label={value} />
                //))
              }
            </Box>
          )}
          MenuProps={MenuProps}
        >


          {result.map((name) => (
            <MenuItem
              key={name}
              value={name}

            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack spacing={2}>
        <Item>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => {
                playJennyAudio();
              }}
            >Play Jenny</Button>

            <Button
              variant="outlined"
              onClick={() => {
                playFastPitchAudio()
              }}
            >Play Fast Pitch</Button>

          </Stack>
        </Item>
        <Item>
          <Stack spacing={2} direction="row">
            <Item><TextField id="firstWordIndex" label="First Word Index" variant="outlined" error defaultValue="0" onChange={(event) => { setFirstWordIndex(event.target.value); }} /></Item>
            <Item><TextField id="lastWordIndex" label="Last Word Index" variant="outlined" error defaultValue="20" onChange={(event) => { setLastWordIndex(event.target.value); }} /></Item>
            <Item><TextField id="questionCount" label="Total Questions" variant="outlined" error defaultValue="10" onChange={(event) => { setQuestionCount(event.target.value); }} /></Item>
            <Item><Button variant="outlined" onClick={() => { generateNewTest() }} >Generate Test </Button></Item>
            <Item><Button variant="outlined" onClick={() => { validateCurrentTest() }} >Validate Test </Button></Item>
          </Stack>

        </Item>
        <Item>
          <DynamicQuiz></DynamicQuiz>
        </Item>
      </Stack>




    </div>
  );
}

export default App;
