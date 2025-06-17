import React, { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { BsChatRightQuote } from "react-icons/bs";
import { RxReset } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { GiExpense } from "react-icons/gi";
const ETNavbar = () => {
  const[quote,setQuote]=useState(null);
  const[isModalOpen,setIsModalOpen]=useState(false);
  const navigate=useNavigate();
  const fetchQuote = async ()=>{
    try{
        const response=await fetch('https://quotes-api-self.vercel.app/quote');
        const data= await response.json();
        setQuote(data.quote);
        setIsModalOpen(true);
    }
    catch(e)
    {
      console.log(e);
    }
  }
  function handleReset(){
    localStorage.clear();
    navigate("/")
    window.location.reload();
  }
  return (
    <div className='etapp'>
        <div style={{display:"flex"}}>
            <GiExpense style={{color:"red",width:"40px",height:"50px"}} />
            <h4 style={{paddingTop:"17px"}}>ExpenseTracker</h4>
        </div>
        
        <ul>
              <li>
                <Link to="/Dashboard" style={{color:"black",textDecoration:"none"}}><MdOutlineDashboard  style={{color:"red",height:"25px",width:"30px",marginBottom:"5px"}} /> Dashboard</Link>
              </li>
              <li>
                <Link to="/Transaction" style={{color:"black",textDecoration:"none"}}><AiOutlineTransaction style={{color:"red",height:"25px",width:"30px",marginBottom:"5px"}}/> Transaction</Link>
              </li>
              <li  style={{color:"black",textDecoration:"none"}} onClick={fetchQuote}><BsChatRightQuote style={{color:"red",height:"25px",width:"30px",marginBottom:"4px"}}/> Quote</li>
              <li  style={{color:"black",textDecoration:"none"}} onClick={handleReset}> <RxReset style={{color:"red",height:"25px",width:"30px",marginBottom:"4px"}}/> Reset</li>
              <li>
                <Link to="/Profile" style={{color:"black",textDecoration:"none"}}><CgProfile style={{color:"red",height:"25px",width:"30px",marginBottom:"4px"}}/> Profile</Link>
              </li>
        </ul>
        {
          isModalOpen 
          && <div className='modal-overlay'>
                <div className='modal-content'>
                    <h6>{quote}</h6>
                    <button className='cls-btn' onClick={()=>setIsModalOpen(false)}>Close</button>
                </div>
          </div>
        }
    </div>
  )
}

export default ETNavbar