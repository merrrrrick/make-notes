import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
        if(word === 'danger'){word = 'error'}; 
        if(word === 'dark'){word = 'success'}; 
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show py-2`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert