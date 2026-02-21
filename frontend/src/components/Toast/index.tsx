import { Toaster as SonnerToaster, toast } from "sonner";

function Toast() {

  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          default: "flex min-w-[250px] flex-wrap [&>button]:bg-transparent! [&>button]:text-white! [&>button]:cursor-pointer items-center gap-3 rounded-md p-3 text-white! bg-gray-950!",
          toast: "border-b border-b-gray-400! bg-gray-600!",
          success: "border-b border-b-green-300! bg-green-700!",
          error: "border-b border-b-red-base! bg-red-dark!",
          warning: "border-b border-yellow-300! bg-yellow-base!",
          info: "border-b border-b-blue-base! bg-blue-dark!",
        },
      }}
    />
  );
}

export { Toast, toast };
