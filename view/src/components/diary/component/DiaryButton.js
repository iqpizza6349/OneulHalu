import '../styles/Button.css';

const DiaryButton = ({ text, type, onClick }) => {

    const buttonType = ['positive', 'negative'].includes(type ? type : 'default');

    return (
        <button className={["Button", `Button_${type}`].join(" ")} 
                onClick={onClick}
        >
            {text}
        </button>
    );
};

DiaryButton.defaultProps = {
    type: "default"
}

export default DiaryButton;
