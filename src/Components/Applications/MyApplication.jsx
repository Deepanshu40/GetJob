import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../../main';
import ResumeModel from './ResumeModel';

const MyApplication = () => {

  const [applications, setApplications] = useState([]);
  const {user} = useContext(Context);
  const [preview, setPreview] = useState('');

  useEffect(() => {

    const fetch = async () => {
      try {
        if (user.role==='Job seeker') {
          const {data} = await axios.get(
            '/api/v1/application/jobseeker/getall',
            {withCredentials:true})
          setApplications(data.applications);
        } else if (user.role==='Employer') {
          const {data} = await axios.get(
            '/api/v1/application/employer/getall',            
            {withCredentials:true})
          setApplications(data.applications);
        } else {
          setApplications([]);
          console.log('It apears user is not logged in!')
        }
      } catch(error) {
        toast.error(error.response.data.message); 
      }
    }
    fetch();
  },[user.role]);

  // deleting application by applicant
  async function handleDelete(applicationId) {
    
    try {
      await axios.delete(
        `/api/v1/application/jobseeker/delete/${applicationId}`,
         {withCredentials:true});
      setApplications((prevData) => prevData.filter((application) => application._id !== applicationId));
      toast.success('job application deleted successfully!')
    } catch(error) {
      toast.error(error.response.data.message);
    }
  }


  function handlePopup(applicationId) {
    setPreview(applicationId);
  }


  return (
    <div className="myApplications">
      <div className="heading">
        <h1>{user.role === 'Job seeker' ? 'My Applications': 'Application from job seeker'}</h1>
      </div>
      <div className="jobApplications">
        {(applications.length) ?   
        <>
        {applications.map((application) => 
        <>
        <div className='application'>
        <div className="details">
        <p>Name: <span>{application.name}</span></p>  
        <p>Email: <span>{application.email}</span></p>  
        <p>Phone: <span>{application.phone}</span></p>  
        <p className='address'>Address: <textarea disabled value={application.address}></textarea></p>  
        <p className='coverLetter'>CoverLetter: <textarea disabled value={application.coverLetter}></textarea></p>  
        </div>
        <div className="image">
          <img  onClick={() => handlePopup(application._id)} src={application.resume.url} alt="candidate-image" />
        </div>
        {(preview===application._id) && 
        <div className="resumeModel">
        <ResumeModel url={application.resume.url}/>
        </div>    
        }
        {user.role==='Job seeker' && <>
        <div className="btn">
          <button onClick={() => handleDelete(application._id)}>Delete Application</button>
        </div>          
        </>}
        </div>
        <hr style={{margin:'2rem 0'}} />        
        </>
      )}
        </>
        : "There are no job applications to display"}
      </div>
    </div>
  )
}

export default MyApplication
