import React from 'react';

import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';

const LayoutContainer = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </>
  );
};

export default LayoutContainer;
