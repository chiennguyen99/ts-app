import React, { useState } from "react";
import { Pagination, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import ListOfProducts from "../../components/ProductList/ProductList";
import { Product } from "../../../models/Product";

const ProductScreen: React.FC = () => {
  const [page, setPage] = useState(1);
  const items: Product[] = [
    {
      image: "https://lh3.googleusercontent.com/5NWBMUjAx99i-PGcSSqFOiqzPD7thKZFN3hBQ0n0XcJ56pofM1EEazVUGAyniKjM3OUMSotZaavy9FeGquolxCEXX4oGrww_9g=w500-rw",
      price: 1,
      cost: 2,
      title: "Nước Giặt Quần Áo Em Bé D-nee Xanh 3L"
    },
    {
      image: "https://lh3.googleusercontent.com/5NWBMUjAx99i-PGcSSqFOiqzPD7thKZFN3hBQ0n0XcJ56pofM1EEazVUGAyniKjM3OUMSotZaavy9FeGquolxCEXX4oGrww_9g=w500-rw",
      price: 1,
      cost: 2,
      title: "Nước Giặt Quần Áo Em Bé D-nee Xanh 3L"
    },
    {
      image: "https://lh3.googleusercontent.com/5NWBMUjAx99i-PGcSSqFOiqzPD7thKZFN3hBQ0n0XcJ56pofM1EEazVUGAyniKjM3OUMSotZaavy9FeGquolxCEXX4oGrww_9g=w500-rw",
      price: 1,
      cost: 2,
      title: "Nước Giặt Quần Áo Em Bé D-nee Xanh 3L"
    },
    {
      image: "https://lh3.googleusercontent.com/5NWBMUjAx99i-PGcSSqFOiqzPD7thKZFN3hBQ0n0XcJ56pofM1EEazVUGAyniKjM3OUMSotZaavy9FeGquolxCEXX4oGrww_9g=w500-rw",
      price: 1,
      cost: 2,
      title: "Nước Giặt Quần Áo Em Bé D-nee Xanh 3L"
    }
  ];
  function onChange(newPage: number) {
    setPage(newPage);
  }
  return (
    <Content className="content" style={{ padding: '0 50px', marginTop: 64}}>
      <div className="site-layout-background" style={{ paddingTop: 24, minHeight: 380, backgroundColor: "#fff", alignItems: "center" }}>
        <Row justify="center">
          <ListOfProducts element={{ items: items }}/>
        </Row>
        <Row justify="center">
          <Pagination current={page} onChange={(p) => onChange(p)} total={50} />
        </Row>
      </div>
    </Content>
  );
};

export default ProductScreen;
