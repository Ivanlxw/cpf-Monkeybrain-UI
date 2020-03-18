import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AttachMoney } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { DashboardCard } from '../../../card/card';
import { KeyboardDatePicker } from '@material-ui/pickers';

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
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 250,
        justifyContent: 'center',
        textAlign: 'center'
    },
}));

export default function CpfWithdrawal() {
    const classes = useStyles(); 
    const [selectedDate, setSelectedDate] = React.useState(null); //new Date('1966-08-18T21:11:54') 
    const [oa, setOa] = React.useState(0);
    const [sa, setSa] = React.useState(0);
    const [withdraw, setWithdraw] = React.useState(0)
    const [limit, setLimit] = React.useState(0)

    const handleDateChange = event => {
        try {
            new Date(event.target.value)
        } catch(err) {
                return
        } finally {
            const thisYear = new Date().getFullYear()
            const tempAge = thisYear - new Date(event.target.value).getFullYear()
            console.log(tempAge)
            if (tempAge > 59) {
                setLimit(161000)
            } else if (tempAge > 54 && tempAge <= 59) {
                setLimit((181000-(tempAge-55)*5000));
            } else if (tempAge > 20 && tempAge < 55){
                setLimit(181000);
            } else {
                setLimit(0)
            }
        }
    }
    
    function handleValue(item, value) {
        if (item === 'ordinary') {
            setOa(value)
            let amnt = parseFloat(oa) + parseFloat(sa);
            if (amnt > 0 && amnt < 5000) {
                setWithdraw(amnt)
                return
            } else if (amnt >= 5000 && amnt <= 181000) {
                setWithdraw(5000);
                return
            } else if (amnt > 181000) {
                setWithdraw((amnt-181000).toFixed(2))
                return
            }
        } else if (item === 'special') {
            setSa(value)
            let amnt = parseFloat(oa) + parseFloat(sa);
            if (amnt > 0 && amnt < 5000) {
                setWithdraw(amnt)
                return
            } else if (amnt >= 5000 && amnt <= 181000) {
                setWithdraw(5000);
                return
            } else if (amnt > 181000) {
                setWithdraw((amnt-181000).toFixed(2))
                return
            }
        }        
    }
    
    return(
        <div>
            <Grid container spacing={4}>    
                <Grid item xs={6}>
                    {/* // ORDINARY ACC, SPECIAL ACC, MEDISAVE ACC */}
                    <div className={classes.margin}>
                        <Typography>
                            Ordinary Account
                        </Typography>
                        <Grid container spacing={1} alignItems="center" className={classes.paper}>
                            <Grid item>
                                <AttachMoney />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    id="ordinary-acct" 
                                    label="Ordinary Account" 
                                    onChange={(event) => handleValue('ordinary', event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.margin}>
                        <Typography>
                            Special Account
                        </Typography>
                        <Grid container spacing={1} alignItems="center" className={classes.paper}>
                            <Grid item>
                                <AttachMoney />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    id="special-acct" 
                                    label="Special Account" 
                                    onChange={(event) => handleValue('special', event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={4}>    
                <Grid item xs={6}>
                    <div className={classes.margin}>
                        <Typography>
                            Medisave Account
                        </Typography>
                        <Grid container spacing={1} alignItems="center" className={classes.paper}>
                            <Grid item>
                                <AttachMoney />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    id="medisave-acct" 
                                    label="Medisave Account" 
                                    onChange={(event) => handleValue('medisave', event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.margin}>
                        <Typography>
                            Birth Date
                        </Typography>
                        <Grid container spacing={1} alignItems="center" className={classes.paper}>
                            <form noValidate>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    className={classes.textField}
                                    onChange={event => handleDateChange(event)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </form>                         
                        </Grid>     
                    </div>
                </Grid>
            </Grid>

            <div className="results">
                <Typography className={classes.margin} variant="h5">
                    Results 
                </Typography>
                <DashboardCard moreInfo="Your estimated withdrawal amount is" value={withdraw} />
                <DashboardCard moreInfo="The estimated retirement sum set aside in your Retirement Account is" value={limit} />
            </div>
        </div>
    );
}