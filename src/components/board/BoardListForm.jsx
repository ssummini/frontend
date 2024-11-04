import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../css/BoardListForm.module.css';
import { Link } from 'react-router-dom';

const BoardListForm = () => {
    const [list, setList] = useState([]);

    
    useEffect(() => {
        axios.get('http://175.45.200.70:8090/spring/board/list')
            .then(res => {
                console.log('응답 데이터:', res.data); 
                setList(res.data);
            })
            .catch(error => console.error('에러:', error)); 
    }, []);

    return (
        <div className={styles['board-list-container']}>
            <h2 className={styles['board-list-title']}>게시글 목록</h2>
            <div className={styles['board-list']}>
                <div className={`${styles['board-list-item']} ${styles['board-list-header']}`}>
                    <h3>번호</h3>
                    <h3>제목</h3>
                    <h3>작성자</h3>
                    <h3>조회수</h3>
                    <h3>날짜</h3>
                </div>
                {list.map((data) => (
                    <div key={data.seq} className={styles['board-list-item']}>
                        <p>{data.seq}</p>
                        <p>
                            <Link to={`/board/boardDetailForm/${data.seq}`}>
                                {data.subject}
                            </Link>
                        </p>
                        <p>{data.name}</p>
                        <p>{data.hit}</p>
                        {/* <p className={styles['post-date']}>
                            {new Date(data.logtime).toLocaleDateString()}  yyyy-mm-dd 형식으로 날짜 출력 
                        </p> */}
                        <p>{data.logtime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardListForm;
