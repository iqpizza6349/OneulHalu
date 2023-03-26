import React from 'react';
import styled from 'styled-components';

const Diary = (props) => {
    const {
        date,
        month, 
        year
    } = props;

    const userText = (e) => {
        
    };

    return (
        <Form>
            <Header>Diary</Header>
            <ViewDate>
                날짜 {year}.{month}.{date}
            </ViewDate>
        </Form>
    );
};

const Form = styled.div`
  position: absolute;
  width: 15vw;
  height: 10vw;
  border-radius: 10px;
  background-color: #fffae0;
  text-align: left;
  color: black;
  z-index: 999;
`;
const Header = styled.div`
  padding: 1vw 0 0.5vw 1vw;
  font-weight: 700;
  border-bottom: 2px solid #d3d3d3;
`;

const ViewDate = styled.div`
  padding: 0.4vw 0 0.3vw 1vw;
  border-bottom: 2px solid #d3d3d3;
`;

export default Diary;