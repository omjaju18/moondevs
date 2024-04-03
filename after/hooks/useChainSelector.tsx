import { useState } from 'react';

const useChainSelector = () => {
 
  const [openChainSelector, setOpenChainSelector] = useState(false);

  const openChainSelectorModal = () => {
    setOpenChainSelector(true);
  };

  return {
    openChainSelector,
    setOpenChainSelector,
    openChainSelectorModal
  };
};

export default useChainSelector;
