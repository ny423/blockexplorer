
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { useEffect } from "react";
import { BigInteger } from 'bignumber';
import HomeButton from '../components/HomeButton';
import { displayValue } from '../utils/display';

export default function Transaction(props) {
    const { hash = '0x0' } = useParams();
    const [receiptString, setReceiptString] = useState(JSON.stringify({}));

    useEffect(() => {
        async function getTransactions() {
            const newReciept = await props.alchemy.core.getTransactionReceipt(hash)
            setReceiptString(JSON.stringify(newReciept))
        }
        getTransactions();
    }, [props.alchemy.core, hash]);

    function getReceiptDetails() {
        const details = [];
        const receipt = JSON.parse(receiptString);
        console.log("🚀 ~ file: Transaction.jsx:24 ~ getReceiptDetails ~ receipt:", receipt)
        Object.keys(receipt).forEach(key => {
            // console.log("🚀 ~ file: Transaction.jsx:58 ~ Object.keys ~ key:", receipt[key])
            const value = receipt[key];
            if (value && typeof value === 'object' && value.type === 'BigNumber')
                details.push(<li value={key} key={key}>{`${key}: ${new BigInteger(value.hex)}`}</li>)
            else if (value)
                details.push(<li value={key} key={key}>{`${key}: ${displayValue(value.toString())}`}</li>)
            else
                details.push(<li value={key} key={key}>{`${key}: ${displayValue(value)}`}</li>)
        })
        return details;
    }

    return (<div>
        <h1>{displayValue(hash)}</h1>
        <div className='receipt'>
            <ul>
                {getReceiptDetails()}
            </ul>
        </div>
        <HomeButton />
    </div>)
}