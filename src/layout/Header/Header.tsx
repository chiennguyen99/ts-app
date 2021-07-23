import React from "react";
import { Dropdown, Menu, Input, Row, Col } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import "./styles.scss";

const menu = (
  <Menu>
    <Menu.Item key="1">
      1st menu item
    </Menu.Item>
    <Menu.Item key="2">
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3">
      3rd menu item
    </Menu.Item>
  </Menu>
);

const HeaderPage: React.FC = () => {
  const { Search } = Input;
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff' }}>
      <Content className="content">
        <img className="logo" src={'https://vnshop.vn/vnshop/logo_lite.jpg'} alt="logo" />
        <Row>
          <Col span={12}>
            <Row>
              <Col flex={2} style={{ alignItems: "center" }}>
                <Dropdown.Button overlay={menu} style={{ height: 30 }}>
                  Danh mục sản phẩm
                </Dropdown.Button>
              </Col>
              <Col flex={3} style={{ padding: 17 }}>
                <Search
                  placeholder="Nhập từ khóa cần tìm"
                  allowClear
                  style={{ width: 300, height: 30 }}
                  onSearch={() => { }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>col-8</Col>
              <Col span={8}>col-8</Col>
              <Col span={8}>col-8</Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Header>
  );
};

export default HeaderPage;
