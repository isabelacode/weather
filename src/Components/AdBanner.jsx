import { useEffect, useRef } from 'react';

export const AdBanner = () => {
   const adRef = useRef(null); // Referência para evitar múltiplas execuções

   useEffect(() => {
      if (window.adsbygoogle && adRef.current) {
         try {
            // Só executa se ainda não tiver sido carregado
            if (!adRef.current.dataset.loaded) {
               window.adsbygoogle.push({});
               adRef.current.dataset.loaded = 'true'; // Marca o elemento como carregado
            }
         } catch (e) {
            console.error('Falha ao carregar o anúncio:', e);
         }
      }
   }, []);

   return (
      <ins
         ref={adRef}
         className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-format="fluid"
         data-ad-layout-key="-fb+5w+4e-db+86"
         data-ad-client={process.env.REACT_APP_AD_CLIENT} // Variável de ambiente
         data-ad-slot={process.env.REACT_APP_AD_SLOT} // Variável de ambiente
      ></ins>
   );
};
