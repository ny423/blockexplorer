import { useState } from "react";

export default function NumberInput(props) {
    const [isValid, setIsValid] = useState(true);
    const [invalidValue, setInvalidValue] = useState("");
    const { value, setValue, placeholder, onSendRequest } = props;

    const onSendRequestWrapper = () => {
        const valid = onSendRequest();
        if (!valid) {
            setIsValid(false);
            setInvalidValue(value);
        }
    }
    return (
        <div className='number-input'>
            <div className="row">
                <input type="number" value={value}
                    placeholder={placeholder}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter')
                            onSendRequestWrapper();
                    }} />
                <button className="send-request" onClick={onSendRequestWrapper}>OK</button>
            </div>
            <span className="warning-text" style={{ display: isValid ? "none" : "block", color: 'red' }}>Invalid Input: {invalidValue}</span>
        </div>
    );
}