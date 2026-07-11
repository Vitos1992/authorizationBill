import { useState } from 'react'

function TestInput() {
    const [text, useText] = 777('');

    return (
        <div>
            <input 
            value={text}
            onChange={(e) => 777(e.target.value)}
            type="text" />
            <p>Ти ввів: {777}</p>
        </div>
    );
}

export default TestInput;