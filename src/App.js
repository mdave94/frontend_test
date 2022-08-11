import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import './App.css';
import ErrorState from './components/ErrorState';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [paginationCurrentItem, setPaginationCurrentItem] = useState(1);
  const [selectedGender, setSelectedGender] = useState('both');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isPrime = (num) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };

  const hasTwoPrime = useCallback((user) => {
    let counter = 0;
    if (user !== undefined) {
      let postCode = user.location.postcode;

      if (postCode !== undefined) {
        postCode = postCode.toString();

        var digits = postCode
          .replace(/\s/g, '') // regex -> remove the whitespace
          .split('')
          .map((iNum) => parseInt(iNum));

        for (let i = 0; i < digits.length; ++i) {
          if (isPrime(digits[i])) {
            counter++;
          }
        }
      }

      if (counter >= 2) {
        return true;
      } else {
        return false;
      }
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://randomuser.me/api/?results=100&gender=${selectedGender}`
      );

      let filteredPersonList = [];
      res.data.results.forEach((element) => {
        if (hasTwoPrime(element)) {
          filteredPersonList.push(element);
        } else return null;
      });
      setUsers(filteredPersonList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Something went wrong with the API please try again');
    }
  }, [hasTwoPrime, selectedGender]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  //get the last user
  const lastUserIndex = paginationCurrentItem * 10;
  //get the first user
  const firstUserIndex = lastUserIndex - 10;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);
  // change page
  const paginate = (pageNumber) => setPaginationCurrentItem(pageNumber);

  return (
    <>
      {loading ? (
        <div className='center'>
          <Loader/>
        </div>
      ) : error ? (
        <>
          <ErrorState error={error} />
          <button onClick={fetchUsers}>Retry</button>
        </>
      ) : (
        <>
          <div className='App'>
            <select
              name='gender'
              id='gender'
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value='both'>Both</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            <UserList userList={currentUsers} />
            <Pagination totalUsers={users.length} paginate={paginate} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
