/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Emotion } from '../diary/component/Emotion';

import './styles/Body.css';

const Dates = (props) => {
    const { lastDate, firstDate, elm, findToday, month, year, idx, diary } =
        props;
    const navigate = useNavigate();

    return (
        <>
            <Form
                onClick={() => {
                    if (props.idx < props.lastDate) {
                        return false;
                    }
                    else if (props.firstDate > 0 && props.idx > props.firstDate - 1) {
                        return false;
                    }
                    else {
                        navigate(`/diary?year=${year}&month=${month}&date=${elm}`);
                    }
                }}
            >
                <DateNum
                    idx={idx}
                    lastDate={lastDate}
                    firstDate={firstDate}
                    findToday={findToday}
                >
                    {elm}일
                </DateNum>
                {diary && (
                    <>
                        {Emotion.map((it) => {
                            if (it.emotion_id === diary.emoji) {
                                return (
                                    <img key={idx} src={it.emotion_img} alt={it.emotion_descript} />
                                )
                            }
                        })}
                    </>
                )}
            </Form>
        </>
    );
};
const Form = styled.li`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 7);
  height: 9vw;
  text-align: right;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #f00;
    background-color: #f5f5f5;
  }
`;

const DateNum = styled.div`
  padding: 1vw 0.9vw 0 0;
  ${(props) => props.idx < props.lastDate && `color: #969696;`};
  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `
    color: #969696;
  `};
`;

export default Dates;
