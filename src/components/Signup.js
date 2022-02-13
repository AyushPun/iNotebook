import React , {useState} from 'react'
import signupLogo from '../images/signupLogo.jpeg'
import { useHistory } from 'react-router-dom'

const Signup = () => {
  
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  let history = useHistory()
   
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password, cpassword} = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);

    if(json.success) {
      //Saving the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
    } else {
      alert("Invalid Credentials");
    }
  }
  return (
    <div>
      <main className="mt-5 text-center d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
          <img
            className="mb-4"
            src={signupLogo}
            width="90"
            height="90"
          />
          <h1 className="h3 mb-3 fw-normal">SignUp to iNotebook!</h1>

          <div className="form-floating">
            <input
              type="test"
              className="form-control top"
              placeholder="name"
              required
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
            <label>Name</label>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control middle"
              placeholder="name@example.com"
              required
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <label>Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control middle"
              placeholder="password"
              required
              name="password"
              minLength={5}
              value={credentials.password}
              onChange={onChange}
            />
            <label>Password</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control bottom"
              placeholder="password"
              required
              name="cpassword"
              minLength={5}
              value={credentials.cpassword}
              onChange={onChange}
            />
            <label>Confirm Password</label>
          </div>
          
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Singup
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; Made By Ayush Pun</p>
        </form>
      </main>
    </div>
  )
}

export default Signup