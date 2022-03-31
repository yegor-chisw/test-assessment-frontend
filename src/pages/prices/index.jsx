import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Service } from '../../components/service'
import { useGetRequest } from '../../hooks/useGetRequest';
import { FetchDataWrapper } from '../../components/fetch-data-wrapper';

import './index.css';

export const PricesPage = () => {
  const [tier, setTier] = useState(null);
  const [data, isLoading, error] = useGetRequest('tiers');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(!data.length) return null;
    const findTier = data.find(item => item.id === params.tid);
    if(!findTier) {
      navigate('/');
    };
    setTier(findTier);
  }, [data, navigate, params.tid]);

  return (
    <React.Fragment>
      <div className='pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center'>
        <h1 className='display-4'>Pricing</h1>
        <p className='lead'>
          Quickly build an effective pricing table for your potential customers
          with this Bootstrap example. It’s built with default Bootstrap
          components and utilities with little customization.
        </p>
      </div>
      <div className='container'>
        <div className='card-deck mb-3 text-center'>
          <FetchDataWrapper data={data} isLoading={isLoading} error={error}>
            { tier.packages.length ? tier.packages.map(item => <Service key={ item.id } { ...item } />) : <span>Empty</span> }
          </FetchDataWrapper>
        </div>
      </div>
    </React.Fragment>
  );
};