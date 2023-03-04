import { Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import { ReadOnly } from './SlateEditor';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import "../../node_modules/highlight.js/styles/github.css"

let value = [
    {
      children: [
        {
          text:
          ''
        },
      ],
    },
  ]


function Post() {

    const {id} = useParams();
    const theme = useTheme();

    const [content, setContent] = useState(value);
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        fetch('/questions/'+id)
        .then(response => response.json())
        .then(json => {
            setContent(json.content)
            setVotes(json.votes)
        })
            
        .catch((error) => {
        });

    }, []);

    return (
        <Box sx={{ borderTop: 1, borderColor: theme.palette.divider, m: 3, pt: 2 }}>
            <Grid container direction='row' justifyContent="center" spacing={{ xs: 3, sm: 2, md: 2 }}>
                    <Grid item xs={2} md={1}>
                        <Box minWidth={35}>
                        <IconButton >
                            <KeyboardDoubleArrowUpIcon color='success' fontSize='large'/>
                        </IconButton>
                        <Typography align='center'>{ votes }</Typography>
                        <IconButton >
                            <KeyboardDoubleArrowDownIcon fontSize='large' />
                        </IconButton>
                        </Box>
                    </Grid>
                
                <Grid item xs={10} md={11}>
                    <ReadOnly value={ content }></ReadOnly>
                </Grid>
            </Grid>
            <Box sx={{ pr: 3 }}>
                <p align='right'>meta info</p>
            </Box>
        </Box>
    );
}

export default Post;