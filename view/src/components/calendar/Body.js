/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dates from './Dates';

import { getWithHeaders } from '../../lib/requestUtils';

const Body = (props) => {
    const { totalDate, today, month, year } = props;
    const lastDate = totalDate.indexOf(1);
    const firstDate = totalDate.indexOf(1, 7);

    const [diary, setDiary] = useState([]);

    //today
    const findToday = totalDate.indexOf(today);
    const getMonth = new Date().getMonth() + 1;

    const runAxios = async () => {
        setDiary([]);
        const res = getWithHeaders(
            `/diaries?year=${year}&month=${month}`, 
            {
                Authorization: `Bearer ${window.sessionStorage.getItem("Authorization")}`
            }
        );
        res.then((response) => {
            const diaries = response.data.data.map((item) => {
                return {
                    no: item.diaryNo,
                    month: item.wroteDate[1],
                    date: item.wroteDate[2],
                    emoji: item.emoji
                };
            });
            
            for (let d of diaries) {
                setDiary((prev) => [...prev, d])
            }
        })
        .catch(() => {
        });
    };
    
    useEffect(() => {
        runAxios();
    }, [month]);

    return (
        <Form>
            {totalDate.map((elm, idx) => {
                let d = undefined;
                for (let e of diary) {
                    if (idx < lastDate) {
                        continue;
                    }
                    else if (firstDate > 0 && idx > firstDate - 1) {
                        continue;
                    }

                    if (Number(e.date) === elm) {
                        d = e;
                        break;
                    }
                }
                return (
                    <Dates
                        key={idx}
                        idx={idx}
                        lastDate={lastDate}
                        firstDate={firstDate}
                        elm={elm}
                        findToday={findToday === idx && month === getMonth && findToday}
                        month={month}
                        year={year}
                        diary={d}
                    />
                );
            })}
        </Form>
    );
};

const Form = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
export default Body;
