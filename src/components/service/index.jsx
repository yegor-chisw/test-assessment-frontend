import React from 'react';
import { Link } from 'react-router-dom';

export const Service = ({
  id,
  name,
  cost,
  serviceList,
  button: { textButton, btnClass = 'btn-primary' },
}) => {
  return (
    <div className='card mb-4 shadow-sm'>
      <div className='card-header'>
        <h4 className='my-0 font-weight-normal'>{ name }</h4>
      </div>
      <div className='card-body'>
        <h1 className='card-title pricing-card-title'>
          ${cost} <small className='text-muted'>/ mo</small>
        </h1>
        <ul className='list-unstyled mt-3 mb-4'>
          {
            serviceList && serviceList.map((text, index) => <li key={ index }>{text}</li>)
          }
        </ul>
        <Link to={id}>
          <button type='button' className={`btn btn-lg btn-block ${btnClass}`}>
            { textButton }
          </button>
        </Link>
      </div>
    </div>
  );
};
