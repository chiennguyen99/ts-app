import React from "react";
import { Header } from "antd/lib/layout/layout";

const HeaderPage: React.FC = () => {
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#000000' }}>
    </Header>
  );
};

export default HeaderPage;
