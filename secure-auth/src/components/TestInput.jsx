import { useState } from 'react'

function TestInput() {
    const [text, setText] = useState('');

    return (
        <div>
            <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text" />
            <p>Ти ввів: {text}</p>
        </div>
    );
}

export default TestInput