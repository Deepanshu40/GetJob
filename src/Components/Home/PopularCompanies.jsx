import React from 'react';
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";


const PopularCompanies = () => {

  let badgeData = [['Microsoft', 'Street 10 Karachi, Pakistan', 10, <FaMicrosoft />], ['Tesla', 'Street 10 Karachi, Pakistan', 5, <SiTesla />], ['Apple', 'Street 10 Karachi, Pakistan', 20,  <FaApple />]];

  
  return (
    <>
    <div className="popular-companies">
      <h1>Top Companies</h1>
        <div className='badge-section'>
        { badgeData.map((data) => (
        <div key={data[0]} className='job-card'>
          <div className="badge">
            <div className="badge-icon">
              <span>{data[3]}</span>
            </div>
            <div className="badge-text">
              <h4>{data[0]}</h4>
              <p>{data[1]}</p>
            </div>
        </div>
        <div className="open-positions">
        <span>Open Positions {data[2]}</span>
        </div>
        </div>
        
        ))}
      </div>
    </div>
    </>
  )
}

export default PopularCompanies