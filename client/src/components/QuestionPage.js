import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import PageBase from './PageBase';
import Post from './Post';
import SubHeader from './SubHeader';

function QuestionPage() {
    return (
        <PageBase>
                <Grid item xs>
                    <SubHeader title='Q Title' />
                    <Typography>
                        <p align='left'>Asked on X date</p>
                    </Typography>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </Grid>
        </PageBase>
    );
}

export default QuestionPage;