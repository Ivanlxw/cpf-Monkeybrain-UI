import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { DashboardCard } from '../../../card/card';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    margin: {
        margin: theme.spacing(1),
        justifyContent: 'center',
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
    },
    icons: {
        '& > .fa': {
          margin: theme.spacing(2),
        },
    }
}));


export default function OutstandingLoanForm() {
    const classes = useStyles();
    const [remain, setRemain] = React.useState(20000);
    const [endAge, setEndAge] = React.useState('');
    const [startAge, setStartAge] = React.useState('');
    const [capital, setCapital] = React.useState(0);
    const [monthly, setMonthly] = React.useState(0);
    const [ir, setIr] = React.useState(0);


    function handleValue(item, value) {
        console.log(item, value);
        switch(item) {
            case "end-age":
                if (value > 0 && value <= 100) {
                    setEndAge(value);
                } else {
                    setEndAge('');
                }
                break;
            case "start-age":
                if (value > 0 && value <= 100) {
                    setStartAge(value);
                } else {
                    setStartAge('');
                }
                break;
            case "initial":
                if (value > 0 && value <= 100000000) {
                    setCapital(value);
                }
                break;
            case "monthly":
                setMonthly(value);
                break;
            
            case "ir":
                setIr(parseFloat(value)/100);
                break;
            default:
                break;
        }

        // Recalculate outstanding value
        console.log(ir)
        const y = parseInt(endAge - startAge);
        let toReturn = capital;
        for (let c=0; c<y; c++) {
            toReturn = (toReturn - monthly) * (1+ir);
        }
        console.log(toReturn);
        
        // const cumIr = ((Math.pow((1+ir),y)-1)/(ir))
        // console.log(cumIr)
        // let temp_r = capital * Math.pow((1+ir),y) - monthly * cumIr;
        if (toReturn > 0) {
            setRemain(toReturn.toFixed(2));
        } else {
            setRemain('');
        }
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div id="loadcss">
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <div className={classes.margin}>
                                <Typography>
                                    Outstanding Loan Ending Age (Years)
                                </Typography>
                                <Grid container spacing={1} alignItems="center" className={classes.paper}>
                                    <Grid item>
                                        <TextField 
                                            id="loan-end-age" 
                                            label="Ending Age" 
                                            onChange={(event) => handleValue('end-age', event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.margin}>
                                <Typography>
                                    Age When You Took Up Your Housing Loan (years)
                                </Typography>
                                <Grid container spacing={1} alignItems="center" className={classes.paper}>
                                    <Grid item>
                                        <TextField 
                                            id="age-take-loan" 
                                            label="Starting Age"
                                            onChange={(event) => handleValue('start-age', event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </div>                        
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        {/* <Grid item xs={6}>
                            <TextField 
                                id="outlined-search" 
                                label="Date of Birth (DD-MM-YYYY)" 
                                type="search" 
                                defaultValue="31-12-1996"
                                variant="outlined"
                            />
                        </Grid> */}
                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <Typography>
                                    Initial Housing Loan Amount
                                </Typography>
                                <Grid container spacing={1} alignItems="center" className={classes.paper}>
                                    <Grid item>
                                        <TextField 
                                            id="initial-amount" 
                                            label="Initial Amount" 
                                            onChange={(event) => handleValue('initial', event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Icon className="fas fa-percentage" styles={{padding: 0}}/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <Typography>
                                    Monthly Instalment Amount
                                </Typography>
                                <Grid container spacing={1} alignItems="center" className={classes.paper}>
                                    <Grid item>
                                        <TextField 
                                            id="monthly-instsallment" 
                                            label="Installment" 
                                            onChange={(event) => handleValue('monthly', event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Icon className="fas fa-percentage" styles={{padding: 0}}/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <Typography>
                                    Interest Rate(per annum)
                                </Typography>
                                <Grid container spacing={1} alignItems="center" className={classes.paper}>
                                    <Grid item>
                                        <TextField 
                                            id="interest-rate" 
                                            label="Enter interest rate in %" 
                                            onChange={(event) => handleValue('ir', event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Icon className="fas fa-percentage" styles={{padding: 0}}/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    {/* Results */}
                    <Grid>
                        <DashboardCard moreInfo={`Outstanding Loan Balance at ${endAge}`} value={`$${remain}`} />
                    </Grid>
                </div>
            </form>
        </div>
    );
}