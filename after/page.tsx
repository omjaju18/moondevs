import React, { ChangeEvent, useEffect, useState } from "react";
import styled from 'styled-components';

import DashboardLayoutStyled from "./components/DashboardLayoutStyled";
import { BurnButtonBar } from "./components/BurnButtonBar";
import BurnStatsContainer from "./components/BurnStatsContainer";
import AppIcon from "./components/AppIcon";
import AppExtLink from "./components/AppExtLink";
import ChainSelector from "./components/ChainSelector";
import TransactionTableStyled from "./components/TransactionTableStyled";
import AppToast from "./components/AppToast";
import BurnTxTable from "./components/BurnTxTable";


import { useWallet } from "./hooks/useWallet";
import { useChainSelector } from "./hooks/useChainSelector";
import { useAppSupplies } from "./hooks/useAppSupplies";
import { useEthersSigner } from "./hooks/useEthersSigner";
import { ToastSeverity, useAppToast } from "./hooks/useAppToast";


const BurnPageStyled = styled.div``;

enum BurnTxProgress {
  default = "Burn App Tokens",
  burning = "Burning...",
}

export const BurnPage = () => {
  const {
    walletAddress,
    isWalletConnected,
    walletBalance,
    isBalanceError,
    openChainModal,
    walletChain,
    chains,
    openConnectModal,
  } = useWallet();
  const { openChainSelector, setOpenChainSelector, openChainSelectorModal } =
    useChainSelector();
  const { chains: receiveChains } = useWallet();
  const {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies,
  } = useAppSupplies(true);
  const [burnTransactions, setBurnTransactions] = useState<any[]>([]);
  const [isOldToken, setIsOldToken] = useState(false);
  const [burnAmount, setBurnAmount] = useState("");
  const { toastMsg, toastSev, showToast } = useAppToast();
  const ethersSigner = useEthersSigner({
    chainId: walletChain?.id ?? chainEnum.mainnet,
  });
  const [txButton, setTxButton] = useState<BurnTxProgress>(
    BurnTxProgress.default
  );
  const [txProgress, setTxProgress] = useState<boolean>(false);
  const [approveTxHash, setApproveTxHash] = useState<string | null>(null);
  const [burnTxHash, setBurnTxHash] = useState<string | null>(null);
  const [coinData, setCoinData] = useState<any>({});

  useEffect(() => {
    CoinGeckoApi.fetchCoinData()
      .then((data: any) => {
        setCoinData(data?.market_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeBurnAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") setBurnAmount("");
    if (isNaN(parseFloat(e.target.value))) return;
    setBurnAmount(e.target.value);
  };

  const refetchTransactions = () => {
    Promise.all(
      ChainScanner.fetchAllTxPromises(isChainTestnet(walletChain?.id))
    )
      .then((results: any) => {
        let res = results.flat();
        res = ChainScanner.sortOnlyBurnTransactions(res);
        res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
        setBurnTransactions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const executeBurn = async () => {
    if (!isWalletConnected) {
      openConnectModal();
    }
    if (burnAmount === "") {
      console.log("Enter amount to migrate");
      showToast("Enter amount to migrate", ToastSeverity.warning);
      return;
    }
    const newTokenAddress = fetchAddressForChain(walletChain?.id, "newToken");
    const oftTokenContract = new Contract(
      newTokenAddress,
      oftAbi,
      ethersSigner
    );
    let amount = parseEther(burnAmount);
    setTxButton(BurnTxProgress.burning);
    setTxProgress(true);
    try {
      const burnTx = await oftTokenContract.burn(amount);
      setBurnTxHash(burnTx.hash);
      await burnTx.wait();
      setTxButton(BurnTxProgress.default);
      setTxProgress(false);
      refetchTransactions();
      fetchSupplies();
    } catch (err) {
      console.log(err);
      setTxButton(BurnTxProgress.default);
      setTxProgress(false);
      showToast("Burn Failed!", ToastSeverity.error);
      return;
    }
  };

  useEffect(() => {
    if (!walletChain) return;
    let isSubscribed = true;
    if (isSubscribed) setBurnTransactions([]);
    const isTestnet = isChainTestnet(walletChain?.id);
    let _chainObjects: any[] = [mainnet, avalanche, fantom];
    if (isTestnet) _chainObjects = [sepolia, avalancheFuji, fantomTestnet];
    Promise.all(ChainScanner.fetchAllTxPromises(isTestnet))
      .then((results: any) => {
        if (isSubscribed) {
          let new_chain_results: any[] = [];
          results.forEach((results_a: any[], index: number) => {
            new_chain_results.push(
              results_a.map((tx: any) => ({
                ...tx,
                chain: _chainObjects[index],
              }))
            );
          });
          let res = new_chain_results.flat();
          res = ChainScanner.sortOnlyBurnTransactions(res);
          res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
          setBurnTransactions(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSubscribed = false;
    };
  }, [walletChain, isOldToken]);

  /* Making all components in seperate file for make it more readable */

  return (
    <div>
      <DashboardLayoutStyled className="burnpage">
        <div
          className="top_conatiner burnpage"
          style={{ alignItems: "flex-start" }}
        >
          <div className="info_box filled">
            <h1 className="title">App TOKEN BURN</h1>
            <p className="description medium"></p>
            <BurnButtonBar
              burnAmount={burnAmount}
              onChangeBurnAmount={onChangeBurnAmount}
              executeBurn={executeBurn}
              txButton={txButton}
              txProgress={txProgress}
              burnTxHash={burnTxHash}
            />
          </div>
          <BurnStatsContainer
            suppliesChain={suppliesChain}
            statsSupplies={statsSupplies}
            allSupplies={allSupplies}
            openChainModal={openChainModal}
            tokenAddress={tokenAddress}
            walletChain={walletChain}
            numberWithCommas={numberWithCommas}
            AppIcon={AppIcon}
            AppChip={AppChip}
            AppExtLink={AppExtLink}
            IconFilter={IconFilter}
            chainTokenSymbols={chainTokenSymbols}
          />
        </div>
      </DashboardLayoutStyled>
      <ChainSelector
        title={"Switch Token Chain"}
        openChainSelector={openChainSelector}
        setOpenChainSelector={setOpenChainSelector}
        chains={receiveChains}
        selectedChain={suppliesChain}
        setSelectedChain={setSuppliesChain}
      />
      <TransactionTableStyled>
        <div className="header">
          <p className="header_label">Burn Transactions</p>
        </div>

        <BurnTxTable
          data={burnTransactions}
          priceUSD={coinData?.current_price?.usd}
        />

      </TransactionTableStyled>

      <AppToast
        position={{ vertical: 'bottom', horizontal: 'center' }}
        message={toastMsg}
        severity={toastSev}
      />

    </div>
  );
};

export default BurnPage;
