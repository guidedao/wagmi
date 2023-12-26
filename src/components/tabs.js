import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import TradingViewWidget from "@/components/chart";

const SelectComponent = () => (
  <Select.Root defaultValue="option1">
    <Select.Trigger className="border border-solid border-black w-full inline-flex items-center justify-center rounded px-[15px] mt-[40px] text-[13px] leading-none h-[55px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none">
      <Select.Value />
      <Select.Icon>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="w-full p-[10px] overflow-hidden bg-white rounded-md shadow-lg ">
        <Select.Viewport>
          <Select.Item value="option1" className="select-item flex ">
            <Select.ItemText>LINK</Select.ItemText>
            <Select.ItemIndicator className="relative top-[5px] ml-[5px]">
              <CheckIcon />
            </Select.ItemIndicator>
          </Select.Item>
          <Select.Item value="option2" className="select-item flex">
            <Select.ItemText>WETH</Select.ItemText>
            <Select.ItemIndicator className="relative top-[5px] ml-[5px]">
              <CheckIcon />
            </Select.ItemIndicator>
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export const TabsDemo = () => (
  <div>
    <TradingViewWidget />
    <Tabs.Root
      className="flex flex-col min-w-[300px] w-[700px] shadow-[0_2px_10px] shadow-blackA2"
      defaultValue="tab1"
    >
      <Tabs.List
        className="shrink-0 flex border-b border-mauve6"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab1"
        >
          Buy
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab2"
        >
          Sell
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab1"
      >
        <SelectComponent />
        <fieldset className="mb-[15px] mt-[20px] w-full flex flex-col justify-start">
          <label
            className="text-[13px] leading-none mb-2.5 text-violet12 block"
            htmlFor="name"
          >
            USDC
          </label>
          <input
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
            id="value"
            type="number"
            defaultValue="Введите число"
          />
        </fieldset>
        <div className="flex justify-end mt-5">
          <button className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
            Create order
          </button>
        </div>
      </Tabs.Content>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab2"
      >
        <SelectComponent />
        <fieldset className="mb-[15px] mt-[20px] w-full flex flex-col justify-start">
          <label
            className="text-[13px] leading-none mb-2.5 text-violet12 block"
            htmlFor="name"
          >
            USDC
          </label>
          <input
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
            id="value"
            type="number"
            defaultValue="Введите число"
          />
        </fieldset>
        <div className="flex justify-end mt-5">
          <button className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
            Create order
          </button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  </div>
);

export default TabsDemo;
