import {cache} from 'react';
export type ServicePackage={id:string;slug:string;name:string;description:string;scope:string[];exclusions:string;requirements:string;turnaround_policy:string;cancellation_terms:string;revision_policy:string;payment_terms:string;price_minor:number;currency:string};
export const servicesEnabled=process.env.NEXT_PUBLIC_SEO_SERVICES_ENABLED==='true';
export const getServiceCatalog=cache(async ():Promise<ServicePackage[]|null>=>{
 if(!servicesEnabled)return [];
 const base=process.env.SEO_SERVICE_API_URL;
 if(!base)return null;
 try{const response=await fetch(`${base.replace(/\/$/,'')}/seo-services/catalog`,{cache:'no-store',signal:AbortSignal.timeout(5000)});if(!response.ok)return null;const data=await response.json();return Array.isArray(data.items)?data.items:null}catch{return null}
});
export function servicePrice(p:ServicePackage){const f=new Intl.NumberFormat('en',{style:'currency',currency:p.currency});return f.format(p.price_minor/10**(f.resolvedOptions().maximumFractionDigits??2));}
