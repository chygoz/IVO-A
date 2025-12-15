"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SigninForm from "./forms/signin";

type LoginModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  cb: () => void;
};

function LoginModal({ open, setOpen, cb }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <SigninForm cb={cb} />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
