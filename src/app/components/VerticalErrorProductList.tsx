import React from "react";
import { Row, List, Col } from "antd";
import { ErrorProduct } from "../../models/ErrorProduct";
import { Color } from "../../models/Color";
import { convertFromIdToName } from "../../helper/color";

interface Props {
  dataSource: ErrorProduct[] | undefined;
  colors: Color[] | undefined;
}

const VerticalProductList: React.FC<Props> = ({ dataSource, colors }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={item.image !== "" ? <img alt="" src={item.image} style={{ width: 100, height: 100 }} />
              : <div style={{ width: 100, height: 100 }}></div>}
            title={item.name}
            description={<Col>
              <Row><p style={{ marginRight: 10 }}>ID:</p><p style={{ color: "#000000" }}>{item.id}</p></Row>
              <Row><p style={{ marginRight: 10 }}>SKU:</p><p style={{ color: "#FF0000" }}>{item.sku}</p></Row>
              <Row>
                <p style={{ marginRight: 10 }}>Color:</p>
                <p style={{ color: "#000000" }}>{colors !== undefined ?
                  <>{convertFromIdToName(item.color, colors) !== undefined ? convertFromIdToName(item.color, colors) : "Không"}</>
                  : "null"}
                </p>
              </Row>
            </Col>}
          />
        </List.Item>
      )}
    />
  );
};

export default VerticalProductList;
