import React from "react";
import { Row, Col } from "antd";
import { Product } from "../../../models/Product";
import "./styles.scss";

interface Props {
  element: {
    items: Product[]
  };
}

const ListOfProducts: React.FC<Props> = ({ element }) => {
  const { items } = element;
  const rows = [];
  const rowNumber: number = Math.floor(items.length / 5);
  for (let r = 0; r < rowNumber; r++) {
    let cols = [];
    for (let c = 0; c < 5; c++) {
      cols.push(
        <Col key={r.toString() + c.toString()} span={24 / 5} className="item-container">
          <div>Column</div>
        </Col>
      );
    }
    rows.push(<Row gutter={[16, 16]}>{cols}</Row>);
  }
  if (items.length % 5 !== 0) {
    let cols = [];
    for (let c = 0; c < 5; c++) {
      if (c < items.length % 5) {
        cols.push(
          <Col key={rowNumber.toString() + c.toString()} span={24 / 5} className="item-container">
            <div>Column</div>
          </Col>
        );
      } else {
        cols.push(
          <Col key={rowNumber.toString() + c.toString()} span={24 / 5} className="item-container" />
        );
      }
    }
    rows.push(<Row gutter={[16, 16]}>{cols}</Row>);
  }
  return (
   <>{rows.map(r => r)}</>
  );
};

export default ListOfProducts;