import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from './Header'
import LeftSideBar from './LeftSideBar';
import Question from './Question'
import SubHeader from './SubHeader';





function QuestionsPage() {

    const questions = [
        {
            title: "Testing1",
            id: "123",
            tags: "test",
            author: "Admin",
            timestamp: "right now"
        },
        {
            title: "Testing2",
            id: "1234",
            tags: "test",
            author: "Admin",
            timestamp: "right not now"
        }
    ]

    // const [questions, setQuestions] = useState([]);

    function fetchQuestions() {
        // fetch() 
    }

    useEffect(() => fetchQuestions(), []);

    return (
        <Box>
            <Header />
            <Grid container spacing={0} margin={0} >
                <Grid item ><LeftSideBar /></Grid>
                <Grid item xs>
                    <SubHeader title='All questions' />
                    <p align='left'>total questions</p>
                    {questions && questions.length > 0 && questions.map((question) => (
                        <Question
                            qTitle={question.title}
                            id={question.id}
                            tags={question.tags}
                            author={question.author}
                            timestamp={question.timestamp}
                        />
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

export default QuestionsPage;