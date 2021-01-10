import React, { Suspense, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    sliderWidth: {
        width: '50%',
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
            <Grid container spacing={2}>
                <Grid item xs>
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
                </Grid>
            </Grid>
            <div>
                <div>
                    <Suspense fallback={<div className="loader"></div>}>
                        <img
                            width={width ? `${width}%` : "100%"}
                            src="https://www.clara.es/medio/2020/05/09/ester-exposito_f30b11eb_952x844.jpg"
                            alt="img"
                        />
                    </Suspense>
                </div>
            </div>
        </Container>
    );
}

export default Home;