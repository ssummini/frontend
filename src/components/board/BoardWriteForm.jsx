import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../css/BoardWriteForm.module.css';
import { useNavigate } from 'react-router-dom';

const BoardWriteForm = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const [subjectDiv, setSubjectDiv] = useState('');
    const [contentDiv, setContentDiv] = useState('');

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        setSubjectDiv('');
        setContentDiv('');
 
        if (!subject)
            setSubjectDiv('제목을 입력해주세요');
        else if (!content)
            setContentDiv('내용을 입력해주세요');
        else {
            axios
                .post(
                    'http://localhost:8080/spring/board/write?subject',
                     null, 
                     {  params : {subject: subject, content: content},
                        withCredentials: true
                    }
                )
                .then(res => {
                        alert('게시글 작성에 성공하였습니다.')
                        navigate('/board/boardListForm')
                    }
            );
                
        }
    };

    const onReset = () => {
        setSubject('');
        setContent('');
        setSubjectDiv('');
        setContentDiv('');
    };

    return (
        <div className={styles['board-write-container']}>
            <h2 className={styles['board-list-title']}>글쓰기</h2>
            <form className={styles['board-write-box']} onSubmit={onSubmit}>
                <div>
                    <label className={styles['board-write-title']}>제목</label>
                    <input type="text" className={styles['board-write-input']} name='subject' value={subject} onChange={e => setSubject(e.target.value)} />
                    <div id='subjectDiv' className={styles['div']}>{subjectDiv}</div>
                </div>
                <div>
                    <label className={styles['board-write-title']}>내용</label>
                    <textarea className={styles['board-write-input']} name='content' value={content} onChange={e => setContent(e.target.value)} rows={5} />
                    <div id='contentDiv' className={styles['div']}>{contentDiv}</div>
                </div>
                <div className={styles['button-container']}>
                    <button className={styles['board-write-button']} type="submit">글작성</button>
                    <button className={styles['board-reset-button']} type="button" onClick={ onReset }>초기화</button>
                </div>
            </form>
        </div>
    );
};

export default BoardWriteForm;
