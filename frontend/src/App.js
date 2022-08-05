import React, { Component } from 'react';
import { Link, Routes , Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/register';
import Login from './components/login';
import Courses from './components/courses';
import Course from './components/course';
import NotFound from './components/notFound';

class App extends Component {
    state = {  } 
    render() { 
        return (
            <>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/courses">courses</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/auth/login">login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/auth/register">register</Link>
                </li>
                </ul>
            </div>
            </nav>

            <div className='container-fluid'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Home' element={<Home />} />
                    <Route path='/auth' >
                        <Route path='register' element={<Register />} />
                        <Route path='login' element={<Login />} />
                    </Route>
                    <Route path='/courses' element={<Courses />} />
                    <Route path='/course/:id' element={<Course />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
            </>
        ); 
    }
}
 
export default App;