import { useEffect, useState } from "react";
import { Row, Table, Input, Select, Button, Modal, Form, List, Col } from "antd";
import { Content } from "antd/lib/layout/layout";
import { getColors } from "../../../services/color";
import { getProducts } from "../../../services/product";
import { Color, ErrorProduct, ErrorProductsTable } from "../../../models/ErrorProduct";
import { Option } from "antd/lib/mentions";
import { convertFromIdToName } from "../../../helper/color";
import { compareTwoProducts, validateColorProduct, validateNameProduct, validateSKUProduct } from "../../../helper/product";

const ErrorProducts = () => {
  const [tableItems, setTableItems] = useState<ErrorProductsTable[] | undefined>();
  const [products, setProducts] = useState<ErrorProduct[] | undefined>();
  const [repairedProducts, setRepairedProducts] = useState<ErrorProduct[] | undefined>();
  const [initialValues, setInitValues] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colors, setColors] = useState<Color[] | undefined>();
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
    const colorList: Color[] = resColors.data;
    const replaceLink: ErrorProductsTable[] = [];
    let initialObject: any = {};
    resData.forEach(d => {
      initialObject[`name${d.id}`] = d.name;
      initialObject[`sku${d.id}`] = d.sku;
      let d1: ErrorProductsTable = {
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
        color: <Form.Item name={`color${d.id}`}>
          <Select
            key={`color${d.id}`}
            defaultValue={convertFromIdToName(d.color, colorList)}
            style={{ width: 150 }}
          >
            {colorList.map(c => (
              <Option value={c.id.toString()}>{c.name}</Option>
            ))}
          </Select>
        </Form.Item>
      };
      replaceLink.push(d1);
    });
    setInitValues(initialObject);
    setProducts(resData);
    setTableItems(replaceLink);
    setColors(colorList);
  }

  function handleFormSubmit(values: any) {
    setIsModalVisible(true);
    const repairProducts: ErrorProduct[] = [];
    products?.forEach(item => {
      const itemColor: number = Number(values[`color${item.id}`]);
      const itemSKU: string = values[`sku${item.id}`];
      const itemName: string = values[`name${item.id}`];
      const newItem = {...item};
      if (validateNameProduct(itemName) && itemName !== item.name) {
        newItem.name = itemName;
      }
      if (validateSKUProduct(itemSKU) && itemSKU !== item.sku) {
        newItem.sku = itemSKU;
      }
      if (validateColorProduct(itemColor)) {
        newItem.color = itemColor;
      }
      if (!compareTwoProducts(newItem, item)) {
        repairProducts.push(newItem);
      }
    });
    setRepairedProducts(repairProducts);
  }

  useEffect(() => {
    setData();
  }, []);

  return (
    <Content className="content" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ paddingTop: 24, minHeight: 380, backgroundColor: "#fff", alignItems: "center" }}>
        {tableItems !== undefined && tableItems.length > 0 ?
          <Form layout="inline"
            initialValues={initialValues}
            onFinish={(values) => handleFormSubmit(values)}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Row justify="center">
              <Table columns={columns} dataSource={tableItems} size="small" />
            </Row>
          </Form> : <></>}
        <Modal
          title="Re-uploaded Products"
          visible={isModalVisible}
          footer={null}
        >
          <div style={{ height: 300, overflowY: "scroll" }}>
            <List
              itemLayout="horizontal"
              dataSource={repairedProducts}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img alt="" src={item.image} style={{ width: 100, height: 100 }} />}
                    title={item.name}
                    description={<Col>
                      <Row><p style={{ marginRight: 10 }}>ID:</p><p style={{ color: "#000000" }}>{item.id}</p></Row>
                      <Row><p style={{ marginRight: 10 }}>SKU:</p><p style={{ color: "#FF0000" }}>{item.sku}</p></Row>
                      <Row>
                        <p style={{ marginRight: 10 }}>Color:</p>
                        <p style={{ color: "#000000" }}>{colors !== undefined ?
                          <>{convertFromIdToName(item.color, colors) !== undefined ? convertFromIdToName(item.color, colors) : "null"}</>
                          : "null"}
                        </p>
                      </Row>
                    </Col>}
                  />
                </List.Item>
              )}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 10 }}>
            <Button type="primary" onClick={() => { setIsModalVisible(false); }} style={{}}>OK</Button>
          </div>
        </Modal>
      </div>
    </Content>
  );
};

export default ErrorProducts;
