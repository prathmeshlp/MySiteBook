import React from 'react';

interface BrandingProps {
  logoUrl: string;
}

const Branding: React.FC<BrandingProps> = ({ logoUrl }) => {
  return (
    <section
      className="left-section sm:block hidden w-1/2 h-full bg-warningYellow bg-bg-mySiteBookLogoLarge bg-[length:284px]
    bg-[center_right_2rem] bg-no-repeat"
    >
      <div className="content h-full flex-column-center gap-8">
        <h1 className="text-center font-bold text-4xl">
          No. #1 App for Managing <br /> Bungalow & Interior Projects
        </h1>
        <img
          src={logoUrl}
          alt="mySiteBookLogo"
          className="max-w-full cursor-pointer bg-white p-4 rounded-lg"
        />
        <h2 className="font-bold text-2xl">Manage your Projects Digitally</h2>
        <div className="description flex-column-center">
          <span className="font-semibold">For</span>
          <span className="text-lg font-medium text-center">
            Interior Designers | Architects | Bungalow & Renovation Contractors
          </span>
        </div>
      </div>
    </section>
  );
};

export default Branding;
