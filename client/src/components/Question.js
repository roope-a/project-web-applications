import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { left } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import moment from 'moment';


function Question({ qTitle, id, author, votes, comments, timestamp, authorId}) {

    const theme = useTheme();
    const dateTimeAgo = moment(new Date(timestamp)).fromNow();

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
                        <Typography align='right'sx={{ fontSize: 13 }}>{ votes } votes </Typography>
                        <Typography align='right'sx={{ fontSize: 13 }}>{ comments } comments</Typography>
                    </Grid>
                    <Grid item xs px={4} py={2}>
                        <Typography align='left' paddingBottom={3}><Link variant='h6' color='secondary' component={RouterLink} to={'/questions/'+id} >{qTitle}</Link></Typography>
                        {/* Question content preview would require changing how the content is stored, currently array of objects */}
                        {/* <Typography align='left' style={{display: '-webkit-box', overflowWrap: 'break-word', wordBreak: 'break-word', overflow: 'hidden', textOverflow: "ellipsis", WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}></Typography> */}
                        <Typography align='right' sx={{ fontSize: 13 }}><Link  color='secondary' component={RouterLink} to={'/users/profile/'+authorId}>{ author }</Link> asked { dateTimeAgo }</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Question;