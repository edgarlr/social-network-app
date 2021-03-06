import React, { Fragment, useContext } from 'react'
import { UserForm } from '../Components/UserForm'
import { Context } from '../Context'
import { RegisterMutation } from '../Containers/RegisterMutation'
import { LoginLink } from '../Components/LoginLink'

export const NotRegisteredUser = () => {
  const { activateAuth } = useContext(Context)
  return (
    <Fragment>
      <RegisterMutation>
        {(register, { data, loading, error }) => {
          const onSubmit = ({ email, password }) => {
            const input = { email, password }
            const variables = { input }
            register({ variables }).then(({ data }) => {
              const { signup } = data
              activateAuth(signup)
            })
          }
          const errorMsg =
            error && 'El usuario ya existe o hay algun problema.'
          return (
            <Fragment>
              <UserForm
                disabled={loading}
                error={errorMsg}
                title='Registrarse'
                onSubmit={onSubmit}
              />
              <LoginLink text='Ya' pathTo='login'>Inicia Sesión</LoginLink>
            </Fragment>
          )
        }}
      </RegisterMutation>
    </Fragment>
  )
}
