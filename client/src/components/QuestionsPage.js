import { Grid, Pagination, PaginationItem, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PageBase from './PageBase';
import Question from './Question'
import SubHeader from './SubHeader';
import { useTheme } from '@mui/material/styles';

    function QuestionsPage() {

        const theme = useTheme();

        const PER_PAGE = 10;

        const [questions, setQuestions] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [pages, setPages] = useState(1);
        const [posts, setPosts] = useState([]);

        useEffect(() => {
            fetch('/questions')
                .then(response => response.json())
                .then(json => {
                    setQuestions(json);
                    setPages(Math.ceil(json.length / PER_PAGE));
                })
                .catch((error) => {
                });
        }, []);

        useEffect(() => {
            const begin = (currentPage - 1) * PER_PAGE;
            const end = begin + PER_PAGE;
            setPosts(questions.slice(begin, end));
        }, [questions, currentPage]);

        const handleChange = (e, page) => {
            const pageNumber = Math.max(1, page);
            // next page
            setCurrentPage(currentPage => Math.min(currentPage + 1, pages));
            // previous page 
            setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
            // jump to x page
            setCurrentPage(() => Math.min(pageNumber, pages));
        };

        return (
            <PageBase>
                <Grid item xs>
                    <Box sx={{ borderLeft: 2, borderColor: 'divider', pb: 10, minHeight: '100vh' }}>
                        <SubHeader title='All questions' />
                        <Typography p={3} align='left'>
                            {questions.length} questions
                        </Typography>
                        {posts && posts.length > 0 && posts.map((question, index) => (
                            <React.Fragment key={index}>
                                <Question
                                    qTitle={question.qTitle}
                                    votes={question.votes}
                                    comments={question.comments}
                                    id={question.id}
                                    author={question.author}
                                    authorId={question.authorId}
                                    timestamp={question.timestamp}
                                />
                            </React.Fragment>
                        ))}
                        <Box sx={{
                            borderTop: 1,
                            flex: 1,
                            borderColor: theme.palette.divider,
                            paddingTop: 6,
                            paddingLeft: 2
                        }}>
                            <Stack>
                                <Pagination
                                    count={pages}
                                    shape='rounded'
                                    onChange={handleChange}
                                    page={currentPage}
                                    />
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </PageBase>
        );
    }

    export default QuestionsPage;