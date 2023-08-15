import { useState } from 'react';
import { useEffect } from "react";

export default function Transactions(props) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function getTransactions() {
            const txs = (await props.alchemy.core.getBlock(props.blockNumber)).transactions;
            console.log("🚀 ~ file: Transactions.jsx:10 ~ getTransactions ~ txs:", txs)
            setTransactions(txs);
        }
        getTransactions();
    }, [props.alchemy.core, props.blockNumber]);

    return (<div className="transactions">
        <h2>Transactions</h2>
        <ol>
            {transactions.map(tx => <li key={tx}>{tx}</li>)}
        </ol>
    </div>);
}