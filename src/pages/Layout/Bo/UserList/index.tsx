import React, { useEffect, useState } from "react";
import {
  StopOutlined,
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { Input, Space, Table, Pagination, Tag, Drawer, Button } from "antd";
import { Form, Row, Col, Select, Skeleton, Card, Statistic, Flex } from "antd";
import type { GetProp, TableProps } from "antd";
import "./index.scss";

import useBoUserStore from "@/stores/bo/bo_userStore";

const { Option } = Select;

type SizeType = TableProps["size"];
type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;
type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition = NonNullable<
  TablePagination<any>["position"]
>[number];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

interface DataType {
  username: string;
  email: string;
  d2fa: string;
  active: string;
}

const UserList: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );
  const [openDetails, setOpenDetails] = useState(false);

  const boUserStore = useBoUserStore();
  const { userList, fetchUserList, fetchUserDetails, userDetails } =
    boUserStore;

  useEffect(() => {
    if (!userList || userList.length === 0) {
      fetchUserList();
    }
  }, [userList, fetchUserList]);

  useEffect(() => {
    setFilteredData(userList);
  }, [userList]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = userList.filter((item) => {
      return (
        (item.username &&
          item.username.toLowerCase().includes(value.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(value.toLowerCase()))
      );
    });
    setFilteredData(filteredData);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const showDrawer = async (email: string) => {
    await fetchUserDetails(email);
    setSelectedUserEmail(email);
    setOpenDetails(true);
  };

  const onClose = () => {
    setOpenDetails(false);
  };

  const selectedUser = selectedUserEmail
    ? userDetails[selectedUserEmail]
    : null;

  const columns: ColumnsType<DataType> = [
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) =>
        a.username && b.username ? a.username.localeCompare(b.username) : 0,
      render: (username, record) => (
        <a onClick={() => showDrawer(record.email)}>{username}</a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) =>
        a.email && b.email ? a.email.localeCompare(b.email) : 0,
    },
    {
      title: "2FA",
      dataIndex: "d2fa",
      width: 50,
      sorter: (a, b) => Number(a.d2fa) - Number(b.d2fa),
      render: (value) => (
        <Tag
          icon={value ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={value ? "success" : "error"}
        >
          {value ? "Enabled" : "Disabled"}
        </Tag>
      ),
    },
    {
      title: "Active",
      dataIndex: "active",
      width: 50,
      sorter: (a, b) => Number(a.active) - Number(b.active),
      render: (active) => (
        <Tag
          icon={active ? <CheckCircleOutlined /> : <StopOutlined />}
          color={active ? "success" : "error"}
        >
          {active ? "Active" : "Banned"}
        </Tag>
      ),
    },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    columnWidth: 50,
  };

  const scroll = {};

  const defaultTitle = () => (
    <Input.Search
      placeholder="Search..."
      value={searchText}
      onChange={(e) => handleSearch(e.target.value)}
      style={{ width: 250 }}
    />
  );

  const defaultFooter = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        textAlign: "right",
      }}
    >
      <Pagination
        current={currentPage}
        total={filteredData.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger
        showTotal={(total) => `Total ${total} items`}
        size="small"
      />
    </div>
  );

  const tableProps: TableProps<DataType> = {
    bordered: true,
    size: "small",
    title: defaultTitle,
    showHeader: true,
    footer: defaultFooter,
    rowSelection: rowSelection,
    scroll: scroll,
    tableLayout: undefined,
    columns: columns,
    dataSource: filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ),
    pagination: false,
    rowKey: (record) => record.email,
  };

  return (
    <div>
      <Table<DataType> {...tableProps} className="Table-container" />
      <Drawer
        key={selectedUserEmail} // 使用 key 强制更新 Drawer
        title={selectedUserEmail}
        width={"720px"}
        placement="right"
        closable={false}
        onClose={onClose}
        open={openDetails}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Save Change
            </Button>
          </Space>
        }
      >
        {selectedUser ? (
          <>
            <Flex vertical gap="middle">
              <Row gutter={16}>
                <Col span={12}>
                  <Card variant="borderless">
                    <Statistic
                      title="Account Balance (CNY)"
                      value={112893}
                      precision={2}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card variant="borderless">
                    <Statistic
                      title="Account Balance (CNY)"
                      value={112893}
                      precision={2}
                    />
                  </Card>
                </Col>
              </Row>
              <Card variant="borderless">
                <Form
                  layout="horizontal"
                  initialValues={{
                    username: selectedUser.username,
                    email: selectedUser.email,
                    active: selectedUser.active ? "1" : "0",
                    regDate: selectedUser.regDate,
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Username">
                        <Input value={selectedUser.username} disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Name">
                        <Input value={selectedUser.nickname} disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Email">
                        <Input value={selectedUser.email} disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Reg. Date">
                        <Input value={selectedUser.regDate} disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="2FA">
                        <Input
                          value={selectedUser.d2fa ? "Enable" : "Disable"}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="active" label="Active">
                        <Select value={selectedUser.active ? "1" : "0"}>
                          <Option value="1">Active</Option>
                          <Option value="0">Banned</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
              <Card variant="borderless"></Card>
            </Flex>
          </>
        ) : (
          <Skeleton active />
        )}
      </Drawer>
    </div>
  );
};

export default UserList;
