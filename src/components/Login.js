import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import loginLogo from '../images/loginLogo.jpeg'

const Login = ({showAlert}) => {

  const [credentials, setCredentials] = useState({email: "", password: ""})
  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    });
    const json = await response.json();
    console.log(json);

    if(json.success) {
      //Saving the auth token and redirect
      localStorage.setItem('token', json.authToken);
      showAlert("Logged in Successfully", "success");
      history.push("/");
      
    } else {
      showAlert("Invalid Credentials", "danger");
    }

  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  
  return (
    <div>
      <main className="mt-5 text-center d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
          <img
            className="mb-4"
            src={loginLogo}
            alt="image"
            width="90"
            height="90"
          />
          <h1 className="h3 mb-3 fw-normal">Login to iNotebook!</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control top"
              placeholder="name@example.com"
              name="email"
              required
              value={credentials.email}
              onChange={onChange}
            />
            <label>Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control bottom"
              placeholder="password"
              name="password"
              required
              value={credentials.password}
              onChange={onChange}
            />
            <label>Password</label>
          </div>
          
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; Made By Ayush Pun</p>
        </form>
    </main>
    </div>
  )
}

export default Login