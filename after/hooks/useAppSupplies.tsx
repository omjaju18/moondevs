import { useState, useEffect } from 'react';

const useAppSupplies = (initialValue) => {
 
  const [supplies, setSupplies] = useState([]);
  const [allSupplies, setAllSupplies] = useState([]);
  const [suppliesChain, setSuppliesChain] = useState('');


  const fetchSupplies = () => {
    // Logic for fetching supplies
  };

  
  useEffect(() => {
    fetchSupplies();
  }, [suppliesChain]);

  
  return {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies
  };
};

export default useAppSupplies;
