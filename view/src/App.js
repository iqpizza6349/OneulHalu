import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Diary from './components/diary/Diary';
import Calendar from './Calendar';

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Calendar/>}/>
            <Route path={"/happy"} element={<Diary />}/>
        </Routes>
        </BrowserRouter>
    );
};

export default App;