import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import { Done, KingBed, PermContactCalendar, ThumbUpAlt, Today } from '@material-ui/icons';
import './Booking.css'
import StaticDatePicker from './dates';
import Rooms from './rooms';
import Information from './information';
import Confirm from './Confirm';
import Finished from './finished';

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundColor:
                '#FD5D5D',
        },
    },
    completed: {
        '& $line': {
            backgroundColor:
                '#FD5D5D',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor:
            '#FD5D5D',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundColor:
            '#FD5D5D',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <Today />,
        2: <KingBed />,
        3: <PermContactCalendar />,
        4: <ThumbUpAlt />,
        5: <Done />
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Vælg dato', 'Vælg værelse', 'Indtast dine oplysninger', 'Bekræft dine valg', 'Færdig!'];
}

function getStepContent(step, setRooms, rooms, customer, setCustomer, dates, setDates, selected, setSelected, id, setId, signedInUser) {
    switch (step) {
        case 0:
            return <StaticDatePicker dates={dates} setDates={setDates}></StaticDatePicker>;
        case 1:
            return <Rooms selected={selected} setSelected={setSelected} rooms={rooms} setRooms={setRooms}></Rooms>
        case 2:
            return <Information customer={customer} setCustomer={setCustomer} signedInUser={signedInUser}></Information>;
        case 3:
            return <Confirm rooms={rooms} customer={customer} dates={dates} selected={selected} setId={setId}></Confirm>
        case 4:
            return <Finished data={id} customer={customer}></Finished>
        default:
            return <div></div>;
    }
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FD5D5D',
        },
        secondary: {
            main: '#f44336',
        },
    },
});

export default function CustomizedSteppers(props) {
    const classes = useStyles(theme);
    const [activeStep, setActiveStep] = React.useState(0);
    const [rooms, setRooms] = React.useState([])
    const [customer, setCustomer] = React.useState({})
    const [dates, setDates] = React.useState(null)
    const [selected, setSelected] = React.useState([])
    const [id, setId] = React.useState({})
    const [signedInUser, setSignedInUser] = useState(null)
    const steps = getSteps();

    useEffect(() => {
        if (props.user !== null && props.user !== undefined) {
            setSignedInUser(props.user)
        }
    }, [])


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    <ThemeProvider theme={theme}>
                        {getStepContent(activeStep, setRooms, rooms, customer, setCustomer, dates, setDates, selected, setSelected, id, setId, signedInUser)}
                        <div className="stepper-buttons">
                            <button style={activeStep === steps.length - 1 ? { display: 'none' } : {}} disabled={activeStep === 0} onClick={handleBack} className="stepper-buttons-item back">
                                Back
                                    </button>
                            <button
                                style={activeStep === steps.length - 1 ? { display: 'none' } : {}}
                                onClick={handleNext}
                                className="stepper-buttons-item next"
                            >
                                {activeStep === steps.length - 1 ? 'Afslut' : 'Næste'}
                            </button>
                        </div>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}