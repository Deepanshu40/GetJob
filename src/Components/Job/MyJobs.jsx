import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Context} from '../../main';

const MyJobs = () => {
  const {backendUrl} = useContext(Context);
  const [jobData, setJobData] = useState([])
  const [edit, setEdit] = useState(null);

// page refresh
useEffect(() => {
    
  const fetch = async () => {
    try {
      const {data} = await axios.get(
          `${backendUrl}/api/v1/job/getmyjob`,
          {withCredentials:true});
      setJobData(data.myJobs)  
    } catch (e) {
      toast.error(e.response.message);
    }
  }
  fetch();
},[edit])

// taking control of Input fieds
function handleInput(jobId, field, value) {
setJobData((prevJobs) =>
prevJobs.map((job) => 
(job._id === jobId ? {...job, [field]:value}: job)
))}




// saving changes
async function handleAcceptChanges(jobId) {
const updationData = jobData.filter((job) => job._id === jobId)[0];

if (updationData.salaryFrom && !updationData.salaryTo) {
  updationData.fixedSalary = updationData.salaryFrom
  updationData.salaryFrom = null
} else if (updationData.salaryFrom && updationData.salaryTo) {
  updationData.fixedSalary = null;
}
console.log(updationData);
try {
await axios.put(
  `${backendUrl}/api/v1/job/updatejob/${jobId}`,
   updationData, {
  headers: {
    "content-Type":"application/json"
  },
  withCredentials:true
})
setEdit(null);
toast.success('job details updated');
} catch(error) {
toast.error(error.response.data.message);
}}


// deleting job
async function handleDelete(jobId) {
  try {
    await axios.delete(
      `${backendUrl}/api/v1/job/deletejob/${jobId}`,
       {withCredentials:true});
    setEdit(null);
    toast.success('Job deleted successfully')
    setJobData((prevData) => prevData.filter((job) => job._id !== jobId));
  }
  catch(error) {
    console.dir(error);
    toast.error(error.response.data.message);
  }

}
console.log(edit);
const jobCategory = ['GraphicsDesign', 'Mern Stack Developer', 'Accounts and Finance', 'Marketing & Sales', 'IT & Software' ,'Logistics Operation', 'Content writer', 'Graphic Designer', 'computer data operator'];



  return (
    <div className='job-posted-by-me'>
    <h1>Your Posted Jobs</h1>
    {(jobData.length) ? 
    <>
    <div className='jobs-posted'>
    {jobData.map((data) => 
    <>
    <div key={data._id} className="jobdetail">
      <div className="jobinfo">
            <div className="row">
            <div className="col">
              <label htmlFor="title">Title: </label>
              <input type="text" id='label' value={data.title} onChange={(e) => handleInput(data._id, 'title', e.target.value)} disabled={(edit === data._id) ? false:true}/>
            </div>
            <div className="col">
              <label htmlFor="description">Description: </label>
              <textarea type="text" id='description' value={data.description} onChange={(e) => handleInput(data._id, 'description', e.target.value)}  disabled={(edit === data._id) ? false:true}/>
            </div>
          </div>
          <div className="col">
          <label htmlFor="country">Country: </label>
          <input type="text" id='country' value={data.country} onChange={(e) => handleInput(data._id, 'country', e.target.value)}  disabled={(edit === data._id) ? false:true}/>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="title">City: </label>
              <input type="text" id='city' value={data.city} onChange={(e) => handleInput(data._id, 'city', e.target.value)}  disabled={(edit === data._id) ? false:true}/>
            </div>
            <div className="col">
              <label htmlFor="location">Location: </label>
              <input type="text" id='location' value={data.location} onChange={(e) => handleInput(data._id, 'location', e.target.value)}  disabled={(edit === data._id) ? false:true}/>
            </div>
          </div>
          <div className="col">
          <label htmlFor="category">Category: </label>
          <select id='category' value={data.category} onChange={(e) => handleInput(data._id, 'category', e.target.value)} disabled={(edit === data._id) ? false:true}>
          {jobCategory.map((category) => (<option key={category} value={category}>{category}</option>))}
          </select>
          </div>
          {/* error coming in this section */}
          <div className="col">
          {(data.fixedSalary) ?
          <>
          <label id='fixedSalary'>Fixed Salary</label>
          <input type="number" id='fixedSalary' value={data.fixedSalary} onChange={(e) => handleInput(data._id, 'fixedSalary', e.target.value)}  disabled={(edit === data._id) ? false:true}/>          
          </> 
            :
          <>
          <label id='rangedSalary'>Ranged Salary</label>
          <div className='salaryType'>
          <input type="number" id='salaryFrom' value={data.salaryFrom} onChange={(e) => handleInput(data._id, 'salaryFrom', e.target.value)}  disabled={(edit === data._id) ? false:true}/> 
          <input type="number" id='salaryTo' value={data.salaryTo} onChange={(e) => handleInput(data._id, 'salaryTo', e.target.value)}  disabled={(edit === data._id) ? false:true}/>
          </div>
          </>
        }        
          </div>
          <div className="col">
            <label htmlFor="expired">Expired: </label>
            <select id="isexpired" value={data.expired} onChange={(e) => handleInput(data._id, 'expired', e.target.value)} disabled={(edit === data._id) ? false:true}>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
      </div>
      <div className="modify">
      <button className={(edit === data._id) ? 'editbtn-editmode': 'editbtn'} onClick={() => setEdit(data._id)}>Edit</button>
        {edit===data._id && <>
        <br />
        <div className="editbtn-group">
      <button className={(edit === data._id) && 'acceptbtn'} onClick={() => handleAcceptChanges(data._id)}><DoneOutlinedIcon></DoneOutlinedIcon></button>
        <button className={(edit === data._id) && 'cancelbtn'} onClick={() => setEdit(null)}><CloseOutlinedIcon></CloseOutlinedIcon></button>
        </div>
        </>}
        <button className='deletebtn' onClick={()=> handleDelete(data._id)}>Delete</button>
      </div>
    </div>
    <hr style={{width:'90%', margin:'1rem auto 0'}}/>
    </>
    )}
    </div>    
    
    </> : <p className='disclaimer'>You've not posted any job or may be you deleted all of your jobs!</p>
    }
    </div>
  )
}

export default MyJobs
