"use client";
import { useEffect, useRef } from "react";
import { pricingMarkup } from "./stitch-pricing-markup";

export function StitchPricing() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current!;
    let points = 81, frequency = 4.33, annual = false;
    const find = <T extends HTMLElement = HTMLElement>(id: string) => container.querySelector<T>(`#${id}`)!;
    const write = (id: string, value: string) => { find(id).textContent = value; };
    const selected = (selector: string, current: HTMLElement) => container.querySelectorAll<HTMLElement>(selector).forEach(button => {
      const active = button === current;
      button.setAttribute("aria-pressed", String(active));
      for (const name of ["bg-primary", "text-on-primary", "shadow-sm", "font-semibold"]) button.classList.toggle(name, active);
      for (const name of ["bg-surface-container", "font-medium"]) button.classList.toggle(name, !active);
    });
    const calculate = () => {
      const locations = Number(find<HTMLInputElement>("slider-locations").value);
      const keywords = Number(find<HTMLInputElement>("slider-keywords").value);
      write("label-locations", `${locations} ${locations === 1 ? "profile" : "profiles"}`);
      write("label-keywords", `${keywords} ${keywords === 1 ? "keyword" : "keywords"}`);
      const credits = Math.round(locations * keywords * points * frequency);
      write("calc-credits-total", credits.toLocaleString("en-US"));
      write("calc-trimmed-pts", Math.round(credits * .7).toLocaleString("en-US"));
      const tier = credits <= 500 ? 0 : credits <= 8000 ? 1 : credits <= 15000 ? 2 : 3;
      const names = ["Free Tier", "Starter Plan", "Professional Plan", "Agency Plan"];
      const caps = [500, 8000, 15000, 32000];
      const prices = annual ? [0, 15.99, 27.99, 55.99] : [0, 19.99, 34.99, 69.99];
      write("calc-recommended-tier", names[tier]);
      write("calc-recommended-cap", tier === 0 ? "500 one-time signup credits ($0)" : `${caps[tier].toLocaleString("en-US")} monthly credits ($${prices[tier]}/mo)${credits > 32000 ? " + top-up credits required" : ""}`);
      write("calc-cta-btn", tier === 0 ? "Start with Free Tier" : `Choose ${names[tier]}`);
    };
    const toggleFaq = (card: HTMLElement) => {
      const expanded = card.getAttribute("aria-expanded") !== "true";
      card.setAttribute("aria-expanded", String(expanded));
      card.querySelector(".faq-answer")?.classList.toggle("hidden", !expanded);
      card.querySelector(".material-symbols-outlined")?.classList.toggle("rotate-180", expanded);
    };
    const click = (event: Event) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("button,[data-faq]");
      if (!target) return;
      if (target.dataset.faq) { toggleFaq(target); return; }
      if (target.dataset.grid) {
        points = Number(target.dataset.grid); selected(".grid-btn", target);
        write("label-grid-points", `${Math.sqrt(points)}×${Math.sqrt(points)} = ${points} scan points`);
      } else if (target.dataset.frequency) {
        frequency = Number(target.dataset.frequency); selected(".freq-btn", target);
      } else if (target.id === "btn-monthly" || target.id === "btn-annual") {
        annual = target.id === "btn-annual";
        for (const id of ["btn-monthly", "btn-annual"]) {
          const button = find(id), active = button === target;
          button.setAttribute("aria-pressed", String(active));
          for (const name of ["bg-surface-container-lowest", "text-on-surface", "shadow-sm"]) button.classList.toggle(name, active);
          button.classList.toggle("text-on-surface-variant", !active);
        }
        container.querySelectorAll<HTMLElement>(".price-val").forEach(el => { el.textContent = (annual ? el.dataset.annual : el.dataset.monthly) || ""; });
        container.querySelectorAll<HTMLElement>(".billing-note").forEach(el => { el.textContent = annual ? "Billed annually • Save 20%" : "Billed monthly • Cancel anytime"; });
      }
      calculate();
    };
    const keydown = (event: KeyboardEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-faq]");
      if (target && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); toggleFaq(target); }
    };
    selected(".grid-btn", container.querySelector<HTMLElement>('[data-grid="81"]')!);
    selected(".freq-btn", container.querySelector<HTMLElement>('[data-frequency="4.33"]')!);
    find("btn-monthly").setAttribute("aria-pressed", "true");
    find("btn-annual").setAttribute("aria-pressed", "false");
    calculate();
    container.addEventListener("click", click);
    container.addEventListener("input", calculate);
    container.addEventListener("keydown", keydown);
    return () => { container.removeEventListener("click", click); container.removeEventListener("input", calculate); container.removeEventListener("keydown", keydown); };
  }, []);
  return <div ref={root} id="stitch-pricing" dangerouslySetInnerHTML={{ __html: pricingMarkup }} />;
}
