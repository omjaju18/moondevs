import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { Signer } from 'ethers';

interface EthersSignerOptions {
  chainId: number;
}

const useEthersSigner = ({ chainId }: EthersSignerOptions) => {
  const { library } = useEthers();

  useEffect(() => {
    if (library) {
      const signer: Signer = library.getSigner();
      // Do something with the signer
    }
  }, [library, chainId]);

  // Return any values or functions needed by components
};

export default useEthersSigner;
