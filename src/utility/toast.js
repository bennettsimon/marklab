import toast from "react-hot-toast";

export function toastSuccess(string) {
  return toast.success(string, {
    duration: 2000,
    className:
      "text-sm text-slate-600 shadow-2xl shadow-slate-400/50 rounded-xl",
  });
}
