import React from 'react';
import Container from '@material-ui/core/Container';
import '../index.css';


function headerContainer(props) {

    

    return (
        <div>
            <Container style={{
        marginTop:"12px",
        marginLeft:"285px",
        padding:10,
        paddingLeft:80,
        fontSize:24,
        color:'black',
        background:"lightgrey",
        borderRadius:10,
        maxWidth: "410px",

            }} maxWidth="sm"  variant="outlined" >{props.text}</Container>
        </div>
    )
}

export default headerContainer
