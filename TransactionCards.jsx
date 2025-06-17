import React from 'react'
import '../ExpenseTracker/style.css'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaBalanceScale } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
const TransactionCards = ({balance,income,expense}) => {
  return (
    <div>
        <br />
        <br />
        <div style={{display:"flex"}}>
             <div style={{marginLeft:"150px"}} className='balance'>
                <FaBalanceScale style={{width:"50px",height:"50px",marginLeft:"120px",color:"red"}} />
                <center>
                    <h4 style={{letterSpacing:"3px",marginTop:"15px"}}>BALANCE</h4>
                    <h3 style={{color:"red",marginRight:"17px"}}><LiaRupeeSignSolid style={{color:"red",height:"35px",width:"40px",marginBottom:"10px",marginRight:"-5px"}}/>{balance}</h3>
                </center>
            </div>
            <div className='income' >
                <FaWallet  style={{width:"50px",height:"50px",marginLeft:"120px",color:"red"}} />
                <center>
                    <h4 style={{letterSpacing:"3px",marginTop:"15px"}}>INCOME</h4>
                    <h3 style={{color:"red",marginRight:"17px"}}><LiaRupeeSignSolid style={{color:"red",height:"35px",width:"40px",marginBottom:"10px",marginRight:"-5px"}}/>{income}</h3>
                </center>
            </div>
            <div className='expense'>
                 <GiExpense style={{width:"50px",height:"50px",marginLeft:"120px",color:"red"}}/>
            <center>
                <h4 style={{letterSpacing:"3px",marginTop:"15px"}}>EXPENSE</h4>
                <h3 style={{color:"red",marginRight:"17px"}}><LiaRupeeSignSolid style={{color:"red",height:"35px",width:"40px",marginBottom:"10px",marginRight:"-5px"}}/>{income}</h3>
            </center>
            </div>
        </div>
    </div>
  )
}

export default TransactionCards