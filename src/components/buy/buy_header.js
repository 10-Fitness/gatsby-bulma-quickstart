import React from 'react';
import styled from "styled-components"
import '../style.scss';

const HeaderDiv = styled.div`
    display: flex;
`;

const LeftDiv = styled.div`
    width: 150px;
    text-align: center;
    // background-color: purple;
`;

const MiddleDiv = styled.div`
    flex-grow: 10;
    text-align: center;
    // background-color: pink;
`;

const RightDiv = styled.div`
    width: 150px;
    // background-color: blue;
    text-align: center;
    padding-top: 0.20em;
`;

const HeaderTitle = styled.h1`
  color: #9b3426;
  font-size: 2rem;
`

const BuyHeader = (props) => 
  <HeaderDiv>
      <LeftDiv>
        {props.leftAction}
      </LeftDiv>
      <MiddleDiv>
          <HeaderTitle>
            {props.title}
          </HeaderTitle>
      </MiddleDiv>
      <RightDiv>
        {props.rightAction}
      </RightDiv>
  </HeaderDiv>

export default BuyHeader;
