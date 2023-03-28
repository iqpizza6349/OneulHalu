import { useNavigate } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';

import DiaryHeader from '../component/DiaryHeader';
import DiaryButton from '../component/DiaryButton';
import EmotionItem from '../component/EmotionItem';

import "../styles/DiaryEditor.css";

const DiaryEditor = ({ originDate, isEdit }) => {
    const [date, setDate] = useState();
    const [emotion, setEmotion] = useState(3);
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    
    const getStringDate = (date) => {
        console.log(date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = `0${month}`;
        }

        if (day < 10) {
            day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
    }

    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        
    }

    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    const emotionList = [
        {
            emotion_id: 1,
            emotion_img: process.env.PUBLIC_URL + `/emoji/매우_좋음.png`,
            emotion_descript: '신남'
        },
        {
            emotion_id: 2,
            emotion_img: process.env.PUBLIC_URL + `/emoji/좋음.png`,
            emotion_descript: '좋음'
        },
        {
            emotion_id: 3,
            emotion_img: process.env.PUBLIC_URL + `/emoji/보통.png`,
            emotion_descript: '보통'
        },
        {
            emotion_id: 4,
            emotion_img: process.env.PUBLIC_URL + `/emoji/나쁨.png`,
            emotion_descript: '나쁨'
        },
        {
            emotion_id: 5,
            emotion_img: process.env.PUBLIC_URL + `/emoji/매우_나쁨.png`,
            emotion_descript: '끔찍'
        }
    ];

    return (
        <div>
            <DiaryHeader
                headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
                leftChild={<DiaryButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}
            />
            <div className="DiaryEditor">
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className='input_box'>
                        <input value={date ? getStringDate(date) : getStringDate(originDate)} 
                                onChange={(e) => {
                                    let newDate = new Date(e.target.value);
                                    let year = newDate.getFullYear();
                                    let month = newDate.getMonth() + 1;
                                    let day = newDate.getDate();
                                    navigate(`/diary?year=${year}&month=${month}&date=${day}`);
                                    setDate(newDate);
                                }}
                                type={"date"}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem onClick={handleClickEmote}
                                        key={it.emotion_id}
                                        {...it}
                                        isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                                placeholder="오늘은 어땠나요?"
                                ref={contentRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)} />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <DiaryButton text={"취소하기"} onClick={() => navigate(-1)} />
                        <DiaryButton
                            text={"작성완료"}
                            type={"positive"}
                            onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    );
};

DiaryEditor.defaultProps = {
    isEdit: false
};

export default DiaryEditor;