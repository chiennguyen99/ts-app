import React from "react";
import { PageHeader, Dropdown, Menu, Space, Input } from "antd";
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

const Header: React.FC = () => {
  const { Search } = Input;
  return (
    <PageHeader
      className="site-page-header"
    >
      <div className="container" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src={'https://vnshop.vn/vnshop/logo_lite.jpg'} alt="logo" />
        <Space wrap>
          <Dropdown.Button overlay={menu}>
            Danh mục sản phẩm
          </Dropdown.Button>
        </Space>
        <Search
          placeholder="Nhập từ khóa cần tìm"
          allowClear
          size="large"
          style={{ width: 300 }}
          onSearch={() => {}}
        />
        <div>

        </div>
      </div>
    </PageHeader>
  );
};

export default Header;
