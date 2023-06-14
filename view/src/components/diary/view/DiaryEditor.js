/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import DiaryHeader from '../component/DiaryHeader';
import DiaryButton from '../component/DiaryButton';
import EmotionItem from '../component/EmotionItem';

import { post, patch, getWithHeaders, deleteRequest } from '../../../lib/requestUtils';

import "../styles/DiaryEditor.css";
import { Emotion } from '../component/Emotion';
import axios from 'axios';

const DiaryEditor = ({ originDate }) => {
    const [date, setDate] = useState();
    const [emotion, setEmotion] = useState(3);
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [isEdit, setEdit] = useState(false);
    const [diaryNo, setDiaryNo] = useState();
    const [image, setImage] = useState(undefined);

    const navigate = useNavigate();

    const uploadImage = (image) => {
        const formData = new FormData();
        formData.append("img", image);
        let token = `Bearer ${window.sessionStorage.getItem("Authorization")}`;
        axios.post("http://localhost:8080/diaries/img", formData, {
            headers: {Authorization: token}
        })
        .then((res) => {
            console.log(res);
            setImage(res.data.url);
        });
    }
    
    const getStringDate = (date) => {
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

    const handleDelete = () => {
        let token = `Bearer ${window.sessionStorage.getItem("Authorization")}`;
        if (diaryNo) {
            deleteRequest(`/diaries?no=${diaryNo}`, {
                content: content,
                emoji: emotion
            }, {
                Authorization: token
            })
            .catch(() => {
            });
        }
        goHome();
    };

    const goHome = () => {
        navigate('/');
    }

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        let d = date ? getStringDate(date) : getStringDate(originDate);
        let token = `Bearer ${window.sessionStorage.getItem("Authorization")}`;
        if (diaryNo) {
            if (image) {
                patch(`/diaries/${diaryNo}`, {
                    content: content,
                    emoji: emotion,
                    url: image
                }, {
                    Authorization: token
                })
            }
            else {
                patch(`/diaries/${diaryNo}`, {
                    content: content,
                    emoji: emotion
                }, {
                    Authorization: token
                })
                .catch(() => {
                })
            }
        }
        else {
            if (image) {
                post('/diaries', {
                    content: content,
                    wrote_at: d,
                    emoji: emotion,
                    url: image
                }, {
                    Authorization: token
                })
                .catch(() => {
                });
            }
            else {
                post('/diaries', {
                    content: content,
                    wrote_at: d,
                    emoji: emotion
                }, {
                    Authorization: token
                })
                .catch(() => {
                });
            }
        }
        
        navigate("/", { replace: true });
    }

    const findDiary = async (date) => {
        let year = Number(date.substring(0, 4));
        let month = Number(date.substring(5, 7));
        let day = Number(date.substring(8, 10));

        getWithHeaders(
            `/diaries/diary?year=${year}&month=${month}&day=${day}`,
            {
                Authorization: `Bearer ${window.sessionStorage.getItem("Authorization")}`
            }
        )
        .then((response) => {
            const obj = response.data;
            if (obj.constructor === Object && Object.keys(obj).length === 0) {
                setEdit(false);
                setContent("");
                setEmotion(3);
                setDiaryNo();
                setImage(undefined);
                return;
            }

            setDiaryNo(obj.diaryNo);
            getWithHeaders(
                `/diaries/${obj.diaryNo}`,
                {
                    Authorization: `Bearer ${window.sessionStorage.getItem("Authorization")}`
                }
            )
            .then((res) => {
                setEdit(true);
                setContent(res.data.content);
                setEmotion(res.data.emoji);
                setImage(res.data.image);
            })
            .catch(() => {
                setEdit(false);
                setContent("");
                setEmotion(3);
                setDiaryNo();
                setImage(undefined);
            });
        })
        .catch(() => {
            setEdit(false);
            setContent("");
            setEmotion(3);
            setDiaryNo();
        });
    };

    const runAxios = async () => {
        const d = date ? getStringDate(date) : getStringDate(originDate);
        await findDiary(d);
    }

    useEffect(() => {
        runAxios();
    }, []);

    return (
        <div>
            <DiaryHeader
                headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
                leftChild={<DiaryButton text={"< 뒤로가기"} onClick={() => navigate('/')}/>}
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
                                    runAxios();
                                    window.location.reload();
                                }}
                                type={"date"}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {Emotion.map((it) => (
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
                    <h4>사진 한 컷</h4>
                    <div>
                        <img src={`http://localhost:8080${image}`} style={{display: 'none'} && { width: 250 }} alt='미리보기'/>
                    </div>
                    <div className="input_box">
                        <label id="image-label" for="img">사진 업로드</label>
                        <input id="img" type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files[0])}/>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <DiaryButton text={isEdit ? "삭제하기" : "취소하기"}
                            type={isEdit ? "negative" : "default"}
                            onClick={isEdit ? handleDelete : goHome}
                        />
                        <DiaryButton
                            text={isEdit ? "수정완료" : "작성완료"}
                            type={"positive"}
                            onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;