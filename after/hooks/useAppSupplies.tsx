import { useState, useEffect } from 'react';

const useAppSupplies = (initialValue) => {
  // Define state variables
  const [supplies, setSupplies] = useState([]);
  const [allSupplies, setAllSupplies] = useState([]);
  const [suppliesChain, setSuppliesChain] = useState('');


  const fetchSupplies = () => {
    // Logic for fetching supplies
  };

  
  useEffect(() => {
    fetchSupplies();
  }, [suppliesChain]);

  // Return values and functions to be used by components
  return {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies
  };
};

export default useAppSupplies;
