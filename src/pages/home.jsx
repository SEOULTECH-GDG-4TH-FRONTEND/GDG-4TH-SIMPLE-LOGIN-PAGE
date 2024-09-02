import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { signup, login, logout, loginTest } from "../apis/user";

const Home = () => {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                await loginTest();
                setIsLoggedIn(true);
                setResponseMessage("로그인 상태 유지 테스트 성공!");
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

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
            setIsLoggedIn(true);
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
            setIsLoggedIn(false);
            console.log(response);
        } catch (error) {
            setResponseMessage("로그아웃 실패!");
            console.log(error);
        }
    };

    const toggleForm = () => {
        setShowSignup(!showSignup);
        setResponseMessage("");
    };

    return (
        <Container>
            <Title>
                {isLoggedIn ? "Welcome!" : showSignup ? "회원가입" : "로그인"}
            </Title>

            {isLoggedIn ? (
                <>
                    <Button onClick={handleLogout}>로그아웃</Button>
                </>
            ) : (
                <>
                    <Button onClick={toggleForm}>
                        {showSignup ? "로그인" : "회원가입"}
                    </Button>

                    {showSignup ? (
                        <Form onSubmit={handleSignup}>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit">회원가입</Button>
                        </Form>
                    ) : (
                        <Form onSubmit={handleLogin}>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) =>
                                    setLoginPassword(e.target.value)
                                }
                                required
                            />
                            <Button type="submit">로그인</Button>
                        </Form>
                    )}
                </>
            )}

            <ResponseMessage $success={responseMessage.includes("성공")}>
                {responseMessage}
            </ResponseMessage>
        </Container>
    );
};

export default Home;

const Container = styled.div`
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px;
    margin: 5px 0;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ResponseMessage = styled.h3`
    text-align: center;
    color: ${(props) => (props.$success ? "green" : "red")};
`;
