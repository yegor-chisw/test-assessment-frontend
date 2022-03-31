import React from 'react';

import { Alert } from '../alert';
import { Spinner } from '../spinner';

export const FetchDataWrapper = (props) => {
    const { data, isLoading, error } = props;

    if(isLoading) return <Spinner />;
  
    if(error && !isLoading) return <Alert text={ error.message } />;

    if(data) {
      return (
        <React.Fragment>
          { props.children }
        </React.Fragment>
      )
    }

    return null;
};