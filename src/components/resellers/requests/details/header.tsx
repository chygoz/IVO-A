"use client";
import { Submission, SubmissionStatus } from "@/actions/submissions/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, ChevronDown, X, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addSubmissionVerdict } from "@/actions/submissions";
import { toast } from "sonner";
import ButtonText from "@/components/ui/buttonText";
import { revalidatePage } from "@/actions/revalidate.tag";
import { usePathname } from "next/navigation";

type RequestHeaderProps = {
  request: Submission;
};

function RequestHeader({ request }: RequestHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [actionType, setActionType] = useState<SubmissionStatus | null>(null);
  const [actionReason, setActionReason] = useState("");
  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: addSubmissionVerdict,
    onSuccess() {
      toast.success("successfully updated request");
      setDialogOpen(false);
      revalidatePage(pathname);
    },
  });

  const handleAction = (status: SubmissionStatus) => {
    setActionType(status);
    setActionReason("");
    setDropdownOpen(false); // Close dropdown first
    setTimeout(() => {
      setDialogOpen(true); // Open dialog after dropdown has closed
    }, 100);
  };

  function onUpdateStatus(status: SubmissionStatus, reason: string) {
    mutation.mutate({
      submissionId: request._id,
      payload: {
        status,
        reason,
      },
    });
    // Implement your update logic here
  }

  const confirmAction = () => {
    if (actionType) {
      onUpdateStatus(actionType, actionReason);
      setDialogOpen(false);
    }
  };

  const handleDialogOpenChange = (newOpen: boolean) => {
    setDialogOpen(newOpen);
    if (!newOpen) {
      // Reset state when closing dialog
      setTimeout(() => {
        setActionType(null);
        setActionReason("");
      }, 100);
    }
  };

  const getStatusColor = (status: SubmissionStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      case "modified":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="min-h-64 p-4 lg:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold capitalize">
              {request.business.name}
            </h2>
            <Badge className={getStatusColor(request.status)}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            <p>Request ID: {request._id}</p>
            <p>
              Type:{" "}
              {request.type.charAt(0).toUpperCase() + request.type.slice(1)} (
              {request.category})
            </p>
            <p>
              Initiated by:{" "}
              <span className="font-medium capitalize">
                {request.initiated.user.firstName}{" "}
                {request.initiated.user.lastName}
              </span>{" "}
              on{" "}
              {format(new Date(request.initiated.initiatedAt), "MMM dd, yyyy")}
            </p>
            <p>Items: {request.items.length}</p>
          </div>
        </div>

        <div className="flex gap-2 self-end md:self-auto">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {request.status === "pending" && (
                <>
                  <DropdownMenuItem onSelect={() => handleAction("approved")}>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Approve Request
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleAction("rejected")}>
                    <X className="mr-2 h-4 w-4 text-red-600" />
                    Reject Request
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleAction("modified")}>
                    <AlertCircle className="mr-2 h-4 w-4 text-blue-600" />
                    Request Modifications
                  </DropdownMenuItem>
                </>
              )}
              {request.status !== "cancelled" &&
                request.status !== "approved" && (
                  <DropdownMenuItem onSelect={() => handleAction("cancelled")}>
                    <X className="mr-2 h-4 w-4 text-gray-600" />
                    Cancel Request
                  </DropdownMenuItem>
                )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approved" && "Approve Request"}
              {actionType === "rejected" && "Reject Request"}
              {actionType === "cancelled" && "Cancel Request"}
              {actionType === "modified" && "Request Modifications"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want this request to be {actionType} ? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <textarea
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Provide a reason (optional)"
            rows={3}
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
          />

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={mutation.isPending}
              onClick={confirmAction}
              className={
                actionType === "approved"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : actionType === "rejected"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : actionType === "modified"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }
            >
              <ButtonText loading={mutation.isPending}> Confirm</ButtonText>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default RequestHeader;
