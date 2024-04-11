import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import JobDetails from './Components/Job/JobDetails';
import MyJobs from './Components/Job/MyJobs';
import PostJob from './Components/Job/PostJob';
import Jobs from './Components/Job/Job';
import Application from './Components/Applications/Application';
import MyApplication from './Components/Applications/MyApplication';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import { Context } from './main';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

const App = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('Request has been made to server');

      try {
        // Access JWT Token from Cookies
        const token = Cookies.get('jwtToken');

        // Create Axios Instance with JWT Token in Headers
        const api = axios.create({
          baseURL: 'https://getjob-backend-qa7t.onrender.com/api/v1',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });

        const { data } = await api.get('/user/getuser');
        console.log(data);
        setUser(data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.log('User might not be logged in!');
        console.log(error);
        setUser({});
        setIsAuthorized(false);
      }
    };

    fetchUser();
  }, [isAuthorized, setUser, setIsAuthorized]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/application/me" element={<MyApplication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;

