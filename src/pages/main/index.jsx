import React from 'react';

import { useGetRequest } from '../../hooks/useGetRequest';
import { Tier } from '../../components/tier';
import { FetchDataWrapper } from '../../components/fetch-data-wrapper';

import './index.css';

export const MainPage = () => {
  const [data, isLoading, error] = useGetRequest('tiers');

  return (
    <React.Fragment>
      <div className='jumbotron'>
        <div className='container'>
          <h1 className='display-3'>Hello, World!</h1>
          <p>
          This is a template for a simple marketing or informational website.
            It includes a large callout called a jumbotron and three supporting
            pieces of content. Use it as a starting point to create something
            more unique.
          </p>
          <p>
            <a className='btn btn-primary btn-lg' href='#' role='button'>
              Learn more »
            </a>
          </p>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
            <FetchDataWrapper data={data} isLoading={isLoading} error={error}>
                {
                  data && data.map(item => <Tier key={item.id} {...item} />)
                }
            </FetchDataWrapper>
        </div>
      </div>
    </React.Fragment>
  );
};