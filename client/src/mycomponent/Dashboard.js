import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Table, Select, DatePicker } from "antd";
import { AreaChartOutlined, DeleteOutlined, EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import AddEditTransaction from "./AddEditTransaction";
import DefaultLayout from "./DefaultLayout";
import Analatics from "./Analatics";
import Spinner from "./Spinner";
import "../Resources/transactions.css";
import moment from "moment";
const { RangePicker } = DatePicker;

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [type, setType] = useState('all');
  const [viewType, setViewType] = useState("table");
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("Hisabbook-user"));
      setLoading(true);
      const response = await axios.post('/api/transactions//get-all-transactions',
        {
          userid: user._id, frequency,
          ...(frequency === 'custom' && { selectedRange }),
          type
        });
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something Went Wrong');

    }
  };
  const deleteTransactions = async (record) => {
    try {
      setLoading(true);
      await axios.post('/api/transactions/delete-transaction',
        {
          transactionId: record._id
        });
      message.success("Transaction Deleted Successfully");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something Went Wrong');

    }
  };

  useEffect(() => {
    getTransactions()
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined onClick={() => {
              setSelectedItemForEdit(record);
              setShowAddEditTransactionModal(true);
            }} />
            <DeleteOutlined className="mx-4" onClick={() => {
              deleteTransactions(record)
            }} />
          </div>
        );
      },
    },
  ];
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-item-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <div className="mt-2">
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>ALL </Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expence'>Expense</Select.Option>
            </Select>

          </div>
        </div>

        <div className="d-flex">
          <div className="analysis">
            <div className="view-switch mx-4">
              <UnorderedListOutlined
                className={`mx-3 ${viewType === "table" ? "active-icon" : "inactive-icon"
                  } `}
                onClick={() => setViewType("table")}
              />
              <AreaChartOutlined
                className={`${viewType === "analytics" ? "active-icon" : "inactive-icon"
                  } `}
                onClick={() => setViewType("analytics")}
              />
            </div>
          </div>
          <div className="analbtn">
            <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}>ADD NEW</button>
          </div>
        </div>
      </div>
      <div className="table-analtics">
        {viewType === "table" ? <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div> : <Analatics transactions={transactionsData} />}
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Dashboard;