import { Box, Container } from '@mui/system';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Grid } from '@mui/material';
import LeftSideBar from './LeftSideBar';
import { useTheme } from '@mui/material/styles';

class PageBase extends React.Component {
    render() {
        return (
            <Box>
                <Header />
                <Container sx={{ maxWidth: 1264 }}>
                    <Grid container>
                        <LeftSideBar />
                        {this.props.children}
                    </Grid>
                </Container>
                <Footer />
            </Box>
        );
    }
}

export default PageBase;