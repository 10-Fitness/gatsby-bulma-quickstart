import React from 'react';
import styled from "styled-components"
import '../style.scss';

const ProgressBar = styled.div`
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  padding: 1rem;
  display: flex;
  margin: auto;
`

const ProgressBarItemDiv = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 1.5rem;
  color: ${ props => props.isActive ? 'black' : '#aaa'};
`

const ItemNumber = styled.div`
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    width: 2.2rem;
    margin-right: 1rem;
    border: 1px solid ${ props => props.isActive ? 'black' : '#aaa'};
}
`
const ItemName = styled.div`
  display: inline-block;
`
const ProgressBarItem = (props) => 
    <ProgressBarItemDiv isActive={props.position == props.step}> 
        <ItemNumber isActive={props.step == props.position}>
            {props.step}
        </ItemNumber>
        {props.children}
    </ProgressBarItemDiv>;

const BuyProgressBar = (props) =>
    <ProgressBar>
        <ProgressBarItem step={1} position={props.position}>select plan</ProgressBarItem>
        <ProgressBarItem step={2} position={props.position}>about you</ProgressBarItem>
        <ProgressBarItem step={3} position={props.position}>take photo</ProgressBarItem>
        <ProgressBarItem step={4} position={props.position}>payment</ProgressBarItem>
    </ProgressBar>;

export default BuyProgressBar;
