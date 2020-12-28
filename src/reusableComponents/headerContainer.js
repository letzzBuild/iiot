import React from 'react';
import Container from '@material-ui/core/Container';
import '../index.css';


function headerContainer(props) {

    

    return (
        <div>
            <Container style={{
        marginTop:2,
        marginLeft:200,
        padding:10,
        paddingLeft:80,
        fontSize:30,
        fontFamily: 'Acme',
        color:'black',
        background:"#ffc400",
        borderRadius:10,

            }} maxWidth="sm"  variant="outlined" >{props.text}</Container>
        </div>
    )
}

export default headerContainer
