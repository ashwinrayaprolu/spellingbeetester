import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { useStore } from "./context";
import { Theme, useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import DangerousTwoToneIcon from '@mui/icons-material/DangerousTwoTone';


const playJennyAudio = (selectedWord) => {
    let audioUrl = `audio/tts_models-en-jenny-jenny-${selectedWord}.wav`
    new Audio(audioUrl).play();
  }

 

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

function DynamicQuiz() {
    const theme = useTheme();
    const { randomList,updateAnswerFor,results} = useStore();

    return (

        <div><h4>Dynamic Quiz Section</h4>
    

        <Box sx={{ width: '100%' }}>
            <Stack spacing={2} >
                {
                    randomList.map( (word, index) => {
                       return ( 
                       <Item>
                            <Stack spacing={2} direction={'row'}>
                                <Item>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        playJennyAudio(word);
                                    }}>Play Jenny</Button>
                                </Item>

                                <Item><TextField id={`question_${index}`} label={`Question ${index}`} variant="outlined" error defaultValue="" onChange={(event) => { updateAnswerFor(index,event.target.value); }} /></Item>

                                <Item>  { results[index] == true ? <ThumbUpAltTwoToneIcon></ThumbUpAltTwoToneIcon>  : <DangerousTwoToneIcon></DangerousTwoToneIcon>   }  </Item>

                            </Stack>
                             
                        </Item> )

                    } )
                }
            </Stack>
            </Box>
        </div>

    )

}

export default DynamicQuiz;