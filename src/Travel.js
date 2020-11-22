import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Form, Input, DatePicker, Button } from "antd";

import TableData from "./Table";

import "./Travel.css";

const Travel = () => {
  const [Countrys, setCounterys] = useState([]);
  const [FormData, setFormData] = useState();

  const { Option } = Select;

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCounterys(() => {
          const CountryList = res.data.map((country) => country.name);

          return CountryList;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onFinish = (values) => {
    const localData = localStorage.getItem("Travels");
    let key;
    let oldLocal;
    if (localData) {
      key = localData.length + 1;
      oldLocal = localData;
    } else {
      key = 1;
      oldLocal = "";
    }
    const data = {
      key: key,
      country: values.countrys,
      fromDate: values.fromDate._d.toLocaleDateString(),
      toDate: values.toDate._d.toLocaleDateString(),
      notes: values.notes,
    };
    localStorage.setItem("Travels", oldLocal + "|" + JSON.stringify(data));
    setFormData(values);
  };
  const dateFormat = "DD/MM/YYYY";
  return (
    <>
      <h1 className="header">ניהול טיולים</h1>
      <div className="rootDiv">
        <div className="form" style={{ width: "100px" }}>
          <Form name="form" onFinish={onFinish} autoComplete="off">
            <div className="Country">
              <Form.Item name="countrys">
                <Select
                  className="select_from"
                  size="large"
                  placeholder="מדינה"
                >
                  {Countrys.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form" key="1">
              <div className="dateField">
                <Form.Item name="fromDate">
                  <DatePicker format={dateFormat} placeholder="מתאריך" />
                </Form.Item>
              </div>
              <div className="dateField">
                <Form.Item name="toDate">
                  <DatePicker format={dateFormat} placeholder="עד תאריך" />
                </Form.Item>
              </div>
            </div>
            <div className="Notes">
              <Form.Item name="notes">
                <Input placeholder="הערות" />
              </Form.Item>
            </div>
            <div className="Form_btn">
              <Form.Item>
                <Button
                  style={{ width: "250px" }}
                  type="primary"
                  htmlType="submit"
                >
                  שלח
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="tblDiv">
          <TableData FormData={FormData} />
        </div>
      </div>
    </>
  );
};

export default Travel;
