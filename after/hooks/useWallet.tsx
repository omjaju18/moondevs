import { useState } from 'react';

const useCustomWalletHook = () => {

  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isBalanceError, setIsBalanceError] = useState(false);
  const [walletChain, setWalletChain] = useState('');

  // Define functions for opening modals
  const openChainModal = () => {

  };

  const openConnectModal = () => {
 
  };




  return {
    walletAddress,
    setWalletAddress,
    isWalletConnected,
    setIsWalletConnected,
    walletBalance,
    setWalletBalance,
    isBalanceError,
    setIsBalanceError,
    openChainModal,
    walletChain,
    setWalletChain,
    openConnectModal
  };
};

export default useCustomWalletHook;
