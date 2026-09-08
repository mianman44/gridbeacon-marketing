"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Edit,
  KeyRound,
  Loader2,
  MapPinned,
  MoreHorizontal,
  RefreshCw,
  Play,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface BusinessActionsProps {
  projectId: number;
  businessId: number;
  mapsUrl?: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

type MenuPosition = {
  top: number;
  left: number;
};

export default function BusinessActions({
  projectId,
  businessId,
  mapsUrl,
  onEdit,
  onDelete,
  onRefresh,
  refreshing = false,
}: BusinessActionsProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] =
    useState<MenuPosition>({
      top: 0,
      left: 0,
    });

  const triggerRef =
    useRef<HTMLButtonElement | null>(null);

  const menuRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function updatePosition() {
      const trigger =
        triggerRef.current?.getBoundingClientRect();

      if (!trigger) {
        return;
      }

      const menuWidth = 224;
      const spacing = 8;

      let left =
        trigger.right - menuWidth;

      if (left < spacing) {
        left = spacing;
      }

      let top =
        trigger.bottom + spacing;

      const estimatedMenuHeight = 300;
      const availableBelow =
        window.innerHeight - trigger.bottom;

      if (
        availableBelow <
        estimatedMenuHeight + spacing
      ) {
        top =
          trigger.top -
          estimatedMenuHeight -
          spacing;
      }

      setPosition({
        top,
        left,
      });
    }

    function handleOutsideClick(
      event: MouseEvent
    ) {
      const target = event.target as Node;

      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    updatePosition();

    window.addEventListener(
      "resize",
      updatePosition
    );

    window.addEventListener(
      "scroll",
      updatePosition,
      true
    );

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "resize",
        updatePosition
      );

      window.removeEventListener(
        "scroll",
        updatePosition,
        true
      );

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open]);

  const menu =
    open && mounted
      ? createPortal(
          <div
            ref={menuRef}
            style={{
              top: position.top,
              left: position.left,
            }}
            className="fixed z-[9999] w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <Edit className="mr-3 h-4 w-4 text-slate-400" />
              Edit Business
            </button>

            {onRefresh && (
              <button
                type="button"
                disabled={refreshing}
                onClick={() => {
                  setOpen(false);
                  onRefresh();
                }}
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {refreshing ? (
                  <Loader2 className="mr-3 h-4 w-4 animate-spin text-slate-400" />
                ) : (
                  <RefreshCw className="mr-3 h-4 w-4 text-slate-400" />
                )}
                {refreshing
                  ? "Refreshing Profile..."
                  : "Refresh Profile"}
              </button>
            )}
            <Link
              href={`/projects/${projectId}/keywords`}
              onClick={() => setOpen(false)}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <KeyRound className="mr-3 h-4 w-4 text-slate-400" />
              Manage Keywords
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <Play className="mr-3 h-4 w-4 text-slate-400" />
              Start Scan
            </button>

            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <MapPinned className="mr-3 h-4 w-4 text-slate-400" />
                Open in Google Maps
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center rounded-lg px-3 py-2 text-left text-sm text-slate-400"
              >
                <MapPinned className="mr-3 h-4 w-4" />
                Google Maps unavailable
              </button>
            )}

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="mr-3 h-4 w-4" />
              Delete Business
            </button>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Open business actions"
        aria-expanded={open}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((current) => !current);
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {menu}
    </>
  );
}
