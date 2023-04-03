const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const Emotion = [
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