import React from 'react'

export default (props) => {
    return (
        <div>
            <input
                id="tab-1" //tab-1
                type="radio" //radio
                name="tab" //tab
                className={props.estilo} //sign-in
                checked
                /> 
            <label for="tab-1" className="tab">{props.buttonName}</label>
        </div>
    )
}