import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";


const HowitWorks = () => {

  return (
    <>
    <div className="howitworks">
      <div className="heading">
        <h1>How JobZee Works</h1>
      </div>
      <div className="cards">
        <div className="card">
          <span><FaUserPlus /></span>
          <h4>Create Account</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima distinctio repellendus dolorum ea excepturi, quasi natus itaque sunt nisi maxime?</p>
        </div>
        <div className="card card-middle">
          <span><MdFindInPage /></span>
          <h4>Find a Job/Post a Job</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima distinctio repellendus dolorum ea excepturi, quasi natus itaque sunt nisi maxime?</p>
        </div>
        <div className="card">
          <span><IoMdSend /></span>
          <h4>Apply For Job/Recruit Suitable Candidates</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima distinctio repellendus dolorum ea excepturi, quasi natus itaque sunt nisi maxime?</p>
        </div>
      </div>
    </div>

    </>
  )
}

export default HowitWorks