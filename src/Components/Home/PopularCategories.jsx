import React from 'react';
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
const PopularCategories = () => {

  let badgeData = [['Graphics & Design', '305 Open Positions', <MdOutlineDesignServices />], ['Mobile App Development', '500 Open Positions', <TbAppsFilled />], ['Frontend Web Development', '200 Open Positions', <MdOutlineWebhook />], ['MERN STACK Development', '1000+ Open Postions', <FaReact />], 
  ['Account & Finance', '150 Open Positions', <MdAccountBalance />], ['Artificial Intelligence', '867 Open Positions', <GiArtificialIntelligence />], ['Video Animation', '50 Open Positions', <MdOutlineAnimation />], ['Game Development', '80 Open Positions', <IoGameController />]];

  
  return (
    <>
    <div className="popular-categories">
      <h1>Popular Categories</h1>
        <div className='badge-section'>
        { badgeData.map((data) => (
        <div key={data[0]} className="badge">
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
    </div>
    </>
  )
}

export default PopularCategories