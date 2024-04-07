import React from 'react'
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {

  let badgeData = [['1,23,441', 'Live Job', <FaSuitcase />], ['91220', 'Companies', <FaBuilding />], ['2,34,200', 'Job Seekers', <FaUsers />], ['1,03,761', 'Employers', <FaUserPlus />]];

  return (
    <>
      <div className='hero-section'>
      <div className="hero-section-left">
      <h1>Find a job that suits</h1>
      <h1>your interests and skills</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ducimus soluta neque. Cupiditate enim a optio placeat, dicta reiciendis, cumque esse veritatis sit ad ab incidunt provident quasi facere fuga.</p>
      </div>
      <div className="hero-section-right">
      <img src="/heroS.jpg" alt="hero-section-image" />
      </div>
      </div>

      <div className='hero-badge-section'>
        { badgeData.map((data) => (
        <div key={data[1]} className="badge">
          <div className="badge-icon">
            <span>{data[2]}</span>
          </div>
          <div className="badge-text">
            <h4>{data[0]}</h4>
            <p>{data[1]}</p>
          </div>
        </div>
        ))}
      </div>

  
    </>

  )
}

export default HeroSection