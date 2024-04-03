import { useState } from 'react';

const useChainSelector = () => {
 
  const [openChainSelector, setOpenChainSelector] = useState(false);

  // Function for opening the chain selector modal
  const openChainSelectorModal = () => {
    setOpenChainSelector(true);
  };

  // Return values and functions to be used by components
  return {
    openChainSelector,
    setOpenChainSelector,
    openChainSelectorModal
  };
};

export default useChainSelector;
