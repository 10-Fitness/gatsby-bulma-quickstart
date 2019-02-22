import React from 'react';
import styled from "styled-components";
import { Link } from 'gatsby';
import './style.scss';


const HeaderButton = styled(Link)`
  display: inline-block;
  border: 1px solid black;
  background-color: white;
  padding: 0.5em;
  text-transform: uppercase;
  color: black;
  &:active {
    margin-top: 1px;
    margin-bottom: -1px;
    margin-left: 1px;
    margin-right: -1px;
  }
`
export default HeaderButton;
