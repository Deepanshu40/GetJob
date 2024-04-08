import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../main';

const JobDetails = () => {
  
  const [jobData, setJobData] = useState([]);
  const {id} = useParams();
  const {user, setUser, isAuthorized, setIsAuthorized} = useContext(Context);
  useEffect(() => {

    const fetch = async () => {
      try {
        const {data} = await axios.get(
          // `http://localhost:8080/api/v1/job/${id}`,
          `https://getjob-backend-qa7t.onrender.com/api/v1/job/${id}`,
           {withCredentials:true});
        setJobData(data.job)
      } catch (e) {
        toast.error(e.response.data);
      }
    }
    fetch();

  }, [])
 
  return (
    <>
    <div className="single-job-section">
      <div className="heading">
        Job Details
      </div>
      <div className="content">
        <p>Title: <span>{jobData.title}</span></p>
        <p>Category: <span>{jobData.Category}</span></p>
        <p>Country: <span>{jobData.country}</span></p>
        <p>City: <span>{jobData.city}</span></p>
        <p>Location: <span>{jobData.location}</span></p>
        <p>Description: <span>{jobData.description}</span></p>
        {(jobData.salaryFrom) ? (
        <>
        <p>Salary range: <span>Rs. {jobData.salaryFrom} - {jobData.salaryTo}</span></p>
        </>) : <p><span>Rs {jobData.fixedSalary}</span></p>}
        {(user && user.role === 'Job seeker') && <Link to={`/application/${jobData._id}`}><button className='applybtn'>Apply Now</button></Link>}
      </div>
    </div>
    </>
  )
}

export default JobDetails