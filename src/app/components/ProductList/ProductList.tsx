import React from "react";
import { Row, Col, Card } from "antd";
import { Product } from "../../../models/Product";
import "./styles.scss";

interface Props {
  element: {
    items: Product[]
  };
}

const Item: React.FC<Product> = ({ image, price, cost, title }) => {
  return (
    <Card
      hoverable
      cover={<img alt="example" src={image} />}
    >
      {title}
    </Card>
  );
};

const ListOfProducts: React.FC<Props> = ({ element }) => {
  const { items } = element;
  const rows = [];
  const rowNumber: number = Math.floor(items.length / 5);
  for (let r = 0; r < rowNumber; r++) {
    let cols = [];
    for (let c = 0; c < 5; c++) {
      let item = items[c + 5 * r];
      cols.push(
        <Col key={r.toString() + c.toString()} span={24 / 5} className="item-container">
          <Item {...item} />
        </Col>
      );
    }
    rows.push(<Row gutter={[16, 16]}>{cols}</Row>);
  }
  if (items.length % 5 !== 0) {
    let cols = [];
    for (let c = 0; c < 5; c++) {
      if (c < items.length % 5) {
        let item = items[c + 5 * rowNumber];
        cols.push(
          <Col key={rowNumber.toString() + c.toString()} span={24 / 5} className="item-container">
            <Item {...item} />
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
