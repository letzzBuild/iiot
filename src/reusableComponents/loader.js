import React from "react";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
export default function AwesomeComponent (props){
  

    return (
      <div className="sweet-loading">
        <DotLoader
          css={override}
          size={props.size}
          color={props.color}
          loading={true}
          
        />
      </div>
    );
  
}