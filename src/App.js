import { useRef, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './App.css';
import BlockTable from './components/BlockTable';
import DisplayData from './components/DisplayData';

// Infura node needs infura key
const INFURA_KEY = "<your-infura-key>";
// 
// const INFURA_END_POINT = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
const INFURA_END_POINT = `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`;

// Cloudfare node can also serve
const CLOUDFARE = 'https://cloudflare-eth.com';


  // Initialize web3 with either CLOUDFARE or INFURA_END_POINT nodes
  const web3 = new window.Web3(INFURA_END_POINT);

function App() {
  // var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  
  const [currBlock, setCurrBlock] = useState({});
  const [prevBlock, setPrevBlock] = useState({});
  const [acceptedBlock, setAcceptedBlock] = useState({});
  const [blockHistory, setBlockHistory] = useState([]);
  const [allBlockTxns, setAllBlockTxns] = useState([]);
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  const isBrowser = typeof window !== "undefined";



  const compare = ( a, b ) => {
    if(a == null || b == null){
      return 0;
    }
    if(a.value ==  null || b.value == null){
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

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height} = window;
    return {
      width,
      height
    };
  };


  useEffect(() => {

    const { width } = getWindowDimensions();
    setIsMobileWidth(width <= 630);
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

  useEffect(() => {
    const { width } = getWindowDimensions();
    setIsMobileWidth(width <= 630);
    
  }, [window.innerWidth]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <h3 className='heading'>Latest Eth block is displayed every 15 secs. (approx.)</h3>
        <hr style={{border: '2px solid green'}}/>
        <h3 className='heading'>Recent Block</h3>

        {
          isBrowser 
          
          &&
          acceptedBlock != null
          &&
          <DisplayData 
            blockNo={acceptedBlock.number != null ? acceptedBlock.number : "Loading..."}
            noTxns={acceptedBlock.transactions != null && acceptedBlock.transactions.length != null ? acceptedBlock.transactions.length : "Loading..."}
            miner={acceptedBlock.miner != null ? acceptedBlock.miner : "Loading..."}
            totalDiff={acceptedBlock.totalDifficulty != null ? acceptedBlock.totalDifficulty : "Loading..."}
          />
        }

        <br />
        <br />
        {
          blockHistory != null
          &&
          blockHistory.length != null
          &&
          allBlockTxns != null
          &&
          <>
            <h3 className='heading'>All transactions of block <span style={{color: 'white'}}>{(allBlockTxns != null) && (allBlockTxns.length > 0) && allBlockTxns[0].blockNumber}</span></h3>
            <small style={{color: "white"}}>{isMobileWidth && "Scroll right on the table to see other details"}</small>
            <BlockTable rows={allBlockTxns.length > 0 ? allBlockTxns.sort(compare) : [{blockNumber: 0, hash: "Loading...", value: "Loading..."}]} />
          </>
        }
      </Box>
    </Container>
  );
}

export default App;
