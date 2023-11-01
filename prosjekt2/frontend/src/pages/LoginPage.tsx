import { TextField } from "@mui/material";
// import styles
import '../styles/LoginPage.css';

function LoginPage() {

    return (
      <div className="loginPage">
        <h1>Login Page</h1>
        <TextField id="outlined-basic" label="Username" className="loginText"/>
        <TextField id="outlined-basic" label="Password" className="loginText"/>
      </div>
    );
  }

export default LoginPage;
