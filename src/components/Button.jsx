import { useState } from 'react'

function Button ({label, textColor, bgColor}) {
    const [buttonColor, setColor] = useState(bgColor);
    const setHexa = function() {
        let hexa = Math.floor(Math.random()*16777215).toString(16);
        setColor('#' + hexa);
    }
    const buttonStyle = {
        color: textColor ? textColor : 'white',
        backgroundColor: buttonColor ? buttonColor : 'black',
        borderColor: buttonColor ? buttonColor : 'black'
      };

    if( label ) {
        return (
            <>
            <button style={buttonStyle} onClick={() => setHexa()}> { label } </button>
            </>
        )
    }
}

export default Button;