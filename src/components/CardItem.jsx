import React from 'react';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { BiCake, BiHomeAlt } from 'react-icons/bi';

const CardItem = ({ props }) => {
  return (
    <div className='cardItemContainer'>
      <div>
        <img
          className='cardImg'
          src={props.picture.large}
          alt='profilePicture'
        />
      </div>
      <div className='cardInfoContainer'>
        <p className='name'>
          {props.name.title} {props.name.first} {props.name.last}
        </p>
        <div className='cardInfoRow'>
          {props.gender === 'male' ? <BsGenderMale /> : <BsGenderFemale />}
          <p className='cardInfoItem'>{props.gender}</p>
        </div>
        <div className='cardInfoRow'>
          <BiCake />
          <p className='cardInfoItem'>
            {props.dob.date.split('T')[0]} ({props.dob.age})
          </p>
        </div>
        <div className='cardInfoRow'>
          <BiHomeAlt />
          <p className='cardInfoItem'>
            {props.location.country} {props.location.postcode}{' '}
            {props.location.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
