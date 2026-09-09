"use client";
import { useEffect, useRef } from "react";
import { howMarkup } from "./stitch-how-markup";
const specs: Record<string, [string, string, string]> = {
  "3": ["0.5 - 2 miles", "Small Downtown Footprint", "35 sec"],
  "5": ["1 - 5 miles", "Standard Suburban Clinic / Retail", "45 sec"],
  "9": ["3 - 15 miles", "Regional Service Area (HVAC, Plumbers)", "60 sec"],
  "13": ["10 - 30 miles", "Metro-Wide Multi-Location Franchises", "75 sec"],
  "21": ["20 - 75 miles", "Mega Regional Domination & Enterprise", "90 sec"],
};
export function StitchHow() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current!;
    const buttons = container.querySelectorAll<HTMLButtonElement>("[data-grid]");
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.grid === "9")));
    const update = (event: Event) => {
      const target = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-grid]");
      const dimension = target?.dataset.grid;
      if (!target || !dimension || !specs[dimension]) return;
      buttons.forEach(button => {
        const active = button === target;
        button.setAttribute("aria-pressed", String(active));
        for (const name of ["active-grid", "border-2", "border-brand-600", "bg-brand-50"]) button.classList.toggle(name, active);
        for (const name of ["border", "border-slate-300", "bg-white"]) button.classList.toggle(name, !active);
      });
      const [radius, use, time] = specs[dimension];
      for (const [id, value] of [["spec-credits", `${Number(dimension) ** 2} Credits`], ["spec-radius", radius], ["spec-use", use], ["spec-time", `~${time}`]]) container.querySelector<HTMLElement>(`#${id}`)!.textContent = value;
    };
    container.querySelector("#spec-credits")?.setAttribute("aria-live", "polite");
    container.addEventListener("click", update);
    return () => container.removeEventListener("click", update);
  }, []);
  return <div ref={root} id="stitch-how" dangerouslySetInnerHTML={{ __html: howMarkup }} />;
}
