import React from 'react';
import SearchAppBar from './components/header/header'; 
import CpfServices from './components/services/services';
import { MainDashboard } from './components/dashboard/defaultDashboard';
import { Calculator } from './components/calculator/calculator';
import SimpleDialogDemo from './components/walkthrough/walkthrough';
import Container from '@material-ui/core/Container';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dashboardtype: null
    }
    this.changeType = this.changeType.bind(this);
  }

  componentDidMount() {
    this.setState({
      dashboardtype : 'main'
    })
  }
  renderSwtich() {
    console.log("DashboardType: " + this.state.dashboardtype);
    switch(this.state.dashboardtype) {
      case 'main':
        return <MainDashboard />
      case 'CPF Calculator':
        return <Calculator />
      case 'Apply HDB':
        return <SimpleDialogDemo />
      default:
        return ''
    }
  }

  changeType(param) {
    if (param != "calculator") {
      axios.post("http://localhost:3001/azure/serviceReccomender/trainer", { selectedService: param })
      .then(() => {
        console.log("Trained Personaliser!")
        this.setState({
          dashboardtype: param 
        })
      })
      .catch(err => console.log(err))
    }
    this.setState({
      dashboardtype: param
    })
  }

  render() {
    return(
      <div className="App">
        <div className="header">
          <SearchAppBar change={this.changeType}/>
        </div>
        <div className="cpf-services">
          <CpfServices change={this.changeType}/>
        </div>
        <div className="cpf-dashboard">
          <Container>
            {this.renderSwtich()}
          </Container>
        </div>
      </div>
    );
  } 
}

export default App;
