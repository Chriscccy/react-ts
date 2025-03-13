import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Drawer,
  Form,
  Tag,
  Pagination,
  Space,
  message,
  Select,
  Modal,
} from "antd";
import type { GetProp, TableProps } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import useBoCarouselStore from "@/stores/bo/bo_carouselStore";
import "./index.scss";

type SizeType = TableProps["size"];
type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

interface CarouselDetailsType {
  id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  is_active: number;
}

interface AddCarouselType {
  image_url: string;
  is_active: number;
}

interface BulkDeleteCarouselType {
  delete: {
    id: number;
  }[];
}

type DrawerMode = "edit" | "add" | "bulk" | null;

const CarouselManagement: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCarousel, setSelectedCarousel] =
    useState<CarouselDetailsType | null>(null);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);

  // 分别为编辑、添加和批量操作创建不同的 Form 实例
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [bulkForm] = Form.useForm();

  const [selectedRows, setSelectedRows] = useState<CarouselDetailsType[]>([]);

  const [filteredData, setFilteredData] = useState<CarouselDetailsType[]>([]);

  const {
    carouselImagesListDetails,
    fetchCarouselImagesDetails,
    addCarouselImage,
    updateCarouselImage,
    deleteCarouselImage,
    bulkUpdateCarousel,
    bulkDeleteCarousel,
  } = useBoCarouselStore();

  useEffect(() => {
    if (!carouselImagesListDetails || carouselImagesListDetails.length === 0) {
      fetchCarouselImagesDetails();
    }
  }, [carouselImagesListDetails, fetchCarouselImagesDetails]);

  useEffect(() => {
    setFilteredData(carouselImagesListDetails);
  }, [carouselImagesListDetails]);

  useEffect(() => {
    if (drawerMode === "bulk") {
      const initialValues = {
        is_active: null,
      };
      bulkForm.setFieldsValue(initialValues);
    }
  }, [bulkForm, drawerMode]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = carouselImagesListDetails.filter((item) =>
      item.image_url.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  // 编辑时：设置选中行，填充表单，并设置模式为 "edit"
  const handleEditCarousel = (record: CarouselDetailsType) => {
    setSelectedCarousel(record);
    editForm.setFieldsValue({
      image_url: record.image_url,
      is_active: record.is_active,
      id: record.id,
    });
    setDrawerMode("edit");
  };

  // 添加时：重置添加表单并将模式设置为 "add"
  const handleAddCarousel = () => {
    addForm.resetFields();
    setDrawerMode("add");
  };

  // 批量操作
  const handleBulkAction = () => {
    bulkForm.resetFields();
    setDrawerMode("bulk");
  };

  // 处理删除的函数，包含确认逻辑
  const handleDeleteCarousel = async (record: CarouselDetailsType) => {
    Modal.confirm({
      title: "Confrimation",
      content: `Confirm to delete carousel (ID-${record.id}) (URL-${record.image_url}) ?`,
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteCarouselImage({ id: record.id });
          message.success("Delete success");
        } catch (error) {
          message.error("Delete unsuccess");
        }
      },
    });
  };

  // 保存编辑：校验、更新，然后关闭 Drawer 并刷新数据
  const handleSaveEditCarousel = async () => {
    try {
      const values = await editForm.validateFields();
      if (selectedCarousel) {
        await updateCarouselImage({
          id: selectedCarousel.id,
          ...values,
        });
        message.success("更新成功");
      }
      setDrawerMode(null);
    } catch (error) {
      message.error("操作失败");
    }
  };

  // 确认并添加 Carousel
  const handleSaveAddCarousel = async () => {
    try {
      const values = await addForm.validateFields();
      const status = values.is_active === 1 ? "Active" : "Inactive";

      Modal.confirm({
        title: "Confrimation",
        content: `Confrim the image url to add ? ( URL: ${values.image_url} ) - ${status}`,
        okText: "Confrim",
        cancelText: "Cancel",
        onOk: async () => {
          try {
            const success = await addCarouselImage(values);
            if (success) {
              message.success("Add carousel success");
            } else {
              message.error("Add carousel unsuccess");
            }
          } catch (error) {
            message.error("Add carousel unsuccess");
          }
        },
      });

      setDrawerMode(null);
    } catch (error) {
      message.error("Add carousel unsuccess");
    }
  };

  const handleSaveBulkAction = async () => {
    try {
      const values = await bulkForm.validateFields();
      const updates = selectedRows.map((row) => ({
        id: row.id,
        is_active: values.is_active,
      }));

      const success = await bulkUpdateCarousel({ updates });

      if (success) {
        message.success("批量操作成功");
        setSelectedRows([]);
        setDrawerMode(null);
      } else {
        message.error("批量操作失败");
      }
    } catch (error) {
      message.error("批量操作失败");
    }
  };

  const handleSaveBulkDelete = async () => {
    Modal.confirm({
      title: "Confrimation",
      content: `Confrim delete selected carousel ?`,
      okText: "Confrim",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const ids = selectedRows.map((row) => row.id);
          const formData: BulkDeleteCarouselType = {
            delete: ids.map((id) => ({ id })),
          };

          const success = await bulkDeleteCarousel(formData);

          if (success) {
            message.success("Bulk delete success");
            setSelectedRows([]); // 清空选中的行
            setDrawerMode(null);
          } else {
            message.error("Bulk delete unsuccess");
          }
        } catch (error) {
          message.error("Bulk delete unsuccess");
        }
      },
    });
  };

  const rowSelection: TableRowSelection<CarouselDetailsType> = {
    selectedRowKeys: selectedRows.map((row) => row.id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  const columns: ColumnsType<CarouselDetailsType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Picture URL",
      dataIndex: "image_url",
      key: "image_url",
      ellipsis: true,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: <RetweetOutlined />,
      dataIndex: "is_active",
      key: "is_active",
      width: 45,
      render: (isActive: boolean | number) => (
        <Tag
          icon={isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={isActive ? "success" : "error"}
        ></Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 72,
      render: (_: any, record: CarouselDetailsType) => (
        <Space>
          <Button
            type="default"
            onClick={() => handleEditCarousel(record)}
            size="small"
            shape="circle"
            icon={<EditOutlined />}
          />
          <Button
            type="default"
            danger
            onClick={() => handleDeleteCarousel(record)}
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const tableTitle = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Input.Search
        placeholder="Image URL"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 300 }}
      />
      <Space>
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={handleBulkAction}
        >
          Bulk Edit
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCarousel}
        >
          Add Carousel
        </Button>
      </Space>
    </div>
  );

  const tableFooter = () => (
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

  const tableProps: TableProps<CarouselDetailsType> = {
    bordered: true,
    size: "small",
    title: tableTitle,
    showHeader: true,
    footer: tableFooter,
    rowSelection: rowSelection,

    columns: columns,
    dataSource: filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ),
    pagination: false,
    rowKey: (record) => record.id,
  };

  return (
    <div>
      <Table<CarouselDetailsType> {...tableProps} />

      <Drawer
        title={
          drawerMode === "edit"
            ? `Edit Carousel (ID: ${selectedCarousel?.id})`
            : drawerMode === "add"
            ? "Add Carousel"
            : drawerMode === "bulk"
            ? "Bulk Edit"
            : ""
        }
        width={720}
        open={!!drawerMode}
        onClose={() => setDrawerMode(null)}
        extra={
          <Space>
            <Button onClick={() => setDrawerMode(null)}>Cancel</Button>
            {drawerMode === "edit" && (
              <Button type="primary" onClick={handleSaveEditCarousel}>
                Save
              </Button>
            )}
            {drawerMode === "add" && (
              <Button type="primary" onClick={handleSaveAddCarousel}>
                Save
              </Button>
            )}
            {drawerMode === "bulk" && (
              <>
                <Button type="primary" onClick={handleSaveBulkAction}>
                  Bulk Change
                </Button>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={handleSaveBulkDelete}
                >
                  Bulk Delete
                </Button>
              </>
            )}
          </Space>
        }
      >
        {drawerMode === "edit" && (
          <Form form={editForm} layout="vertical">
            <Form.Item
              name="image_url"
              label="Image URL"
              rules={[{ required: true, message: "Please input Image URL" }]}
            >
              <Input placeholder="Image URL" />
            </Form.Item>
            <Form.Item
              name="is_active"
              label="Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select>
                <Select.Option value={1}>Active</Select.Option>
                <Select.Option value={0}>Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        )}
        {drawerMode === "add" && (
          <Form form={addForm} layout="vertical">
            <Form.Item
              name="image_url"
              label="Image URL"
              rules={[{ required: true, message: "Please input Image URL" }]}
            >
              <Input placeholder="Image URL" />
            </Form.Item>
            <Form.Item
              name="is_active"
              label="Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select>
                <Select.Option value={1}>Active</Select.Option>
                <Select.Option value={0}>Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        )}
        {drawerMode === "bulk" && (
          <Form form={bulkForm} layout="vertical">
            <Form.Item label="Selected Carousel">
              {selectedRows.map((row) => (
                <Tag key={row.id}>
                  ID: {row.id}, URL: {row.image_url}
                </Tag>
              ))}
            </Form.Item>
            <Form.Item
              name="is_active"
              label="Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select>
                <Select.Option value={1}>Active</Select.Option>
                <Select.Option value={0}>Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default CarouselManagement;
