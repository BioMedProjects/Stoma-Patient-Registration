import React from 'react'
import { FormWrapper } from '../components/containers'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    const credentialsJsonify = {
      email: data.email,
      password: data.password,
    }
    axios
      .post('http://127.0.0.1:8000/users/login/', credentialsJsonify)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.data))
        if (response.data.data.is_staff) {
          navigate('/accountdoc')
        } else navigate('/select')
      })
      .catch((err) => {
        return err
      })
  }

  return (
    <FormWrapper>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Zaloguj się do swojego konta
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="E-mail"
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Hasło"
              {...register('password', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="ml-2 text-sm text-gray-900">
            Nie masz jeszcze konta?
          </label>
          <a
            href="/registry"
            className="font-medium font-bold text-yellow-400 hover:text-yellow-300"
          >
            {' '}
            Zarejestruj się{' '}
          </a>
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Zaloguj się
        </button>
      </form>
    </FormWrapper>
  )
}
