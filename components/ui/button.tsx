import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md",

        outline:
          "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:shadow-md",

        secondary:
          "bg-slate-100 text-slate-800 hover:bg-slate-200",

        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",

        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md",

        success:
          "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md",

        warning:
          "bg-amber-500 text-white shadow-sm hover:bg-amber-600 hover:shadow-md",

        link:
          "text-blue-600 underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-4 gap-2",

        xs: "h-7 px-2.5 text-xs gap-1",

        sm: "h-9 px-3 text-sm gap-2",

        lg: "h-11 px-6 text-base gap-2",

        icon: "h-10 w-10 p-0",

        "icon-xs": "h-7 w-7 p-0",

        "icon-sm": "h-9 w-9 p-0",

        "icon-lg": "h-11 w-11 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };