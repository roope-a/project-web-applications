import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { left } from '@mui/system';
import { Grid, Typography } from '@mui/material';

function QuestionsRow({ qTitle, id, tags, author, timestamp }) {

    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1, position: left, display: 'flex' }}>
            <Box sx={{
                borderTop: 1,
                flex: 1,
                borderColor: theme.palette.divider,
                paddingBottom: 1,
                paddingTop: 2
            }}>
                <Grid container wrap='nowrap'>
                    <Grid item pl={8} pr={2} py={2}>
                        <Typography>votes</Typography>
                        <Typography>answers</Typography>
                        <Typography>views</Typography>
                    </Grid>
                    <Grid item px={4} py={2}>
                        <Typography align='left'><Link style={{}} component={RouterLink} to={'/questions'} >{qTitle}</Link></Typography>
                        <Typography align='left' style={{display: '-webkit-box', overflowWrap: 'break-word', wordBreak: 'break-word', overflow: 'hidden', textOverflow: "ellipsis", WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                            question aaaaa aa asfd asdf asdf asf asf asdf asdf asdfa sd fasdf asdf asdf asdf asdf asdfasf asdf a asdf asdfasasfasdf ajasdka fsöl fslkj flöksaf lköas fölaslfk preview
                            </Typography>
                        <Typography align='left'>{author}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default QuestionsRow;