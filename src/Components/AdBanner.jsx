import { useEffect, useRef } from 'react';

export const AdBanner = () => {
   const adRef = useRef(null);

   useEffect(() => {
      const loadAd = () => {
         if (adRef.current && !adRef.current.dataset.loaded) {
            try {
               (window.adsbygoogle = window.adsbygoogle || []).push({});
               adRef.current.dataset.loaded = 'true';
            } catch (e) {
               console.error('Erro ao carregar anúncio:', e);
            }
         }
      };

      if (window.adsbygoogle) {
         loadAd();
      } else {
         document.addEventListener('adsbygoogle:loaded', loadAd);
      }

      return () => {
         document.removeEventListener('adsbygoogle:loaded', loadAd);
      };
   }, []);

   return (
      <ins
         ref={adRef}
         className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-3869842878920222"
         data-ad-slot="1460893116"
         data-ad-format="fluid"
         data-ad-layout-key="-fb+5v+4k-d3+7b"
      ></ins>
   );
};
