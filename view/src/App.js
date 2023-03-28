import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Diary from './components/diary/Diary';
import Calendar from './components/calendar/Calendar';
import React, { useRef, useEffect, useMemo, useCallback, useReducer } from 'react';

import './App.css';

const reducer = (state, action) => {
    let newState = [];
    
    switch (action.type) {
      case 'INIT': {
        return action.data;
      }
      case 'CREATE': {
        const newItem = {
          ...action.data
        }
        newState = [newItem, ...state];
        break;
      }
      case 'REMOVE': {
        newState = state.filter((it) => it.id !== action.data);
        break;
      }
      case 'EDIT': {
        newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
        break;
      }
      default:
        return state;
    }
    return newState;
};

export const DiaryStateContext = React.createContext();

const App = () => {
    const [data, dispatch] = useReducer(reducer, []);

    const dataId = useRef(0);
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: "CREATE", data: {
            id: dataId.current,
            data: new Date(date).getTime(),
            content,
            emotion
            }
        });
        dataId.current += 1;
    }
    const onRemove = (targetId) => {
        dispatch({ type: "REMOVE", targetId })
    }
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: "EDIT",
            data: {
            id: targetId,
            date: new Date(date).getTime(),
            content,
            emotion
            }
        })
    }

    const memoizedDispatches = useMemo(() => {
        return { onCreate, onRemove, onEdit }
      }, []);

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryStateContext.Provider value={memoizedDispatches}>
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path={"/"} element={<Calendar/>}/>
                            <Route path={"/diary"} element={<Diary />}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </DiaryStateContext.Provider>
        </DiaryStateContext.Provider>
    );
};

export default App;