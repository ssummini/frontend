import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../css/BoardDetailForm.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const BoardDetailForm = () => {
    const { seq } = useParams(); 
    const [dto, setDto] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/spring/board/detail?seq=${seq}`)
            .then(res => {
                console.log('게시글 데이터:', res.data);
                setDto(res.data);
            })
            .catch(error => console.error('에러:', error));
    }, [seq]); 

    return (
        <div className={styles['detail-container']}>
            <h2 className={styles['detail-title']}>{dto.subject}</h2>
            <div className={styles['detail-info']}>
                <p className={styles['detail-author']}>작성자: {dto.name}</p>
                <p className={styles['detail-date']}>{new Date(dto.logtime).toLocaleDateString()}</p>
                <p className={styles['detail-hit']}>조회수: {dto.hit}</p>
            </div>
            <div className={styles['detail-content']}>
                <p>{dto.content}</p>
            </div>
            <div className={styles['button-container']}>
                <button className={styles['board-write-button']} onClick={() => navigate('/board/boardListForm')}>글목록</button>
                <button className={styles['board-write-button']} >수정</button>
                <button className={styles['board-write-button']} >삭제</button>
            </div>
        </div>
    );
};

export default BoardDetailForm;
