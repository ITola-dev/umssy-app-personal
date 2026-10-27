'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAccessToken } from '@/shared/services/storage/access-token-storage';
import { radarIntegrationApi } from '../sprint2-integration/radar-integration-api';
import { getCurrentProfileSkills } from './radar-api';
import { mapEpic2Radar } from './radar-mapper';
import type { RadarBridgeView } from './types';

/** El JSON de Épica 2 aporta habilidades; la versión y puntuaciones publicadas
 * se obtienen únicamente del backend persistente de Épica 3. */
export function useLiveRadar(){
  const [data,setData]=useState<RadarBridgeView|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const [variation,setVariation]=useState<number|null>(null);
  const lastSession=useRef<string|null>(null);
  const currentVersion=useRef(0);
  const inFlight=useRef(false);
  const refresh=useCallback(async()=>{
    if(inFlight.current)return;
    const token=getAccessToken();
    if(lastSession.current!==token){lastSession.current=token;currentVersion.current=0;setData(null);setVariation(null);}
    inFlight.current=true;
    try{
      const [source,stored]=await Promise.all([getCurrentProfileSkills(),radarIntegrationApi.me()]);
      if(lastSession.current!==getAccessToken())return;
      if(source.userId!==stored.userId)throw new Error('Desajuste de sesión');
      const mapped=mapEpic2Radar(source);
      const publishedIds=new Set(Object.values(stored.evidence).flat().map(e=>e.id));
      const visibleSkills=mapped.approved.filter(s=>publishedIds.has(s.id));
      if(stored.version<currentVersion.current)return;
      currentVersion.current=stored.version;
      const next:RadarBridgeView={
        ...mapped,
        status:stored.hasPending?'pending':source.status==='error'?'error':'ready',
        version:stored.version,updatedAt:stored.updatedAt,
        areas:mapped.areas.map(a=>({...a,score:stored.scores[a.id]??0})),
        average:stored.average,pendingCount:stored.pending,
        approved:visibleSkills,keywordCount:visibleSkills.length,
        highRelevanceCount:visibleSkills.filter(s=>s.isHighRelevance).length,
      };
      setData(next);setVariation(stored.variation);setError(null);
    }catch{if(lastSession.current===getAccessToken())setError('No se pudo actualizar el radar publicado. Comprueba el backend y vuelve a intentarlo.');}
    finally{inFlight.current=false;setLoading(false);}
  },[]);
  useEffect(()=>{
    // Programar la carga fuera del cuerpo síncrono del efecto.
    void Promise.resolve().then(()=>refresh());
    const timer=window.setInterval(()=>{void refresh()},1500);
    return()=>window.clearInterval(timer);
  },[refresh]);
  return {data,loading,error,variation,refresh};
}
