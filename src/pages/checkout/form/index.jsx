import React, { useMemo, useState } from 'react';
import { Alert } from '../../../components/alert';

import './index.css';

const initForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  address: '',
  address2: '',
  country: '',
  state: '',
  zip: '',
  sameAddress: false,
  saveInfo: false,
  paymentMethod: 'credit',
  cardName: '',
  cardNumber: '',
  cardExpiration: '',
  cardCVV: '',
};

const initSubmitStatus = {
  isSending: false,
  status: null,
  message: '',
};

export const Form = ({ tierId, packageId }) => {
  const [form, setForm] = useState(initForm);
  const [submitStatus, setSubmitStatus] = useState(initSubmitStatus);

  const clearForm = () => {
    setForm(initForm);
  };

  const clearSubmitStatus = () => {
    setSubmitStatus(initSubmitStatus);
  };

  const onChange = (e) => {
    if(!e.target) return;

    const { value, name, type } = e.target;
    setForm(prev => {
      const prevState = { ...prev };
      prevState[name] = type === 'checkbox' ? !prevState[name] : value;
      return prevState;
    })
  };

  const submit = async (e) => {
    e.preventDefault();


    console.log({
      ...form,
      tierId,
      packageId,
  });

    setSubmitStatus(prev => {
      return {...prev, isSending: true};
    });
    try {
      await fetch('https://jsonplaceholder.typicode.com/comments');
      setSubmitStatus(prev => {
        return { status: 200, isSending: false, message: 'success'};
      });
      setTimeout(() => {
        clearForm();
        clearSubmitStatus();
      }, 2000);
    } catch (error) {
      setSubmitStatus(prev => {
        return { status: 400, isSending: false, message: 'error'};
      });
      setTimeout(() => {
        clearSubmitStatus();
      }, 2000);
    }
    // await fetch() .... 
  };

  const showAlert = useMemo(() => {
    switch (submitStatus.status) {
      case 200:
        return <Alert text={submitStatus.message} type='success' />;

      case 400:
        return <Alert text={submitStatus.message} type='danger' />
    
      default:
        return null;
    }
  }, [submitStatus.message, submitStatus.status]);

  return (
    <form className='needs-validation' noValidate='' onSubmit={ submit }>
      <div className='row'>
        <div className='col-md-6 mb-3'>
          <label htmlFor='firstName'>First name</label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            name='firstName'
            placeholder='First Name'
            value={form.firstName}
            required
            onChange={ onChange }
          />
          <div className='invalid-feedback'>Valid first name is required.</div>
        </div>
        <div className='col-md-6 mb-3'>
          <label htmlFor='lastName'>Last name</label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            name='lastName'
            placeholder='Last Name'
            value={form.lastName}
            onChange={ onChange }

            required
          />
          <div className='invalid-feedback'>Valid last name is required.</div>
        </div>
      </div>

      <div className='mb-3'>
        <label htmlFor='username'>Username</label>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>@</span>
          </div>
          <input
            type='text'
            className='form-control'
            id='username'
            name='username'
            placeholder='Username'
            value={form.Username}
            onChange={ onChange }
            required
          />
          <div className='invalid-feedback'>
            Your username is required.
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <label htmlFor='email'>
          Email <span className='text-muted'>(Optional)</span>
        </label>
        <input
          type='email'
          className='form-control'
          id='email'
          name='email'
          placeholder='you@example.com'
          value={form.email}
          onChange={ onChange }
        />
        <div className='invalid-feedback'>
          Please enter a valid email address for shipping updates.
        </div>
      </div>

      <div className='mb-3'>
        <label htmlFor='address'>Address</label>
        <input
          type='text'
          className='form-control'
          id='address'
          name='address'
          placeholder='1234 Main St'
          value={form.address}
          onChange={ onChange }
          required
        />
        <div className='invalid-feedback'>
          Please enter your shipping address.
        </div>
      </div>

      <div className='mb-3'>
        <label htmlFor='address2'>
          Address 2 <span className='text-muted'>(Optional)</span>
        </label>
        <input
          type='text'
          className='form-control'
          id='address2'
          name='address2'
          placeholder='Apartment or suite'
          value={form.address2}
          onChange={ onChange }

        />
      </div>

      <div className='row'>
        <div className='col-md-5 mb-3'>
          <label htmlFor='country'>Country</label>
          <select
            className='custom-select d-block w-100'
            id='country'
            name='country'
            required
            value={form.country}
            onChange={ onChange }
          >
            <option value=''>Choose...</option>
            <option value='usa'>United States</option>
          </select>
          <div className='invalid-feedback'>Please select a valid country.</div>
        </div>
        <div className='col-md-4 mb-3'>
          <label htmlFor='state'>State</label>
          <select
            className='custom-select d-block w-100'
            name='state'
            id='state'
            required
            value={form.state}
            onChange={ onChange }
          >
            <option value=''>Choose...</option>
            <option value='california'>California</option>
          </select>
          <div className='invalid-feedback'>Please provide a valid state.</div>
        </div>
        <div className='col-md-3 mb-3'>
          <label htmlFor='zip'>Zip</label>
          <input
            type='text'
            className='form-control'
            id='zip'
            name='zip'
            placeholder='zip'
            value={form.zip}
            required=''
            onChange={ onChange }
          />
          <div className='invalid-feedback'>Zip code required.</div>
        </div>
      </div>


      <hr className='mb-4' />


      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='same-address'
          name='sameAddress'
          checked={form.sameAddress}
          onChange={ onChange }
        />
        <label className='custom-control-label' htmlFor='same-address'>
          Shipping address is the same as my billing address
        </label>
      </div>


      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='save-info'
          name='saveInfo'
          checked={form.saveInfo}
          onChange={ onChange }
        />
        <label className='custom-control-label' htmlFor='save-info'>
          Save this information for next time
        </label>
      </div>


      <hr className='mb-4' />

      <h4 className='mb-3'>Payment</h4>

      <div className='d-block my-3'>
        <div className='custom-control custom-radio'>
          <input
            id='credit'
            name='paymentMethod'
            type='radio'
            className='custom-control-input'
            checked={form.paymentMethod === 'credit'}
            value='credit'
            onChange={ onChange }
            required=''
          />
          <label className='custom-control-label' htmlFor='credit'>
            Credit card
          </label>
        </div>
        <div className='custom-control custom-radio'>
          <input
            id='debit'
            name='paymentMethod'
            type='radio'
            className='custom-control-input'
            required=''
            value='debit'
            checked={form.paymentMethod === 'debit'}
            onChange={ onChange }
          />
          <label className='custom-control-label' htmlFor='debit'>
            Debit card
          </label>
        </div>
        <div className='custom-control custom-radio'>
          <input
            id='paypal'
            name='paymentMethod'
            type='radio'
            className='custom-control-input'
            required=''
            value='paypal'
            checked={form.paymentMethod === 'paypal'}
            onChange={ onChange }
          />
          <label className='custom-control-label' htmlFor='paypal'>
            PayPal
          </label>
        </div>
      </div>


      <div className='row'>
        <div className='col-md-6 mb-3'>
          <label htmlFor='cc-name'>Name on card</label>
          <input
            type='text'
            className='form-control'
            id='card-name'
            name='cardName'
            placeholder=''
            required=''
            value={form.cardName}
            onChange={ onChange }
          />
          <small className='text-muted'>Full name as displayed on card</small>
          <div className='invalid-feedback'>Name on card is required</div>
        </div>
        <div className='col-md-6 mb-3'>
          <label htmlFor='cc-number'>Credit card number</label>
          <input
            type='text'
            className='form-control'
            id='card-number'
            name='cardNumber'
            placeholder=''
            required=''
            value={form.cardNumber}
            onChange={ onChange }
          />
          <div className='invalid-feedback'>Credit card number is required</div>
        </div>
      </div>


      <div className='row'>
        <div className='col-md-3 mb-3'>
          <label htmlFor='cc-expiration'>Expiration</label>
          <input
            type='text'
            className='form-control'
            id='card-expiration'
            name='cardExpiration'
            placeholder=''
            required=''
            value={form.cardExpiration}
            onChange={ onChange }
          />
          <div className='invalid-feedback'>Expiration date required</div>
        </div>
        <div className='col-md-3 mb-3'>
          <label htmlFor='cc-cvv'>CVV</label>
          <input
            type='text'
            className='form-control'
            id='card-cvv'
            name='cardCVV'
            placeholder=''
            required=''
            value={form.cardCVV}
            onChange={ onChange }
          />
          <div className='invalid-feedback'>Security code required</div>
        </div>
      </div>


      <hr className='mb-4' />
      <button className='btn btn-primary btn-lg btn-block' type='submit' disabled={submitStatus.isSending}>
        {submitStatus.isSending && (
            <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
        )}
        Continue to checkout
      </button>
      { showAlert }
    </form>
  );
};
