import React, { useState } from "react";
import { Pagination, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import ListOfProducts from "../../components/ListOfProducts/ListOfProducts";
import { Product } from "../../../models/Product";

const ProductScreen: React.FC = () => {
  const [page, setPage] = useState(1);
  const items: Product[] = [
    {
      image: "",
      price: 1,
      cost: 2,
      title: ""
    },
    {
      image: "",
      price: 1,
      cost: 2,
      title: ""
    },
    {
      image: "",
      price: 1,
      cost: 2,
      title: ""
    },
    {
      image: "",
      price: 1,
      cost: 2,
      title: ""
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
