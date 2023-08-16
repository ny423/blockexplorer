import { useState } from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import HomeButton from '../components/HomeButton';
import { displayValue } from '../utils/display';
import { BigInteger } from 'bignumber';

export default function BlockTransactions(props) {
    const [transactions, setTransactions] = useState([]);
    const [blockDetailsString, setBlockDetailsString] = useState(JSON.stringify({}));

    const { blockNumber = props.latestBlock } = useParams();
    useEffect(() => {
        async function getTransactions() {
            const block = await props.alchemy.core.getBlock(Number(blockNumber));
            console.log("🚀 ~ file: Transactions.jsx:11 ~ getTransactions ~ block:", block);
            if (block) {
                const txs = block.transactions;
                setTransactions(txs);
                delete block.transactions;
                setBlockDetailsString(JSON.stringify(block));
            }
        }
        getTransactions();
    }, [props.alchemy.core, blockNumber]);

    function getBlockDetails() {
        const details = [];
        const block = JSON.parse(blockDetailsString);
        Object.keys(block).forEach(key => {
            const value = block[key];
            if (value && typeof value === 'object' && value.type === 'BigNumber')
                details.push(<li value={key} key={key}>{`${key}: ${new BigInteger(value.hex)}`}</li>)
            else if (value)
                details.push(<li value={key} key={key}>{`${key}: ${displayValue(value.toString())}`}</li>)
            else
                details.push(<li value={key} key={key}>{`${key}: ${displayValue(value)}`}</li>)
        })
        return details;
    }

    return (
        <div className="transactions">
            <h1>Block {blockNumber}</h1>
            <ul>{getBlockDetails()}</ul>
            <h2>Transactions:</h2>
            {
                transactions.length > 0 ?
                    <ol>
                        {transactions.map(tx => <li key={tx}><a href={`/tx/${tx}`}>{displayValue(tx)}</a></li>)}
                    </ol> :
                    <h3>
                        No Transactions in Block {blockNumber}
                    </h3>
            }
            <HomeButton />
        </div>);
}