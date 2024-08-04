import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const PostJob = () => {

  const jobCategory = ['GraphicsDesign', 'Mern Stack Developer', 'Marketing & Sales', 'IT & Software' , 'Accounts and Finance', 'Logistics Operation', 'Content writer', 'Graphic Designer', 'computer data operator'];
  const {user, setUser, isAuthorized, setIsAuthorized, backendUrl} = useContext(Context);
  const [data, setData] = useState({
    description: '',
    category: '',
    country: '',
    city: '',
    location: '',
    salaryFrom: '',
    salaryTo: '',
    fixedSalary: '',
  });

  const [salarytype, setSalaryType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/job/post`,
         data, {
        headers: {
        "Content-Type": "application/json"
      },
        withCredentials:true
        }
      );
      const {message} = response.data
      setData({
        title: '',
        description: '',
        category: '',
        country: '',
        city: '',
        location: '',
        salaryFrom: '',
        salaryTo: '',
        fixedSalary: '',
      });
      toast.success(message)

    } catch(e) {
      toast.error(e.response.data.message)
      }
}

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleSelect = (e) => {
    setSalaryType(e.target.value);
  }

  return (
    <div className='post-job-section'>
      <div className="heading">
      <h1>Post New Job</h1>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="job-detail">
          <input name='title' placeholder='Job Title' value={data.title} onChange={handleInput} />
          <select name="category" value={data.category} onChange={handleInput}>Select Category
          <option>Select Category</option>
          {jobCategory.map((category) => (<option key={category} value={category}>{category}</option>))}
          </select>
          </div>
          <div className="job-detail">
          <input name='country' placeholder='Country' value={data.country} onChange={handleInput} />
          <input name='city' placeholder='City' value={data.city} onChange={handleInput} />            
          </div>
            <input name='location' placeholder='Location' value={data.location} onChange={handleInput} />
            <select value={salarytype} id="salary" onChange={handleSelect}>
              <option value="Select Salary Type">Select salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option  value="Ranged Salary">Ranged Salary</option>
            </select>
            {(salarytype === 'Fixed Salary') ?
            <input name='fixedSalary' placeholder='Enter fixed Salary' value={data.fixedSalary} onChange={handleInput} />
              :
              (salarytype === 'Ranged Salary') ?
              <div className='job-detail'>
              <input name='salaryFrom' placeholder='Salary From' value={data.salaryFrom} onChange={handleInput} />
              <input name='salaryTo' placeholder='Salary To' value={data.salaryTo} onChange={handleInput} />                
              </div>
              :
              <p className='mandatory-field'>Please provide Salary Type<sup>*</sup></p>
              }
            <textarea name='description' placeholder='Job Description' rows={7} value={data.description} onChange={handleInput} />
              <button className='post-job-btn' type='submit'>Post Job</button>
        </form>

      </div>
  )
}

export default PostJob