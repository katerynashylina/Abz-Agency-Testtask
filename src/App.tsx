import { Header } from "./components/Header/Header";

import './utils/normalize.scss';
import './utils/reset.scss';
import './App.scss';
import { Users } from "./components/Users/Users";
import { useEffect, useState } from "react";
import { getPositions, getToken, getUsers } from "./helpers/fetchUsers";
import { Form } from "./components/Form/Form";
import { User } from "./types/User";
import { Position } from "./types/Position";

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState('');
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const tokenData = await getToken();
      const usersData = await getUsers(currentPage);
      
      setToken(tokenData);

      if (usersData && usersData.users && usersData.users.length > 0) {
        setUsers(prevUsers => [...prevUsers, ...usersData.users]);
        setCurrentPage(prevPage => prevPage + 1);
      }      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPositions = async () => {
    try {
      const positionsData = await getPositions();
      setPositions(positionsData.positions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleShowMore = () => {
    fetchUsers();
  };

  return (
    <div className="page">
      <div className="page__container">
        <Header />

        <Users
          users={users}
          handleShowMore={handleShowMore}
          // hasNextPage={hasNextPage}
        />

        <Form
          users={users}
          setUsers={setUsers}
          token={token}
          positions={positions}
        />
      </div>
    </div>
  );
}