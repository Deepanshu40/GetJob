import React, {useContext, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import {Person2Outlined, AccountCircle} from '@mui/icons-material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import axios from 'axios';
import {Context} from '../../main.jsx';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';


const Login = () => {

  const [userData, setUserData] = useState({
    role:'',
    email:'',
    password:'',
  });

  const {isAuthorized, setIsAuthorized} = useContext(Context);
  const navigate = useNavigate();
  
  if (isAuthorized) {
    return <Navigate to={'/'} />
  }


 async function handleSubmit(e) {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      // "http://localhost:8080/api/v1/user/login",
      "https://getjob-backend-qa7t.onrender.com/api/v1/user/login",      
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setUserData({
      role:'Employer',
      email:'nishu@gmail.com',
      password:'12345678',
    });
    setIsAuthorized(true);
    toast.success('logged in successfully')
    return navigate('/');
    } catch (error) {
      console.log(error);
      console.dir(error)
      toast.error(error.response.data.message);
    }
  }
  function handleInput(event) {
    setUserData({...userData, [event.target.name]:event.target.value})
  }

  return (
    <div className='loginPage'>
        <div className="login-form">
        <div className='logo'>
         <img src='JobZeelogo.png' alt='logo' className='logo-img'></img>
         <Typography textAlign={'center'} mt={1} fontWeight={700}>Login to your account</Typography>  
         </div>          

         <div className='mt2 marginauto width80'>
         <form onSubmit={handleSubmit}>
         <label className='form-label' htmlFor="name">Login As</label>
           <div className="name flex flex-al-items-center mb1 form-control">
          <select className='form-input fontsizeoptima' name='role' value={userData.role} onChange={handleInput}>
           <option value=''>Please choose user Category</option>
           <option value={'Employer'}>Employer</option>
           <option value={'Job seeker'}>Job Seeker</option>
          </select>
           <span className='flex flex-al-items-center flex-jc-center'><Person2Outlined></Person2Outlined></span>
           </div>

           <label className='form-label' htmlFor="email">Email Address</label>
           <div className="email flex flex-al-items-center mb1 form-control">
           <input type="email" id='email' placeholder='Johndoe@gmail.com' className='form-input fontsizeoptima'  name='email' value={userData.email} onChange={handleInput}/>
           <span className='flex flex-al-items-center flex-jc-center'><EmailOutlinedIcon></EmailOutlinedIcon></span>
           </div>

           <label className='form-label' htmlFor="Password">Password</label>
           <div className="name flex flex-al-items-center mb1 form-control">
           <input type="password" id='password' placeholder='*******'  className='form-input fontsizeoptima'  name='password' value={userData.password} onChange={handleInput}/>
           <span className='flex flex-al-items-center flex-jc-center'><HttpsOutlinedIcon></HttpsOutlinedIcon></span>
           </div>

         {/* <button type='submit' className='font-white widthfull bg-green btn'>Login</button> */}
          <button onClick={handleSubmit} className='font-white widthfull bg-green btn mt3'>Login</button>
         </form>
           <Link to={'/register'} className='register-btn' ><button className='register-btn mb1 mt2 widthfull btn bg-transparent'>Register</button></Link>
         </div>
        </div>
        <div className="login-img">
        <img src='/login.png' alt='login_page_image' ></img>
        </div>
   </div>

  )
}

export default Login;
