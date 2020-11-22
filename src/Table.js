import { Table } from "antd";
import "./Table.css";

const columns = [
  {
    title: "מדינה",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "מתאריך",
    dataIndex: "fromDate",
    key: "fromDate",
  },
  {
    title: "עד תאריך",
    dataIndex: "toDate",
    key: "toDate",
  },
  {
    title: "הערות",
    dataIndex: "notes",
    key: "notes",
  },
];

const TableData = () => {
  let data1;
  let data2;
  let data3;
  if (localStorage.getItem("Travels") != null) {
    data1 = localStorage.getItem("Travels").substring(1);
    data2 = data1.split("|");
    data3 = data2.map((Travel) => JSON.parse(Travel));
  }

  return <Table columns={columns} dataSource={data3} />;
};

export default TableData;
