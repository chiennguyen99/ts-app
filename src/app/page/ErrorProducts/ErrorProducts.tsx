import { useEffect, useState } from "react";
import { Table, Input, Select, Button, Modal, Form } from "antd";
import { getColors } from "../../../services/color";
import { getProducts } from "../../../services/product";
import { ErrorProduct, ErrorProductsTable } from "../../../models/errorProduct";
import { Color } from "../../../models/color";
import { Option } from "antd/lib/mentions";
import { convertFromIdToName } from "../../../helper/color";
import { compareTwoProducts, removeProduct, validateColorProduct, validateNameProduct, validateSKUProduct } from "../../../helper/product";
import VerticalProductList from "../../components/VerticalErrorProductList";

const ErrorProducts = () => {
  const [tableItems, setTableItems] = useState<ErrorProductsTable[]>();
  const [products, setProducts] = useState<ErrorProduct[]>();
  const [repairedProducts, setRepairedProducts] = useState<ErrorProduct[]>();
  const [initialValues, setInitValues] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colors, setColors] = useState<Color[]>();
  const [changedValues, setChangedValues] = useState<any>({});
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
        id: <Form.Item>{d.id}</Form.Item>,
        name: <Form.Item name={`name${d.id}`} rules={[{ required: true, message: 'Không để trống!' }, { max: 50, message: 'Không quá 50 kí tự!' }]}>
          <Input defaultValue={d.name} style={{ width: 250 }} />
        </Form.Item>,
        errorDescription: <Form.Item>{d.errorDescription}</Form.Item>,
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
            placeholder={'Select Value'}
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

  function handleFormSubmit() {
    setIsModalVisible(true);
    let repairProducts: ErrorProduct[] = [];
    if (repairedProducts !== undefined) {
      repairProducts.push(...repairedProducts);
    }
    const newProducts: ErrorProduct[] = [];
    products?.forEach(item => {
      const newItemColor: number = Number(changedValues[`color${item.id}`]);
      const newItemSKU: string = changedValues[`sku${item.id}`];
      const newItemName: string = changedValues[`name${item.id}`];
      const newItem = { ...item };
      if (validateNameProduct(newItemName) && newItemName !== item.name) {
        newItem.name = newItemName;
      }
      if (validateSKUProduct(newItemSKU) && newItemSKU !== item.sku) {
        newItem.sku = newItemSKU;
      }
      if (validateColorProduct(newItemColor)) {
        newItem.color = newItemColor;
      }
      if (!compareTwoProducts(newItem, item)) {
        repairProducts = removeProduct(newItem.id, repairProducts);
        repairProducts.push(newItem);
        newProducts.push(newItem);
      } else {
        newProducts.push(item);
      }
    });
    setProducts(newProducts);
    setRepairedProducts(repairProducts);
  }

  function onValuesChangeForm(cValues: any) {
    setChangedValues({ ...changedValues, ...cValues });
  }

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className="site-layout-background"
      style={{ paddingTop: 24, minHeight: 380, backgroundColor: "#fff", display: "flex", justifyContent: "center", marginTop: 64 }}>
      {tableItems !== undefined && tableItems.length > 0 ?
        <Form layout="vertical"
          initialValues={initialValues}
          onFinish={() => handleFormSubmit()}
          onValuesChange={(cValues) => onValuesChangeForm(cValues)}
          scrollToFirstError
        >
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right", marginBottom: 10 }}>
              Submit
            </Button>
          </Form.Item>
          <Table columns={columns} dataSource={tableItems} size="small" bordered />
        </Form> : <></>}
      <Modal
        title="Re-uploaded Products"
        visible={isModalVisible}
        cancelButtonProps={{ style: { display: "none" } }}
        onOk={() => { setIsModalVisible(false); }}
        onCancel={() => { setIsModalVisible(false); }}
        closable={false}
      >
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          <VerticalProductList colors={colors} dataSource={repairedProducts} />
        </div>
      </Modal>
    </div>
  );
};

export default ErrorProducts;
