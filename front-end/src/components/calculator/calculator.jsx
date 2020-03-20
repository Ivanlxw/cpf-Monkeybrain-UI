import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import LoanRepayForm from './Forms/Others/loanRepayment';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CpfWithdrawal from './Forms/Health/healthCalc';
import OutstandingLoanForm from './Forms/Housing/outstandingLoan';

const useStyles = makeStyles(theme => ({
    root: {
        fontWeight : theme.typography.fontWeightBold,        
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    },
    margin: {
        padding: theme.spacing(2),
    },
    tabRoot: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export const Calculator = function() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [optionsData, setOptionsData] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTabChange = val => {
        switch(val.toLowerCase()) {
            case 'retirement':
                setOptionsData([
                    { title: 'CPF LIFE Estimator ',  component: ""},
                    { title: 'CPF Withdrawal Calculator', component: <CpfWithdrawal />},
                ])
                break;
            case 'housing':
                setOptionsData([
                    { title: 'Outstanding Loan Calculator', component: <OutstandingLoanForm />},
                    { title: 'Loan Repayment Period Calculator', component: <LoanRepayForm />},
                ])
                break;
            case 'healthcare':
                setOptionsData([
                    { title: 'Medisave/mediShoeld Life Claim Calculator', component: ""},
                ])
                break;
            case 'self-employed scheme':
                setOptionsData([
                    { title: 'Self-Employed MediSave Instalment Calculator', component: ""},
                    { title: 'Self-Employed MediSave Contribution Calculator', component: ""},
                ])

                break;
            default:
                setOptionsData([
                    { title: 'CPF Education Loan Repayment Period Calculator', component: <LoanRepayForm />},
                    { title: 'Contribution', component: ""}
                ])    
                break;
        }
    }

    let comp = ""
    if (optionsData != null) {
        comp = <CalculatorType data={optionsData} />
    }

    return (
        <div className={classes.tabRoot}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Retirement" {...a11yProps(0)} onClick={event => handleTabChange('Retirement')} />
                    <Tab label="Housing" {...a11yProps(1)} onClick={event => handleTabChange('Housing')} />
                    <Tab label="Healthcare" {...a11yProps(2)} onClick={event => handleTabChange('Healthcare')} />
                    <Tab label="Self-employed Scheme" {...a11yProps(3)} onClick={event => handleTabChange('Self-employed Scheme')} />
                    <Tab label="Others" {...a11yProps(4)} onClick={event => handleTabChange('others')} />
                </Tabs>
            </AppBar>
            {
                comp
            }
        </div>
    );        
}

function CalculatorType(props) {
    const classes = useStyles();
    const [calcComp, setCalcComp] = React.useState(null);

    const autoStyles = {
        marginLeft:'10%',
        marginRight:'10%',
        marginBottom: '2%',
        textAlign: 'center'
    }

    const optionsData = props.data

    return(
        <div>
            <Typography className={classes.root} variant="h5">
                {props.value} 
            </Typography>
            <Autocomplete
                id="calc-select"
                options={optionsData}
                getOptionLabel={optionsData => optionsData.title}
                style={autoStyles}
                renderInput={params => <TextField {...params} 
                                            label="Select Function" 
                                            variant="outlined" 
                                        />}
                onChange={(event, newValue) => {
                    if (newValue != null) {
                        setCalcComp(newValue.component);
                    }
                }}
            />
            <div className={classes.margin}>
                {
                    calcComp
                }
            </div>
        </div>
    );
}