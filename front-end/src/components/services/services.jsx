import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ServiceCard } from '../card/card';
import Grid from '@material-ui/core/Grid';
import houseLogo from '../../assets/cpf-svg/architecture-and-city.svg';
import hospitalLogo from '../../assets/cpf-svg/hospital.svg';
import gradHatLogo from '../../assets/cpf-svg/graduation-hat.svg';
import calcLogo from '../../assets/cpf-svg/calculator.svg';
import report from '../../assets/cpf-svg/004-report.svg'; 
import withdraw from '../../assets/cpf-svg/008-withdraw.svg'; 
import injection from '../../assets/cpf-svg/003-injection.svg'; 
import shield from '../../assets/cpf-svg/011-shield.svg'; 
import medicine from '../../assets/cpf-svg/002-medicine.svg'; 
import encourage from '../../assets/cpf-svg/009-encourage.svg'; 
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight : theme.typography.fontWeightBold,
        textAlign: 'left',
        margin: '2rem',
    },
    grid: {
        margin: '2rem',
    }
})); 

const logosMappings = {
    "Apply HDB": houseLogo,
    "Claim Medisave": hospitalLogo,
    "Check Medishield": medicine,
    "Claim Eldershield": shield,
    "Apply Private Medical Insurance": injection,
    "Contribute CPF for employees": encourage,
    "education": gradHatLogo,
    "calculator": calcLogo,
    "Invest money": report,
    "Withdraw from CPF": withdraw
}

export default function CpfServices(props) {
    const classes = useStyles();
    const [services, setServices] = React.useState([])

    const handleServicesUpdate = (rankings) => {
        let services =  []
        rankings.forEach(service => services.push([service.id, logosMappings[service.id]]))
        // add in calc
        services.push(["calculator", logosMappings["calculator"]])
        setServices(services)
    }

    React.useEffect(() => {
        if (services.length == 0) {
            axios.get("http://localhost:3001/azure/serviceReccomender/initial")
            .then(res => { 
                console.log(res.data.data)
                handleServicesUpdate(res.data.data.ranking) 
            })
            .catch(err => console.log(err))
        }
    })

    return(
        <Container>
            <Typography className={classes.title} variant="h5">Cpf Services</Typography>
            <Grid container spacing={4} className={classes.grid}>
                {
                    services.map((key) =>
                        <ServiceCard 
                            title={key[0]}
                            imagePath={key[1]}
                            change={props.change}
                        />
                    )
                }
            </Grid>
      </Container>
    );
}