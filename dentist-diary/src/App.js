//Import CSS
import 'bootstrap/dist/css/bootstrap.min.css'; //NavBar
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
import Login from './components/login';
import { ReadAppointment } from './components/readAppointments';

//Import Router
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

//Class
class App extends React.Component {
  constructor(props) {
    super(props);

    // State to track if the user is authenticated
    this.state = {
      isAuthenticated: false
    };
  }

  // Lifecycle method to check if the user is already authenticated
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isAuthenticated: true });
    }
  }

  // Handle user login
  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  // Handle user logout
  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ isAuthenticated: false });
  };

  // Runs Code
  render() {
      return (
        <Router>
          <div className="App">
            {/* Render Navbar only if the user is authenticated */}
            {this.state.isAuthenticated && (
              <Navbar bg="primary" variant="dark">
                <Container>
                  <Navbar.Brand href="/">Appointment Index</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="/readAppointment">Home</Nav.Link>
                    <Nav.Link href="/addAppointment">Add Appointment</Nav.Link>
                    <Nav.Link onClick={this.handleLogout} href="/">Logout</Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
            )}
  
            {/* Use Routing to change to page and call different components */}
            <Routes>
              {/* If not authenticated, redirect to the login page */}
              {!this.state.isAuthenticated ? (
                <Route path="*" element={<Login onLogin={this.handleLogin} />}></Route>
              ) : (
                <>
                  {/* Authenticated routes */}
                  <Route path="/" element={<Navigate to="/readAppointment" />}></Route>
                  <Route path="/readAppointment" element={<ReadAppointment />}></Route>
                  <Route path="/addAppointment" element={<AddAppointment />}></Route>
                  <Route path="/editAppointment/:fId" element={<EditAppointment />}></Route>
                </>
              )}
            </Routes>
          </div>
        </Router>
      );
    }
  }

//Export
export default App;