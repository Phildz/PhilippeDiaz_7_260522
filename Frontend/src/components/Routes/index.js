import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "../../pages/Home";
//import Profil from "../../pages/Profil";
import UpdatePost from '../../pages/UpdatePost';
import Navbar from '../Navbar';
import DétailPost from '../../pages/DétailPost';
import SignUpForm from '../Log/SignUpForm';
import SignInForm from '../Log/SignInForm';

const index = () => {
    
    return (
        <div>
            <Router>
                <Navbar />
                    <Route path="/" exact component={SignInForm} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/signup/" exact component={SignUpForm} />
                    <Route path="/signin/" exact component={SignInForm} />
                    <Route path="/détailpost/:id" exact component={DétailPost}/>
                    <Route path="/updatepost/:id" exact component={UpdatePost} />
            </Router>
        </div>
    );
};

export default index;
