import React, { Suspense, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    containerWidth: {
        width: '100%',
    },
    sliderWidth: {
        width: '90%',
    },
});

const Home: React.FC = (props: any) => {
    useEffect(() => {
        document.title = props.title;
    });
    const classes = useStyles();
    const [width, setWidth] = useState(100);
    return (
        <Container maxWidth="md">
            <h1>Home</h1>
            <Box width={1} display="flex" alignItems="center" justifyContent="center">
                <Slider
                    className={classes.sliderWidth}
                    defaultValue={100}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={50}
                    max={100}
                    onChange={(e, val) => setWidth(val as number)}
                />
            </Box>
            <Box width={1} display="flex" alignItems="center" justifyContent="center">
                <Suspense fallback={<CircularProgress />}>
                    <img
                        width={width ? `${width}%` : "100%"}
                        src="https://www.clara.es/medio/2020/05/09/ester-exposito_f30b11eb_952x844.jpg"
                        alt="img"
                    />
                </Suspense>
            </Box>
        </Container>
    );
}

export default Home;