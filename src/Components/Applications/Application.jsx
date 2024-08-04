import React, { useContext, useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Context} from '../../main';

const Application = () => {
  const {user, backendUrl} = useContext(Context);
  const [applicationData, setApplicationData] = useState({
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:'',
    coverLetter:'',
    resume:''
  });


  const {id} = useParams();
  console.log(user);
  const navigate = useNavigate();

  function handleInput(e) {
    if (e.target.name==='resume') {
    setApplicationData({...applicationData, [e.target.name]:e.target.files[0]})
    } else {
      setApplicationData({...applicationData, [e.target.name]:e.target.value})
    }
  }

  async function submitApplication() {
    const formData = new FormData();
    formData.append("name", applicationData.name);
    formData.append("email", applicationData.email);
    formData.append("phone", applicationData.phone);
    formData.append("address", applicationData.address);
    formData.append("coverLetter", applicationData.coverLetter);
    formData.append("resume", applicationData.resume);
    formData.append("jobId", id);

    try {
      await axios.post(
        `${backendUrl}/api/v1/application/jobseeker/post`,
       formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true
      })
      setApplicationData({
        name:'',
        email:'',
        phone:'',
        address:'',
        coverLetter:'',
        resume:''
      })
      toast.success('Application sent successfully');
      navigate('/job/getall');
    } catch(error) {
      toast.error(error.response.data.message);
      console.dir(error);
    }
  }

  return (
  <>
    <div className="applicationForm">
      <div className="heading">
      <h1>Application Form</h1>
      </div>
      <div className="formData">
          <input type="text" placeholder='Your Name' name='name' onChange={handleInput} value={applicationData.name}/>
          <input type="email" placeholder='Your Email' name='email' onChange={handleInput} value={applicationData.email}/>
          <input type="phone" placeholder='Your Phone Number' name='phone' onChange={handleInput} value={applicationData.phone}/>
          <input type="text" placeholder='Your address' name='address' onChange={handleInput} value={applicationData.address}/>
          <textarea id="" cols="30" rows="5" placeholder='Your cover letter...' name='coverLetter' onChange={handleInput} value={applicationData.coverletter}></textarea>
          <label htmlFor='resume'>Select Resume</label>
          <input type="file" id='resume' name='resume' onChange={handleInput}/>
          <button onClick={submitApplication}>Send Application</button>
      </div>
    </div>
  </>
  )
}

export default Application