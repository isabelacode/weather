import { useEffect } from 'react';

export const AdBanner = () => {
   useEffect(() => {
      try {
         const script = document.createElement('script');
         script.async = true;
         script.src =
            'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

         document.head.appendChild(script);

         // Criando o elemento <ins> do anúncio com as variáveis de ambiente
         (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
         console.error('Falha ao carregar o anúncio:', e);
      }
   }, []);

   return (
      <ins
         className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-format="fluid"
         data-ad-layout-key="-fb+5w+4e-db+86"
         data-ad-client={process.env.REACT_APP_AD_CLIENT} // Usando a variável de ambiente
         data-ad-slot={process.env.REACT_APP_AD_SLOT} // Usando a variável de ambiente
      ></ins>
   );
};
