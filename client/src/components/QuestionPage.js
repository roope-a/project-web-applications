import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import Post from './Post';
import SubHeader from './SubHeader';

function QuestionPage() {
    return (
        <div>
            <Header />
            <Grid container spacing={0} margin={0} >

                <Grid item ><LeftSideBar /></Grid>
                <Grid item xs>
                    <SubHeader title='Q Title' />
                    <Typography>
                        <p align='left'>Asked on X date</p>
                    </Typography>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </Grid>
            </Grid>



        </div>
    );
}

export default QuestionPage;