import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type HTMLElRef = MutableRefObject<HTMLElement>;

export type UsePortalOptions = {
  isOpen?: boolean;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
};

export default function usePortal({
  isOpen: defaultIsOpen = false,
  closeOnEsc = true,
  closeOnOutsideClick = true,
}: UsePortalOptions = {}) {
  const [isOpen, makeOpen] = useState(defaultIsOpen);
  const open = useRef(isOpen);

  const setOpen = useCallback((v: boolean) => {
    open.current = v;
    makeOpen(v);
  }, []);

  const targetEl = useRef() as HTMLElRef;
  const portal = useRef(document.createElement("div")) as HTMLElRef;

  const elementMountTo = useMemo(() => {
    return document.body;
  }, []);

  const openPortal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closePortal = useCallback(() => {
    if (open.current) {
      setOpen(false);
    }
  }, [setOpen]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent): void =>
      e.key === "Escape" && closeOnEsc ? closePortal() : undefined,
    [closeOnEsc, closePortal]
  );

  const handleOutsideMouseDownClick = useCallback(
    (e: MouseEvent): void => {
      const containsTarget = (target: HTMLElRef) =>
        target.current.contains(e.target as HTMLElement);
      
      if (containsTarget(portal) || !open.current) {
        return;
      }
      
      if (closeOnOutsideClick) {
        closePortal();
      }
    },
    [closeOnOutsideClick, closePortal, portal]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent): void => {
      if (!(portal.current instanceof HTMLElement)) {
        return;
      }
      handleOutsideMouseDownClick(e);
    },
    [handleOutsideMouseDownClick]
  );

  useEffect(() => {
    if (!portal.current) {
      portal.current = document.createElement("div");
    }
  }, [portal]);

  useEffect(() => {
    if (
      !(elementMountTo instanceof HTMLElement) ||
      !(portal.current instanceof HTMLElement)
    ) {
      return;
    }

    const node = portal.current;
    elementMountTo.appendChild(portal.current);
    
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleMouseDown);
      elementMountTo.removeChild(node);
    };
  }, [elementMountTo, handleKeydown, handleMouseDown, portal]);

  const Portal = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (portal.current !== null) {
        return createPortal(children, portal.current);
      }
      return null;
    },
    [portal]
  );

  return {
    openPortal,
    closePortal,
    isOpen: open.current,
    Portal,
  };
}