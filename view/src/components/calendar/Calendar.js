import GlobalStyle from '../../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from '../../styles/Theme';
import Main from '../../Main';

const Calendar = () => {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Main />
        </ThemeProvider>
    );
};

export default Calendar;