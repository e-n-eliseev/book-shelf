import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from 'react-router-dom';
import { useState, FC } from 'react';
import { ISlider } from '../../../../types/types';
import SwipeableViews from 'react-swipeable-views';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Slider: FC<ISlider> = ({ category, images, delay }) => {

    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);

    const maxSteps = images.length;
    const id = images[activeStep].id;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <section className='slider'>
            <h3 className='slider__heading'>
                Категория:<br />
                "{category}"
            </h3>
            <Box sx={{
                maxWidth: 230,
                flexGrow: 1,
                borderRadius: "8px",
                overflow: "hidden",
                border: "3px solid #FFCA42",
            }}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        padding: "5px",
                        bgcolor: '#FFFFFF',
                        textOverflow: "ellipsis",
                        justifyContent: "center"
                    }}
                >
                </Paper>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    interval={delay}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <Link
                            key={step.label}
                            className="book__link"
                            to={`/book/${id}`}
                        >
                            <div >
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 300,
                                            display: 'block',
                                            backgroundColor: "#F4F8FF",
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={step.imgPath}
                                        alt={step.label}
                                    />
                                ) : null}
                            </div>
                        </Link>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#1B3764"
                            }}
                            disabled={activeStep === maxSteps - 1}
                        >

                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#1B3764"
                            }}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}

                        </Button>
                    }
                />
            </Box>
        </section >

    );
}

export default Slider;
