import React from 'react';
import styled from 'styled-components';

interface TransactionTableProps {
  data: any[];
  priceUSD?: number;
}

const TableWrapper = styled.div`
 
`;

const TransactionTable: React.FC<TransactionTableProps> = ({ data, priceUSD }) => {
  return (
    <TableWrapper>
      <div className="header">
        <p className="header_label">Burn Transactions</p>
      </div>
      
    </TableWrapper>
  );
};

export default TransactionTable;
