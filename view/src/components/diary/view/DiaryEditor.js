import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import DiaryHeader from '../component/DiaryHeader';

import DiaryButton from '../component/DiaryButton';


const DiaryEditor = ({ originDate, isEdit }) => {
    const [date, setDate] = useState();
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

    return (
        <div>
            <DiaryHeader
                headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
                leftChild={<DiaryButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}
            />
            <section>
                <h4>오늘은 언제인가요?</h4>
                <div className='input-box'>
                    <input value={date ? getStringDate(date) : getStringDate(originDate)} 
                            onChange={(e) => {
                                let newDate = new Date(e.target.value);
                                let year = newDate.getFullYear();
                                let month = newDate.getMonth() + 1;
                                let day = newDate.getDate();
                                navigate(`/happy?year=${year}&month=${month}&date=${day}`);
                                setDate(newDate);
                            }}
                            type={"date"}
                    />
                </div>
            </section>
        </div>
    );
};

DiaryEditor.defaultProps = {
    isEdit: false
};

export default DiaryEditor;