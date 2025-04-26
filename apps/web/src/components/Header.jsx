import LogoUDC from '../assets/logo-udc.png';
import avatar from '../assets/avatar.png';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 shadow-md  bg-gradient-to-r from-verdeudc-200 via-verdeudc-400 to-verdeudc-600 telefono:px-4 telefono:py-2 tablet:px-8 tablet:py-3 desktop:px-12 desktop:py-4">
      
      {/* Logo - Ajuste de tamaño responsivo */}
      <img
        src={LogoUDC}
        alt="Logo UCOL"
        className="w-52 object-contain telefono:w-40 tablet:w-48 desktop:w-52"
      />

      {/* Barra de búsqueda - Ajuste de ancho y padding */}
      <div className="flex items-center  bg-white/60 rounded-full px-4 py-2 w-5/12 telefono:w-4/12 telefono:px-3 telefono:py-1 tablet:w-5/12 tablet:px-4 tablet:py-2 desktop:w-6/12">
        <svg className='text-4xl text-black/70 telefono:text-3xl tablet:text-4xl'  xmlns="http://www.w3.org/2000/svg"  width="1em"  height="1em"  viewBox="0 0 24 24">
          <path fill="currentColor" d="M10 18a7.95 7.95 0 0 0 4.897-1.688l4.396 4.396l1.414-1.414l-4.396-4.396A7.95 7.95 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8s3.589 8 8 8m0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6s-6-2.691-6-6s2.691-6 6-6"/>
        </svg>
        <input type="text" placeholder="Buscar" className=" outline-none px-2 w-full text-sm text-black/80 placeholder-black/80 telefono:text-xs tablet:text-sm desktop:text-base"
        />
      </div>

      {/* Iconos y avatar - Ajuste de tamaño y espaciado */}
      <div className="flex items-center gap-4 telefono:gap-3 tablet:gap-4 desktop:gap-5">
        <svg className='text-4xl text-black/80 telefono:text-3xl tablet:text-4xl'  xmlns="http://www.w3.org/2000/svg"  width="1em"  height="1em"  viewBox="0 0 24 24">
          <path fill="currentColor" d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2"/>
          <path fill="currentColor" d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2"/>
        </svg>
        <svg className="text-4xl text-black/80 telefono:text-3xl tablet:text-4xl"  xmlns="http://www.w3.org/2000/svg"  width="1em"  height="1em"  viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22m7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A1 1 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a1 1 0 0 0-.293-.707z"/>
        </svg> 
        <img
          src={avatar}
          alt="Usuario"
          className="w-12 h-auto rounded-full object-cover border-2 border-black/80 telefono:w-10 tablet:w-12 desktop:w-14"
        />
      </div>
    </header>
  );
}

