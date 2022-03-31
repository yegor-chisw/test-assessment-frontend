import React from 'react';
import { Link } from 'react-router-dom';

export const Tier = ({ title, description, id }) => {
  return (
    <div className='col-md-4'>
      <h2>{ title }</h2>
      <p>{ description }</p>
      <p>
        <Link className='btn btn-secondary' to={id}>View details</Link>
      </p>
    </div>
  );
}