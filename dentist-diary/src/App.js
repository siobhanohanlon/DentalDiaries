//Import CSS
//import 'bootstrap/dist/css/bootstrap.min.css'; //NavBar
import './App.css';

//Import React
import React from 'react';

//Import Navbar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//Import Components
import { AddAppointment } from './components/addAppointment';
import { EditAppointment } from './components/editAppointment.js';
import { ReadAppointment } from './components/readAppointments';

//Import Router
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

//Class
class App extends React.Component {
  //Runs Code
  render() {
    //Returns after running
    return (
      <Router>
        <div className="App">
          {/* Define NavBar */}
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="/">Appointment Index</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/readAppointment">Home</Nav.Link><br></br>
                <Nav.Link href="/addAppointment">Add Appointment</Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          {/* Use Routing to change to page and call different components */}
          <Routes>
            {/* Make it so Home is Read Page */}
            <Route path='/' element={<ReadAppointment></ReadAppointment>}></Route>
            <Route path='/readAppointment' element={<ReadAppointment></ReadAppointment>}></Route>
            <Route path='/addAppointment' element={<AddAppointment></AddAppointment>}></Route>
            <Route path="/editAppointment/:fId" element={<EditAppointment></EditAppointment>}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

//Export
export default App;