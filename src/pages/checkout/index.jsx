import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Form } from './form';
import { useGetRequest } from '../../hooks/useGetRequest';
import { FetchDataWrapper } from '../../components/fetch-data-wrapper';

const promoCost = 5;

export const CheckoutPage = () => {
  const [data, isLoading, error] = useGetRequest('tiers');
  const [tier, setTier] = useState(null);
  const [packag, setPackage] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.length) return null;
    const findTier = data.find((item) => item.id === params.tid);
    if (!findTier) {
      navigate('/');
    }
    setTier(findTier);
  }, [data, navigate, params.tid]);

  useEffect(() => {
    if (!tier.packages.length) return null;
    const findPackage = tier.packages.find((item) => item.id === params.pid);
    if (!findPackage) {
      navigate('/');
    }
    setPackage(findPackage);
  }, [tier, params.pid, navigate]);

  return (
    <div className='container'>
      <div className='py-5 text-center'>
        <h2>Checkout form</h2>
        <p className='lead'>
          Below is an example form built entirely with Bootstrap’s form
          controls. Each required form group has a validation state that can be
          triggered by attempting to submit the form without completing it.
        </p>
      </div>
      <FetchDataWrapper data={data} isLoading={isLoading} error={error}>
        {tier && packag && (
          <div className='row'>
            <div className='col-md-8 order-md-1'>
              <h4 className='mb-3'>Billing address</h4>
              <Form tierId={params.tid} packageId={params.pid} />
            </div>
            <div className='col-md-4 order-md-2 mb-4'>
              <h4 className='d-flex justify-content-between align-items-center mb-3'>
                <span className='text-muted'>Your cart</span>
                <span className='badge badge-secondary badge-pill'>3</span>
              </h4>
              <ul className='list-group mb-3'>
                <li className='list-group-item d-flex justify-content-between lh-condensed'>
                  <div>
                    <h6 className='my-0'>{tier.title}</h6>
                    <small className='text-muted'>{packag.name}</small>
                  </div>
                  <span className='text-muted'>{'$' + packag.cost}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between bg-light'>
                  <div className='text-success'>
                    <h6 className='my-0'>Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className='text-success'>{'-$' + promoCost}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                  <span>Total (USD)</span>
                  <strong>
                    {'$'}
                    {packag.cost - promoCost > 0 ? packag.cost - promoCost : 0}
                  </strong>
                </li>
              </ul>

              <form className='card p-2'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Promo code'
                  />
                  <div className='input-group-append'>
                    <button type='submit' className='btn btn-secondary'>
                      Redeem
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </FetchDataWrapper>
    </div>
  );
};
