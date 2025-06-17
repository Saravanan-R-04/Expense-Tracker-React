import React, { useEffect, useState } from 'react';
import ETNavbar from './Navbar';
import TransactionCards from './TransactionCards';
import { Link } from 'react-router-dom';
import RecentTransaction from './RecentTransaction';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const btnstyle = {
    backgroundColor: 'red',
    marginLeft: '1140px',
    color: 'white',
    height: '40px',
    width:"180px",
    marginTop: '40px',
    fontSize:"17px"
  };

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [maxExpense, setMaxExpense] = useState(0);

  const Categories = [
    'Salary',
    'Groceries',
    'Dining',
    'Transport',
    'Entertainment',
    'Others'
  ];

  useEffect(() => {
    let existingtransaction;
    try {
      const storedData = JSON.parse(localStorage.getItem('Transaction'));
      existingtransaction = Array.isArray(storedData) ? storedData : [];
    } catch (error) {
      existingtransaction = [];
    }

    setTransaction(existingtransaction);

    let income = 0;
    let expense = 0;
    let categoryBreakDown = {};
    let highestExpense = 0;

    Categories.forEach(cat => (categoryBreakDown[cat] = 0));

    existingtransaction.forEach(ts => {
      if (ts.type === 'Income') {
        income += ts.amount;
      } else {
        expense += ts.amount;
        categoryBreakDown[ts.category] = (categoryBreakDown[ts.category] || 0) + ts.amount;

        if (categoryBreakDown[ts.category] > highestExpense) {
          highestExpense = categoryBreakDown[ts.category];
        }
      }
    });

    setIncome(income);
    setExpense(expense);
    setBalance(income - expense);
    setCategoryData(categoryBreakDown);
    setMaxExpense(highestExpense);
  }, []);

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: 'red',
        borderRadius: 4
      }
    ]
  };

 const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          weight: 'bold',
          size: 14
        },
        color: 'black'
      }
    },
    title: {
      display: true,
      text: 'Expense Breakdown by Category',
      font: {
        weight: 'bold',
        size: 18
      },
      color: 'black'
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          weight: 'bold',
          size: 12
        },
        color: 'black'
      }
    },
    y: {
      beginAtZero: true,
      max: maxExpense + 100,
      ticks: {
        font: {
          weight: 'bold',
          size: 12
        },
        color: 'black'
      }
    }
  }
};



  return (
    <>
      <ETNavbar />
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginTop: '30px', marginLeft: '20px' }}>Dashboard</h2>
        <button style={btnstyle}>
          <Link to="/AddTransaction" style={{ textDecoration: 'none', color: 'white' }}>
            + Add Transaction
          </Link>
        </button>
      </div>
      <TransactionCards balance={balance} income={income} expense={expense} />
      <div style={{display:"flex"}}>
        <RecentTransaction transaction={transaction} />
      <div style={{ width: '50%', margin: '40px auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
      </div>
    </>
  );
};

export default Dashboard;
