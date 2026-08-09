"use client";
import { useState, type ReactNode } from "react";
import { getAsset } from "../../core/assets/manifest";

export function AssetImage({id,className="",fallback=null,loading="lazy",decorative=false}:{id:string;className?:string;fallback?:ReactNode;loading?:"lazy"|"eager";decorative?:boolean}){
 const[failed,setFailed]=useState(false);const item=getAsset(id);
 if(!item||failed)return <>{fallback}</>;
 // Native loading keeps chapter assets lazy and preserves the existing static-public deployment.
 // eslint-disable-next-line @next/next/no-img-element
 return <img className={className} src={item.path} alt={item.decorative||decorative?"":item.alt} aria-hidden={item.decorative||decorative||undefined} loading={loading} decoding="async" onError={()=>{console.warn(`Asset konnte nicht geladen werden: ${id}`);setFailed(true)}}/>;
}
export function AssetBackdrop({id}:{id:string}){return <AssetImage id={id} className="asset-backdrop" fallback={null}/>}
