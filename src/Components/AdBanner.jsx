import { useEffect } from 'react';

export const AdBanner = () => {
   useEffect(() => {
      try {
         const adsElement = document.querySelector('.adsbygoogle');
         if (!adsElement.hasAttribute('data-ad-client')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
         }
      } catch (err) {
         console.error(err.message);
      }
   }, []);

   return (
      <>
         <ins
            className="adsbygoogle"
            style={{ display: 'block', height: '90px' }}
            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
            data-ad-client="ca-pub-3869842878920222"
            data-ad-slot="6802667364"
         ></ins>
      </>
   );
};
