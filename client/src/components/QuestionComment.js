import { Grid, IconButton, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ReadOnly } from './SlateEditor';
import { Link as RouterLink } from 'react-router-dom';

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


function Comment({ postContent , postVotes, author, authorId, timestamp }) {
    
    const theme = useTheme();

    return (
        <Box sx={{ borderTop: 1, borderColor: theme.palette.divider, m: 3, pt: 2 }}>
            <Grid container direction='row' justifyContent="center" spacing={{ xs: 3, sm: 2, md: 2 }}>
                    <Grid item xs={2} md={1}>
                        <Box minWidth={35}>
                        <IconButton >
                            <KeyboardDoubleArrowUpIcon color='success' fontSize='large'/>
                        </IconButton>
                        <Typography align='center'>{ postVotes }</Typography>
                        <IconButton >
                            <KeyboardDoubleArrowDownIcon fontSize='large' />
                        </IconButton>
                        </Box>
                    </Grid>
                <Grid item xs={10} md={11}>
                    <ReadOnly value={ postContent }></ReadOnly>
                </Grid>
            </Grid>
            <Box sx={{ pr: 3 }}>
                {/* <Typography align='right' ><Link color='secondary' component={RouterLink} to={'/users/'+authorId} >{ author }</Link></Typography> */}
                <Typography align='right'>{ author }</Typography>
                <Typography align='right'>Commented { timestamp }</Typography>
            </Box>
        </Box>
    );
}

export default Comment;