import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './App.css';
import BlockTable from './components/BlockTable';
import DisplayData from './components/DisplayData';
import { useEffect, useState } from 'react';

// Infura node needs infura key
const INFURA_KEY = "f309efef35354293a86d9b2a9da1b3e6";
const INFURA_END_POINT = `https://mainnet.infura.io/v3/${INFURA_KEY}`;

// Cloudfare node can also serve
const CLOUDFARE = 'https://cloudflare-eth.com';


function App() {

  // Initialize web3
  const web3 = new window.Web3(INFURA_END_POINT);

  const [currBlock, setCurrBlock] = useState({});
  const [prevBlock, setPrevBlock] = useState({});
  const [acceptedBlock, setAcceptedBlock] = useState({});
  const [blockHistory, setBlockHistory] = useState([]);
  const [allBlockTxns, setAllBlockTxns] = useState([]);
  const isBrowser = typeof window !== "undefined";

  const compare = ( a, b ) => {
    if(a.value ===  null || b.value === null){
      return 0;
    }
    if ( a.value > b.value ){
      return -1;
    }
    if ( a.value < b.value ){
      return 1;
    }
    return 0;
  }

  useEffect(() => {
      
      const interval = setInterval(async () => {

          const currentBlock = await web3.eth.getBlock("latest");
          
          setCurrBlock(currentBlock);
          
      }, 15000);
      
      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(currBlock.number !== prevBlock.number){
        setPrevBlock(currBlock);
        setAcceptedBlock(currBlock);
        setBlockHistory(prevHistory => {
          const newBlockHistory = [currBlock, ...prevHistory];
          return newBlockHistory;
        });

        const blockTxnHashes = currBlock.transactions;
        const txns = blockTxnHashes.map(async(txnHash) => {
          const txn = await web3.eth.getTransaction(txnHash);
          return txn;
        });
        // console.log(txns);
        Promise.all(txns).then(values => setAllBlockTxns(values));
    }else{
        setPrevBlock(currBlock);
    }        
  }, [currBlock, prevBlock]);


  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <h3 className='heading'>Latest Eth block is displayed every 15 secs. (approx.)</h3>
        <hr style={{border: '2px solid green'}}/>
        <h3 className='heading'>Recent Block</h3>

        {
          isBrowser 
          
          &&

          <DisplayData 
            blockNo={blockHistory.length ? acceptedBlock.number : "Loading..."}
            noTxns={blockHistory.length ? acceptedBlock.transactions.length : "Loading..."}
            miner={blockHistory.length ? acceptedBlock.miner : "Loading..."}
            totalDiff={blockHistory.length ? acceptedBlock.totalDifficulty : "Loading..."}
          />
        }

        <br />
        <br />
        {
          blockHistory.length
          &&
          <>
            <h3 className='heading'>All transactions of block <span style={{color: 'white'}}>{(allBlockTxns.length > 0) && allBlockTxns[0].blockNumber}</span></h3>
            <BlockTable rows={allBlockTxns.length > 0 ? allBlockTxns.sort(compare) : [{blockNumber: 0, hash: "Loading...", value: "Loading..."}]} />
          </>
        }
      </Box>
    </Container>
  );
}

export default App;
