'use client'
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CSSTransition } from 'react-transition-group';
import { json } from 'stream/consumers';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  message: Yup.string()
    .required('Required'),
});

const ContactForm = () => (
  <div>
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          const response = await fetch('/api/contact', {
              method: 'post',
              body: JSON.stringify(values),
          });

          if (!response.ok) {
              setSubmitting(false);
              console.log("falling over")
              throw new Error(`response status: ${response.status}`);
              
          }
          const responseData = await response.json();
          console.log(responseData['message'])
  
          alert('Message successfully sent');
      } catch (err) {
          console.error(err);
          alert("Error, please try resubmitting the form");
      }
      }}
    >
      {({ isSubmitting }) => (
        <Form className='flex flex-col justify-center items-center p-8'>
          <CSSTransition in={true} timeout={500} classNames="fade" appear>
            <div className="mb-4 w-1/2">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <Field type="text" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic" />
            </div>
          </CSSTransition>
          <CSSTransition in={true} timeout={500} classNames="fade" appear>
            <div className="mb-4 w-1/2">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <Field type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>
          </CSSTransition>
          <CSSTransition in={true} timeout={500} classNames="fade" appear>
            <div className="mb-4 w-1/2">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <Field as="textarea" name="message" className="shadow appearance-none h-40 border rounded w-full py-2 px-3 text-gray-700 dark:bg-[#171717] leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="message" component="div" className="text-red-500 text-xs italic" />
            </div>
          </CSSTransition>
          <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ContactForm;