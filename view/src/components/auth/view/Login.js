import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContent from '../AuthContent';
import InputLabel from '../InputLabel';
import AuthButton from '../AuthButton';
import AlignedLink from '../AlignedLink';

import { post } from '../../../lib/requestUtils';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handleChange = e => {
        let name = e.target.name;
        if (name === 'email') {
            setEmail(e.target.value);
        }
        else {
            setPassword(e.target.value);
        }
    }

    const handleClick = e => {
        const res = post("/members/login", {
            email: email,
            password: password
        });
        res.then(response => {
            window.sessionStorage.setItem(
                "Authorization",
                response.data.access_token
            );
            
            navigate('/');
            window.location.reload();
        })
        .catch(() => {
            alert("비밀번호가 일치하지 않습니다.");
        });
    }

    return (
        <AuthContent title="로그인">
            <InputLabel label="이메일" name="email" placeholder="당신의 이메일" onChange={handleChange}/>
            <InputLabel label="비밀번호" name="password" placeholder="까먹어서는 안되는 암호" type="password" onChange={handleChange}/>
            <AuthButton onClick={handleClick}>로그인</AuthButton>
            <AlignedLink to={"/register"}>회원가입</AlignedLink>
        </AuthContent>
    );
}

export default Login;
