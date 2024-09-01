import { useState } from "react";
import { signup, login, logout, loginTest } from "../apis/user";

const Home = () => {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(
                username,
                password1,
                password2,
                email
            );
            setResponseMessage("회원가입 성공!");
            console.log(response);
        } catch (error) {
            setResponseMessage("회원가입 실패!");
            console.log(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(loginEmail, loginPassword);
            setResponseMessage("로그인 성공!");
            console.log(response);
        } catch (error) {
            setResponseMessage("로그인 실패!");
            console.log(error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await logout();
            setResponseMessage("로그아웃 성공!");
            console.log(response);
        } catch (error) {
            setResponseMessage("로그아웃 실패!");
            console.log(error);
        }
    };

    const handleLoginTest = async () => {
        try {
            const response = await loginTest();
            setResponseMessage("테스트 성공!");
            console.log(response);
        } catch (error) {
            setResponseMessage("테스트 실패!");
            console.log(error);
        }
    };

    return (
        <div>
            <h2>SignUp Form</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">SignUp</button>
            </form>

            <h2>Login Form</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <h2>Actions</h2>
            <div>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleLoginTest}>Test Login</button>
            </div>

            <h3>{responseMessage}</h3>
        </div>
    );
};

export default Home;
