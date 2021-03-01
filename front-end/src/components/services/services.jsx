import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ServiceCard } from '../card/card';
import Grid from '@material-ui/core/Grid';
import claimMedisave from '../../assets/cpf-svg/002-medicine.svg';
import claimEldershield from '../../assets/cpf-svg/005-man.svg';
import privateMedicalInsurance from '../../assets/cpf-svg/004-report.svg';
import checkMedishield from '../../assets/cpf-svg/011-shield.svg';
import applyBTO from '../../assets/cpf-svg/013-clipboard.svg';
import applyHDB from '../../assets/cpf-svg/010-house.svg';
import privateProperty from '../../assets/cpf-svg/012-building.svg';
import houseInsurance from '../../assets/cpf-svg/011-shield.svg';
import withdrawCPF from '../../assets/cpf-svg/008-withdraw.svg';
import topupCPF from '../../assets/cpf-svg/007-device.svg';
import saveForRetirement from '../../assets/cpf-svg/005-man.svg';
import silverSupport from '../../assets/cpf-svg/005-man.svg';
import payForChildren from '../../assets/cpf-svg/014-student.svg';
import invest from '../../assets/cpf-svg/001-hand.svg';
import selfEmployed from '../../assets/cpf-svg/003-injection.svg';
import employeesCPF from '../../assets/cpf-svg/009-encourage.svg';
import nominationCPF from '../../assets/cpf-svg/013-clipboard.svg';
import calculate from '../../assets/cpf-svg/015-percentage.svg';
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
  "Claim Medisave": claimMedisave,
  "Claim Eldershield": claimEldershield,
  "Apply Private Medical Insurance": privateMedicalInsurance,
  "Check Medishield": checkMedishield,
  "Apply BTO": applyBTO,
  "Apply HDB": applyHDB,
  "Private Property": privateProperty,
  "House Insurance": houseInsurance,
//   "Withdraw CPF Fund": withdrawCPF,
  "Top Up CPF": topupCPF,
  "Save for Retirement": saveForRetirement,
  "Pay for Your Children": payForChildren,
  "Invest Your Money": invest,
  "Self Employed": selfEmployed,
  "Silver Support": silverSupport,
//   "Contribute CPF for Employees": employeesCPF,
  "CPF Nomination": nominationCPF,
  "CPF Calculator": calculate
}


export default function CpfServices(props) {
    const classes = useStyles();
    const [services, setServices] = React.useState([])

    const handleServicesUpdate = (rankings) => {
        let services =  []
        rankings.forEach(service => services.push([service.id, logosMappings[service.id]]))
        // add in calc
        services.push(["CPF Calculator", logosMappings["CPF Calculator"]])
        setServices(services)
    }

    React.useEffect(() => {
        if (services.length == 0) {
            axios.get('http://localhost:5000/azure/serviceReccomender/initial')
            .then(res => { 
                console.log(res.data.data)
                handleServicesUpdate(res.data.data.ranking) 
            })
            .catch(err => console.log(err))
        }
    })

    return(
        <Container>
            <Typography className={classes.title} variant="h5">CPF Services</Typography>
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