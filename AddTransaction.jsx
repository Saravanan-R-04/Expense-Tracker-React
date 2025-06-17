import React, { useEffect, useState } from 'react';
import ETNavbar from './Navbar';
import '../ExpenseTracker/style.css';
import { useLocation } from 'react-router-dom';

const AddTransaction = () => {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !category || !desc || !date) {
      return alert("Please fill all the fields");
    }

    const currentTransaction = {
      type: type,
      amount: parseFloat(amount),
      category,
      desc,
      date
    };

    let updatedTransactions = [...transaction];

    if (editIndex === null) {
      updatedTransactions.push(currentTransaction); 
    } else {
      updatedTransactions[editIndex] = currentTransaction; 
    }

    localStorage.setItem("Transaction", JSON.stringify(updatedTransactions));
    setTransaction(updatedTransactions);
    alert("Transaction Added Successfully");

   
    setType("Expense");
    setAmount(0);
    setCategory("");
    setDesc("");
    setDate("");
    setEditIndex(null);
  }

  useEffect(() => {
    let existingTransactions;
    try {
      const storedData = JSON.parse(localStorage.getItem("Transaction"));
      existingTransactions = Array.isArray(storedData) ? storedData : [];
    } catch (e) {
      existingTransactions = [];
    }

    setTransaction(existingTransactions);

    if (location.state && location.state.transaction) {
      const tx = location.state.transaction;
      setType(tx.type);
      setAmount(tx.amount);
      setCategory(tx.category);
      setDesc(tx.desc);
      setDate(tx.date);
      setEditIndex(tx.index);
    }
  }, [location]);

  return (
    <div>
      <ETNavbar />
      <h4 style={{ marginLeft: "550px", marginTop: "80px" }}>
        {editIndex === null ? "Add Transaction" : "Edit Transaction"}
      </h4>
      <form style={{borderRadius:"20px"}} onSubmit={handleSubmit}>
        <br />
        <label>
          <input
            type="radio"
            checked={type === 'Expense'}
            onChange={() => setType("Expense")}
          /> <b>EXPENSE</b>
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            checked={type === 'Income'}
            onChange={() => setType("Income")}
          /> <b>INCOME</b>
        </label>
        <br /><br />
        <input
          placeholder='Amount'
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "370px", height: "35px" }}
        />
        <br /><br />
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          style={{ width: "370px", height: "35px" }}
        >
          <option>Select a Category</option>
          <option value="Salary">Salary</option>
          <option value="Groceries">Groceries</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
        <br /><br />
        <textarea
          placeholder='Description'
          value={desc}
          style={{ width: "370px", height: "75px" }}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <br /><br />
        <input
          placeholder='Date'
          type='date'
          value={date}
          style={{ width: "370px", height: "35px" }}
          onChange={(e) => setDate(e.target.value)}
        />
        <br /><br />
        <button
          type="submit"
          style={{
            width: "370px",
            height: "35px",
            backgroundColor: "red",
            color: "white",
            border: "none"
          }}
        >
          {editIndex === null ? "Add Transaction" : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
