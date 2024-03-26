import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLogin) {
            // Logica pentru autentificare
            console.log('Autentificare - Username:', username);
            console.log('Autentificare - Password:', password);
        } else {
            // Logica pentru înregistrare
            console.log('Înregistrare - Username:', username);
            console.log('Înregistrare - Password:', password);
        }
        // Resetarea câmpurilor după trimiterea formularului
        setUsername('');
        setPassword('');
    };

    return (
        <div className='container'>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <div className='inputbox'>
                    <input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='inputbox'>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='btn'>
                    <button class='loginbtn' type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </div>
            </form>
            <div class='reglog'>
                <p>{isLogin ? 'Not a member?   ' : 'Already have an account?   '}</p>
                <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register' : 'Login'}</button>

            </div>
        </div>
    );
};

export default LoginSignup;
