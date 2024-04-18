import React, {useContext, useState} from 'react';
import {Grid, Typography, Box, TextField, InputLabel, Input, FormControl, InputAdornment} from '@mui/material';
import {Person2Outlined, AccountCircle} from '@mui/icons-material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import axios from 'axios';
import {Context} from '../../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Application from '../Applications/Application';


const Register = () => {

  const [userData, setUserData] = useState({
    role:'Employer',
    name:'',
    email:'',
    phone:'',
    password:'',
  });

  const navigate = useNavigate();

 async function handleSubmit(e) {

  e.preventDefault();

    try {
      const response = await axios.post(
        'https://getjob-backend-qa7t.onrender.com/api/v1/user/register',
      
      userData, {headers: {"Content-Type": "application/json" }, withCredentials:true});
      toast.success('user registered successfully');
      navigate('/login');

    } catch (error) {
      console.log(error.response.data.message);
    }

  }

  function handleInput(event) {
    setUserData({...userData, [event.target.name]:event.target.value})
  }

  return (
    <>
      <div className="register-page">
          <div className="register-form">
          <div className='logo'>
          <img src='JobZeelogo.png' alt='logo' className='logo-img'></img>
          <Typography textAlign={'center'} mt={1} fontWeight={700}>Create a new account</Typography>  
          </div>          

          <div className='mt2 marginauto width80'>
          <form onSubmit={handleSubmit}>
          <label className='form-label' htmlFor="name">Register As</label>
            <div className="name flex flex-al-items-center form-control">
           <select className='form-input fontsizeoptima' name='role' value={userData.role} onChange={handleInput}>
            <option disabled>Please choose user Category</option>
            <option value={'Employer'}>Employer</option>
            <option value={'Job seeker'}>Job Seeker</option>
           </select>
            <span className='flex flex-al-items-center flex-jc-center'><Person2Outlined></Person2Outlined></span>
            </div>

            <label className='form-label' htmlFor="name">Name</label>
            <div className="name flex flex-al-items-center form-control">
            <input type="text" id='name' placeholder='John Doe' className='form-input fontsizeoptima'  name='name' value={userData.name} onChange={handleInput}/>
            <span className='flex flex-al-items-center flex-jc-center'><BorderColorOutlinedIcon></BorderColorOutlinedIcon></span>
            </div>

            <label className='form-label' htmlFor="email">Email Address</label>
            <div className="email flex flex-al-items-center form-control">
            <input type="email" id='email' placeholder='Johndoe@gmail.com' className='form-input fontsizeoptima'  name='email' value={userData.email} onChange={handleInput}/>
            <span className='flex flex-al-items-center flex-jc-center'><EmailOutlinedIcon></EmailOutlinedIcon></span>
            </div>

            <label className='form-label' htmlFor="Phone">Phone Number</label>
            <div className="phone flex flex-al-items-center form-control">
            <input type="text" id='phone' placeholder='98******12'  className='form-input fontsizeoptima'  name='phone' value={userData.phone} onChange={handleInput}/>
            <span className='flex flex-al-items-center flex-jc-center'><LocalPhoneOutlinedIcon></LocalPhoneOutlinedIcon></span>
            </div>

            <label className='form-label' htmlFor="Password">Password</label>
            <div className="name flex flex-al-items-center form-control">
            <input type="password" id='password' placeholder='*******'  className='form-input fontsizeoptima'  name='password' value={userData.password} onChange={handleInput}/>
            <span className='flex flex-al-items-center flex-jc-center'><HttpsOutlinedIcon></HttpsOutlinedIcon></span>
            </div>

            <button type='submit' className='mt2 font-white widthfull bg-green btn'>Register</button>

          </form>
            <Link to={'/login'} className='login-btn'><button className='login-btn mb1 mt2 widthfull btn bg-transparent'>Login</button></Link>
          </div>
          </div>
          <div className="register-img">
          <img src='/register.png' className='height60' alt='register_page_image' ></img>      
          </div>
    </div>
    </>
  )
}

export default Register;