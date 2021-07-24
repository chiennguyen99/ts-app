import { useEffect, useState } from "react";
import { Row, Table, Input, Select, Button, Col, Form } from "antd";
import { Content } from "antd/lib/layout/layout";
import { getColors, getProducts } from "../../../services/ErrorProducts";
import { Color, ErrorProduct, ErrorProductInTable } from "../../../models/ErrorProduct";
import { Option } from "antd/lib/mentions";
import { convertFromIdToName } from "../../../helper/color";

const ErrorProducts = () => {
  const [items, setItems] = useState<ErrorProductInTable[] | undefined>();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Error Description',
      dataIndex: 'errorDescription',
    },
    {
      title: 'Product Image',
      dataIndex: 'image',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
  ];

  async function setData() {
    const resProducts = await getProducts();
    const resColors = await getColors();
    const resData: ErrorProduct[] = resProducts.data;
    const colors: Color[] = resColors.data;
    const replaceLink: ErrorProductInTable[] = [];
    resData.forEach(d => {
      let d1: ErrorProductInTable = {
        id: d.id,
        name: <Form.Item name={`name${d.id}`} rules={[{ required: true, message: 'Không để trống!' }, { max: 50, message: 'Không quá 50 kí tự!' }]}>
          <Input defaultValue={d.name} style={{ width: 250 }} />
        </Form.Item>,
        errorDescription: d.errorDescription,
        image: d.image !== "" ? <img alt="" src={d.image} style={{ width: 100, height: 100 }} />
          : <div style={{ width: 100, height: 100 }}></div>,
        sku: <Form.Item name={`sku${d.id}`} rules={[{ required: true, message: 'Không để trống!' }, { max: 20, message: 'Không quá 20 kí tự!' }]}>
          <Input defaultValue={d.sku} style={{ width: 100 }} />
        </Form.Item>,
        color: <Form.Item>
          {d.color !== null && convertFromIdToName(d.color, colors) !== undefined ?
            <Select
              key={`Select ${d.id}`}
              defaultValue={convertFromIdToName(d.color, colors)}
              style={{ width: 150 }}
            >
              {colors.map(c => (
                <Option value={c.name}>{c.name}</Option>
              ))}
            </Select> :
            <Select
              placeholder="Select value"
              style={{ width: 150 }}
            >
              {colors.map(c => (
                <Option value={c.name}>{c.name}</Option>
              ))}
            </Select>
          }
        </Form.Item>
      };
      replaceLink.push(d1);
    });
    setItems(replaceLink);
  }

  useEffect(() => {
    setData();
  }, []);

  return (
    <Content className="content" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ paddingTop: 24, minHeight: 380, backgroundColor: "#fff", alignItems: "center" }}>
        <Form>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => { }}>
              Submit
            </Button>
          </Form.Item>
          <Row justify="center">
            <Table columns={columns} dataSource={items} size="small" />
          </Row>
        </Form>
      </div>
    </Content>
  );
};

export default ErrorProducts;
