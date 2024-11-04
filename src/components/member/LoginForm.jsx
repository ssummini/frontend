import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/LoginForm.module.css';

const LoginForm = () => {  
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const [idDiv, setIdDiv] = useState('');
    const [pwdDiv, setPwdDiv] = useState('');
    const [loginDiv, setLoginDiv] = useState('');

    const navigaete = useNavigate();
    
    const onLoginSubmit = (e) => {
        e.preventDefault();

        setIdDiv('');
        setPwdDiv('');

        if(!id)
            setIdDiv('아이디를 입력해주세요');
        else if(!pwd)
            setPwdDiv('비밀번호를 입력해주세요')
        else{
            axios.get(`http://175.45.200.70:8090/spring/member/login?id=${id}&pwd=${pwd}`, {
                withCredentials: true
            })
                .then(res => {
                    if (res.data === 'success') {
                        alert('로그인에 성공하였습니다.')
                        navigaete('/')
                    } else {
                        setLoginDiv('아이디 또는 비밀번호가 틀렸습니다')
                    }
                })
        }
    }

    return (        
        <div className={styles['login-container']}>
            <h2 className={styles['board-list-title']}>로그인</h2>
            <form className={styles['login-box']}>
                <div>
                    <label className={styles['login-title']}>아이디</label>
                    <input type="text" className={styles['login-input']} name='id' value={ id } onChange={ e => setId(e.target.value) } />
                    <div id='idDiv' className={styles['div']}>{ idDiv }</div>
                </div>
                <div>
                    <label className={styles['login-title']}>비밀번호</label>
                    <input type="password" className={styles['login-input']} name="pwd" value={ pwd } onChange={ e => setPwd(e.target.value) }/>
                    <div id='pwdDiv' className={styles['div']}>{ pwdDiv }</div>
                </div>
                <div id='loginDiv' className={styles['div']} style={{textAlign: 'center'}}>{ loginDiv }</div>
                <button className={styles['login-button']} onClick={ onLoginSubmit }>로그인</button>
            </form>
        </div>
    );
};

export default LoginForm;
