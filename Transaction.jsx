import React from 'react';
import ETNavbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { width } from '@fortawesome/free-regular-svg-icons/faAddressBook';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TransactionImg from '../ExpenseTracker/Transaction.jpg'
const tableStyle = {
  width: '60%',
  margin: '40px auto',
  borderCollapse: 'collapse',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
  borderRadius:"12px"
};

const thStyle = {
  backgroundColor: '#FF4040FF',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ccc',
};

const tdStyle = {
  padding: '10px 12px',
  borderBottom: '1px solid #eee',
};

const buttonStyle = {
  padding: '6px 12px',
  margin: '0 4px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#2196F3',
  color: 'white',
  width:"120px",
  marginLeft:"10px"
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#f44336',
  color: 'white',
  width:"120px",
  marginLeft:"60px"
};
const Transaction = () => {
  const navigate=useNavigate();
  let Transactions;
  try {
    const data = JSON.parse(localStorage.getItem("Transaction"));
    Transactions = Array.isArray(data) ? data : [];
  } catch (e) {
    Transactions = [];
  }

  function handleEdit(index)
  {
    const editTransaction=Transactions[index];
    navigate('/AddTransaction',{state:{transaction:{...editTransaction,index}}})
  }
  function handleDelete(index) {
  const updatedTransaction = Transactions.filter((_, i) => i !== index);
  localStorage.setItem("Transaction", JSON.stringify(updatedTransaction));
  window.location.reload(); 
}

  return (
    <>
      <ETNavbar />
      <h4 style={{marginLeft:"600px",marginTop: '50px', fontFamily: 'Arial',marginBottom:"-30px"}}>TRANSACTION HISTORY</h4>
      <br />
      <br />
      {Transactions.map((tx, index) => (
             <div className="card d-inline-block" style={{width:"370px",marginLeft:"40px"}} key={index}>
                <img src={TransactionImg} style={{width:"370px",height:"200px"}} className="card-img-top"/>
                <div className="card-body">
                  <u><h4 style={{marginLeft:"5px"}} className="card-title">{tx.category}</h4></u>
                  <p style={{marginLeft:"5px"}} className="card-text">{tx.desc}</p>
                </div>
                <div>
                  <h6 style={{marginLeft:"22px"}}>AMOUNT: {tx.amount}</h6>
                  <h6 style={{marginLeft:"22px"}}>DATE: {tx.date}</h6>
                  <h6 style={{marginLeft:"22px"}}>TYPE: {tx.type}</h6>
                </div>
                <div className="card-body">
                  <button style={editButtonStyle} onClick={()=>handleEdit(index)}>EDIT</button>
                   <button style={deleteButtonStyle} onClick={()=>handleDelete(index)}>DELETE</button>
                </div>
            </div>
        ))}
    </>
  );
};

export default Transaction;
