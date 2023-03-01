import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTheme } from '@mui/material/styles';

import Highlight from 'react-highlight';
import "../../node_modules/highlight.js/styles/github.css"

function Post(votes, postbody, metaInfo) {
    const theme = useTheme();
    return (
        <Box sx={{ borderTop: 1, borderColor: theme.palette.divider,p: 1 }}>
            <Grid container>
                {/* post body */}
                <Box sx={{ pl: 2 }}>
                    <Grid item >
                        <p>upvote</p>
                        <p>200</p>
                        <p>downvote</p>
                    </Grid>
                </Box>
                <Box sx={{ pl: 2 }}>
                    <p>postbody</p>
                    <Highlight className='javascript'>
                        {"code snippet to be highlighted"}
                    </Highlight>
                </Box>

            </Grid>
            <Box sx={{ pr: 3 }}>
                <p align='right'>meta info</p>
            </Box>
        </Box>
    );
}

export default Post;