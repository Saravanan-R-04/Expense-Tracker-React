import React from 'react'
import { TiTick } from "react-icons/ti";
const RecentTransaction = ({transaction}) => {
  return (
    <div className="recent-transaction">
    <h4 style={{padding:"15px"}}>RECENT TRANSACTIONS</h4>
    {transaction?transaction.slice(-10).reverse().map((transaction,index)=>(
        <ul  key={index} style={{marginLeft:"-30px",marginBottom:"10px"}}>
            <div style={{display:"flex",marginLeft:"30px"}}>
                <TiTick style={{color:"red",height:"35px",width:"40px",paddingBottom:"-10px"}}/>
                <li style={{marginLeft:"0px",marginTop:"2px"}}>{transaction.category} - {transaction.amount}</li>
            </div>
            
        </ul> 
    )):"No Recent Transaction"}
    </div>
  )
}

export default RecentTransaction