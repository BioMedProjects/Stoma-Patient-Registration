import React from 'react'
import { FormWrapper } from '../components/containers'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Registry() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    const postData = {
      is_staff: false,
      first_name: data.name,
      last_name: data.lastName,
      email: data.email,
      email2: data.email,
      password: data.password,
    }
    axios
      .post('http://127.0.0.1:8000/users/register/', postData)
      .then(() => {
        const credentialsJsonify = {
          email: data.email,
          password: data.password,
        }
        axios
          .post('http://127.0.0.1:8000/users/login/', credentialsJsonify)
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.data))
            navigate('/select')
          })
          .catch((err) => {
            return err
          })
      })
      .catch((err) => {
        return err
      })
  }
  return (
    <FormWrapper>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Rejestracja konta pacjenta
        </h2>
      </div>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Imię
            </label>
            <input
              {...register('name', { required: true })}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
              id="grid-first-name"
              type="text"
              placeholder="Jan"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Nazwisko
            </label>
            <input
              {...register('lastName', { required: true })}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
              id="grid-last-name"
              type="text"
              placeholder="Kowalski"
            />
          </div>
          <div className="w-full px-3 mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              E-mail
            </label>
            <input
              {...register('email', { required: true })}
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
              placeholder="E-mail"
            />
          </div>
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Hasło
            </label>
            <input
              {...register('password', { required: true })}
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 focus:z-10 sm:text-sm"
              placeholder="Hasło"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="ml-2 text-sm text-gray-900">Masz już konto?</label>
          <a
            href="/login"
            className="font-medium font-bold text-yellow-400 hover:text-yellow-300"
          >
            {' '}
            Zaloguj się{' '}
          </a>
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Zarejestruj się
        </button>
      </form>
    </FormWrapper>
  )
}
