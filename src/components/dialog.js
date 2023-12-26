import * as Dialog from "@radix-ui/react-dialog";

export default function PopUp({ open, setIsDialogOpen }) {
  return (
    <Dialog.Root open={open} onOpenChange={setIsDialogOpen}>
      {/* <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
          <Dialog.Title className="text-black text-[28px] pt-[40px]">
            Транзакции прошли успешно!
          </Dialog.Title>
          <Dialog.Description className="text-black text-[18px] pt-[20px]">
            Мы получили разрешение на использование LINK и WETH!
          </Dialog.Description>
          <Dialog.Close className="text-black absolute top-2 right-2">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal> */}
    </Dialog.Root>
  );
}
