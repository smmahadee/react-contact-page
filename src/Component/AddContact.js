import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { contactAction, formAction } from '../Store';

export default function AddContact() {
  const showModal = useSelector(state => state.formSlice.isShowModal);
  const dispatch = useDispatch();

  // using react hook form library
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // handling form submission
  const onSubmit = data => {
    dispatch(contactAction.saveContact(data));
    dispatch(formAction.closeForm());
    reset({});
  };

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-96 my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='px-3 py-8  rounded-lg shadow-lg relative flex flex-col justify-center items-center bg-white '>
                <button
                  className='absolute top-3 right-5'
                  onClick={() => dispatch(formAction.closeForm())}
                >
                  <FontAwesomeIcon icon={faTimes} size='1x' />
                </button>
                <h4 className='mb-5'>Contact Info</h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='inputParent'>
                    <label htmlFor='name'>Name</label>
                    <div className='flex flex-col'>
                      <input
                        {...register('firstName', { required: true })}
                        className='input '
                        type='text'
                        id='name'
                        placeholder='First Name'
                      />
                      {errors.firstName?.type === 'required' && (
                        <div className='error'>First name is required</div>
                      )}
                      <input
                        {...register('lastName', { required: true })}
                        className='input mt-3'
                        type='text'
                        placeholder='Surename'
                      />
                      {errors.lastName?.type === 'required' && (
                        <div className='error'>Sure name is required</div>
                      )}
                    </div>
                  </div>
                  <div className='inputParent '>
                    <label htmlFor='emal'>Email Address</label>
                    <div>
                      <input
                        className='input text-md'
                        placeholder='Your email'
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                      />
                      {errors.email && (
                        <div className='error'>{errors.email.message}</div>
                      )}
                    </div>
                  </div>
                  <div className='inputParent '>
                    <label htmlFor='phone'>Contact Number</label>
                    <div>
                      <input
                        className='input text-md'
                        type='number'
                        id='phone'
                        placeholder='e.g +01825332455'
                        {...register('phone', {
                          required: 'Phone Number is required',
                        })}
                      />

                      {errors.phone && (
                        <div className='error'>{errors.phone.message}</div>
                      )}
                    </div>
                  </div>
                  <button
                    className='btn bg-primary-color float-right text-sm'
                    type='submit'
                  >
                    Save Contact
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
