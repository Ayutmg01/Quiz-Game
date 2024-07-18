"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, RadioGroup, Radio } from "@nextui-org/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();

  const handleBackToLoginClick = () => {
    router.push('/'); // Navigate back to the login page
  };

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    location: Yup.string()
      .required('Required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
      location: ''
    },
    validationSchema: registerSchema,
    onSubmit: async values => {
      try {
        await axios.post('http://localhost:8000/register', {
          username: values.username,
          email: values.email,
          password: values.password,
          location: values.location,
        });
        alert('Registration successful!');
        router.push('/');
      } catch (error) {
        console.error(error);
        alert('Registration failed. Please try again.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-[500px]">
        <CardHeader className="flex gap-3">
          <img
            src="/QuizLogo.jpg"
            width={100}
            height={40}
            style={{ borderRadius: '8px' }}
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">REGISTER</p>
            <p className="text-small text-default-500">Create your account</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-4">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              className="p-2 border border-gray-300 rounded"
            />
            <div className="text-red-500">{formik.errors.username}</div>

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              className="p-2 border border-gray-300 rounded"
            />
            <div className="text-red-500">{formik.errors.email}</div>

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              className="p-2 border border-gray-300 rounded"
            />
            <div className="text-red-500">{formik.errors.password}</div>

            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
              onBlur={formik.handleBlur}
              className="p-2 border border-gray-300 rounded"
            />
            <div className="text-red-500">{formik.errors.confirmpassword}</div>

            <RadioGroup
              label="Select your location"
              orientation="horizontal"
              onChange={value => formik.setFieldValue('location', value)}
              value={formik.values.location}
              className="flex flex-row justify-between"
            >
              <Radio value="Kathmandu">Kathmandu</Radio>
              <Radio value="Sydney">Sydney</Radio>
              <Radio value="San Francisco">San Francisco</Radio>
              <Radio value="London">London</Radio>
              <Radio value="Tokyo">Tokyo</Radio>
            </RadioGroup>
            <div className="text-red-500">{formik.errors.location}</div>

            <Button auto style={{ backgroundColor: '#000', color: '#FFD700' }} type="submit">
              Register
            </Button>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex flex-col items-center">
            <Button auto style={{ backgroundColor: '#000', color: '#FFD700' }} onClick={handleBackToLoginClick}>
              Back to Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
