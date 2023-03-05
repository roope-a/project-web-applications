import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from './Header'
import LeftSideBar from './LeftSideBar';
import PageBase from './PageBase';
import Question from './Question'
import SubHeader from './SubHeader';





function QuestionsPage() {

    // const questions = [
    //     {
    //         title: "Testing1",
    //         id: "123",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right now"
    //     },
    //     {
    //         title: "Testing2",
    //         id: "1234",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right not now"
    //     }, {
    //         title: "Testing1",
    //         id: "123",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right now"
    //     },
    //     {
    //         title: "Testing2",
    //         id: "1234",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right not now"
    //     }, {
    //         title: "Testing1",
    //         id: "123",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right now"
    //     },
    //     {
    //         title: "Testing2",
    //         id: "1234",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right not now"
    //     }, {
    //         title: "Testing1",
    //         id: "123",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right now"
    //     },
    //     {
    //         title: "Testing2",
    //         id: "1234",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right not now"
    //     }, {
    //         title: "Testing1",
    //         id: "123",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right now"
    //     },
    //     {
    //         title: "Testing2",
    //         id: "1234",
    //         tags: "test",
    //         author: "Admin",
    //         timestamp: "right not now"
    //     }
    // ]

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch('/questions')
        .then(response => response.json())
        .then(json => {
            setQuestions(json)
        })
        .catch((error) => {
        });
    }, []);

    return (
        <PageBase>
            <Grid item xs>
                <Box sx={{ borderLeft: 2, borderColor: 'divider', pb: 10 }}>
                    <SubHeader title='All questions' />
                    <Typography p={3} align='left'>
                        { questions.length }  questions
                    </Typography>
                    {questions && questions.length > 0 && questions.map((question) => (
                        <Question
                            qTitle={question.qTitle}
                            votes={question.votes}
                            comments={question.comments}
                            id={question.id}
                            author={question.author}
                            authorId={question.authorId}
                            timestamp={question.timestamp}
                        />
                    ))}
                </Box>
            </Grid>
        </PageBase>
    );
}

export default QuestionsPage;