import React, { Component } from 'react';
import AlignedLink from '../AlignedLink';
import AuthButton from '../AuthButton';
import AuthContent from '../AuthContent';
import InputLabel from '../InputLabel';

import { post } from '../../../lib/requestUtils';

class Register extends Component {

    state = {
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
    };

    handleChnage = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleClick = e => {
        if (this.state.password !== this.state.passwordConfirm) {
            alert("비밀번호가 서로 일치하지 않습니다!");
        }
        else {
            const res = post("/members/register", {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            });
            res.then(response => {
                this.setState({
                    email: "",
                    username: "",
                    password: "",
                    passwordConfirm: ""
                });
                alert("회원가입이 성공적으로 이루어졌습니다!\n로그인을 진행해주세요!");
            })
            .catch(() => {
                alert('이미 존재하는 이메일입니다!');
            })
        }
    }

    render() {
        return (
            <AuthContent title="회원가입">
                <InputLabel label="이메일" name="email" placeholder="당신의 이메일" onChange={this.handleChnage}/>
                <InputLabel label="이름" name="username" placeholder="당신의 멋진 이름" onChange={this.handleChnage}/>
                <InputLabel label="비밀번호" name="password" placeholder="까먹어서는 안되는 암호" type="password" onChange={this.handleChnage}/>
                <InputLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={this.handleChnage}/>
                <AuthButton onClick={this.handleClick}>회원가입</AuthButton>
                <AlignedLink to={"/login"}>로그인</AlignedLink>
            </AuthContent>
        );
    }
}

export default Register;
