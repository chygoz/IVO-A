// hooks/use-toast.ts
import * as React from "react";
import {
  type ToastActionElement,
  type ToastProps,
} from "@/components/ui/toast";

const TOAST_LIMIT = 5;

export type ToastType = "success" | "error" | "warning" | "info";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: ToastActionElement;
  duration?: number;
  type?: ToastType;
};

export interface Toast extends ToastProps {
  id: string;
  title?: any;
  description?: React.ReactNode;
  action?: ToastActionElement;
  type?: any;
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: Toast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<Toast> & { id: string };
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId: string;
    };

interface State {
  toasts: Toast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // Clear any existing timeout
      if (toastTimeouts.has(toastId)) {
        clearTimeout(toastTimeouts.get(toastId));
        toastTimeouts.delete(toastId);
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case actionTypes.REMOVE_TOAST:
      if (toastTimeouts.has(action.toastId)) {
        clearTimeout(toastTimeouts.get(action.toastId));
        toastTimeouts.delete(action.toastId);
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/**
 * Creates a toast notification
 */
function toast(props: ToastOptions) {
  const id = genId();

  // Select the variant based on type if not explicitly provided
  let variant = props.variant;
  if (!variant && props.type) {
    switch (props.type) {
      case "error":
        variant = "destructive";
        break;
      default:
        variant = "default";
        break;
    }
  }

  const update = (props: ToastOptions) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    });

  const dismiss = () =>
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      variant,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

/**
 * React hook for managing toasts
 */
export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId: string) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

/**
 * Convenience methods for different toast types
 */
toast.success = (props: Omit<ToastOptions, "type" | "variant">) =>
  toast({ ...props, type: "success" });

toast.error = (props: Omit<ToastOptions, "type" | "variant">) =>
  toast({ ...props, type: "error", variant: "destructive" });

toast.warning = (props: Omit<ToastOptions, "type" | "variant">) =>
  toast({ ...props, type: "warning" });

toast.info = (props: Omit<ToastOptions, "type" | "variant">) =>
  toast({ ...props, type: "info" });

export { toast };
