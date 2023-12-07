import { useLocation, useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import { useAppDispatch } from '../../shared/hooks/useRedux'
import { signIn } from '../../redux'




export const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/';

  const dispatch = useAppDispatch()


  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userName = formData.get('userName')?.toString()

    if (userName) {
      dispatch(signIn(userName))
      navigate(fromPage, {replace: true})
    }
  }
  return (
    <div className="container">
      <div className={styles.login__auth}>
        <form className={styles.login__auth_form} onSubmit={handleLogin}>
          <label htmlFor="userName">Enter login</label>
          <input className={styles.login__auth_input} type="text" name='userName' id='userName' placeholder='Enter login'/>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}