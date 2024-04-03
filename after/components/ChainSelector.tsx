import React from 'react';

interface ChainSelectorProps {
  title: string;
  openChainSelector: any;
  setOpenChainSelector: any;
  chains: any[];
  selectedChain: any;
  setSelectedChain: any;
}

const ChainSelector: React.FC<ChainSelectorProps> = ({
  title,
  openChainSelector,
  setOpenChainSelector,
  chains,
  selectedChain,
  setSelectedChain,
}) => {
  return (
    <div className="chain-selector">
      <p className="title">{title}</p>
      <div className="chain-options">
        {chains.map((chain) => (
          <div
            key={chain.id}
            className={`chain-option ${selectedChain?.id === chain.id ? 'selected' : ''}`}
            onClick={() => setSelectedChain(chain)}
          >
            <img src={chain.logo} alt={chain.name} className="chain-logo" />
            <p className="chain-name">{chain.name}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default ChainSelector;
