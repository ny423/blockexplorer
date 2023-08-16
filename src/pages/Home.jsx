import NumberInput from "../components/NumberInput";
import { useState } from 'react';
import history from "../router/history";

export default function Home() {
    const [blockNumberString, setBlockNumberString] = useState("");

    const onSendRequest = () => {
        if (Number.isInteger(Number(blockNumberString)) && Number(blockNumberString) > 0) {
            history.push(`/blocknumber/${blockNumberString}`);
            return true;
        }
        return false;
    }


    return (
        <div className="App">
            <h1>Welcome to the Alchemy Blockchain Explorer!</h1>
            <h2>Select a block number to view the transactions in that block.</h2>
            <NumberInput placeholder='Please Enter a block number: '
                value={blockNumberString} setValue={setBlockNumberString} onSendRequest={onSendRequest} />
        </div>
    );
}

