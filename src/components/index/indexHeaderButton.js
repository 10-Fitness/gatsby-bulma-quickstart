import React from 'react';
import styled from "styled-components";
import { Link } from 'gatsby';
import './../style.scss';


const IndexHeaderButton = styled(Link)`
  font-size: 1.25em;
  display: inline-block;
  border: 1px solid black;
  background-color: white;
  text-transform: uppercase;
  color: black;
  text-align: center;
  float: right;
  margin-top: 10px;
  line-height: 1.2rem;
  padding: 0.75rem;
  font-weight: bold;
  em {
    font-weight: normal;
    font-size: 0.75rem;
    line-height: 1.2rem;
    display: block;
    font-style: normal;   
  }
  &:active {
    margin-top: 11px;
    margin-bottom: -1px;
    margin-left: 1px;
    margin-right: -1px;
  }
`
export default IndexHeaderButton;
