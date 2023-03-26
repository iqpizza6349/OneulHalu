import DiaryEditor from './view/DiaryEditor';

const NewDiary = ({date}) => {
    return (
        <div>
            <DiaryEditor originDate={date}/>
        </div>
    );
};

export default NewDiary;
