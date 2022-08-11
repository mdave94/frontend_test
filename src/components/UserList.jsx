import React from 'react';
import CardItem from './CardItem';

const UserList = ({ userList }) => {
  return (
    <div>
      <div className='cardContainer'>
        {userList.length !== 0
          ? userList.map((person) => (
              <CardItem key={person.cell} props={person} />
            ))
          : null}
      </div>
    </div>
  );
};

export default UserList;
