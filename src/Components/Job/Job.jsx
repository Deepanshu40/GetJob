import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { Context } from '../../main';


const Job = () => {
  const {backendUrl} = useContext(Context);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const {data} = await axios.get(
          `${backendUrl}/api/v1/job/getall`, 
          {
        withCredentials:true});
        setJobData(data.jobs)
      } catch (e) {
        toast.error(e)
      }
    }

    fetch();

  }, [])

  return (
    <>
    <div className="alljobs">
      <h1>All Available Jobs</h1>
      {(jobData.length) ? 
      <>
        <div className='badge-section'>
        { jobData.map((data) => (    
        <Link className='navlink' key={data._id} to={`/job/${data._id}`}>
        <div className='job-card'>
          <div className="badge">
            <div className="badge-text">
              <h4>{data.title}</h4>
              <p className='lightstyle'>{data.category}</p>
              <p>{data.country}</p>
          </div>
        </div>
        <div className="jobapply">
        <span>Job Details</span>
        </div>          
      </div>
      </Link>      
      ))}
      </div>      
      </> : "It seems that there are no available current openings"}
    </div>
    </>
  )
}

export default Job;