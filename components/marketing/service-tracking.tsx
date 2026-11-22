'use client';
import {useEffect,useState} from 'react';
import {trackEvent} from '@/lib/tracking';
const viewed=new Set<string>();
function trackService(name:string,params:Record<string,string>){
  trackEvent(name,{...params,page_location:window.location.origin+'/services',page_referrer:window.location.origin});
}

export function ServiceView({serviceId='catalog'}:{serviceId?:string}) {
  useEffect(()=>{if(viewed.has(serviceId))return;viewed.add(serviceId);trackService('seo_service_viewed',{placement:'public_services',service_id:serviceId})},[serviceId]);
  return null;
}
export function ServiceRequestLink({href,serviceId,className}:{href:string;serviceId:string;className:string}) {
  return <a className={className} href={href} onClick={()=>trackService('seo_service_request_clicked',{placement:'public_services',service_id:serviceId})}>Request this service →</a>;
}

// Anonymous report links expose no workspace identity. This is a clearly labelled
// general service link, not a personalized diagnosis inferred from the report.
export function FreeCheckServicePrompt() {
  const [visible,setVisible]=useState(false);
  useEffect(()=>{if(process.env.NEXT_PUBLIC_SEO_SERVICES_ENABLED!=='true'||process.env.NEXT_PUBLIC_SEO_SERVICE_FREE_CHECK_PROMOTION!=='true')return;try{setVisible(Number(localStorage.getItem('gridbeacon:public-service-dismissed'))<Date.now())}catch{/* Remain hidden if the browser cannot remember dismissal. */}},[]);
  if(!visible)return null;
  return <aside aria-label='Optional paid SEO services' style={{margin:'24px 0',padding:20,border:'1px solid #dce4ee',borderRadius:12,background:'#f5f9ff'}}><button type='button' aria-label='Dismiss service promotion' style={{float:'right'}} onClick={()=>{setVisible(false);try{localStorage.setItem('gridbeacon:public-service-dismissed',String(Date.now()+30*86400000))}catch{}}}>×</button><p><strong>Optional paid service</strong></p><p>Prefer expert help reviewing your local presence? Explore the available service scopes. A ranking scan alone does not diagnose a specific SEO issue.</p><a href='/services' onClick={()=>trackService('seo_service_recommendation_clicked',{placement:'free_rank_checker',reason:'general_help'})}>Explore Local SEO Services →</a></aside>;
}
