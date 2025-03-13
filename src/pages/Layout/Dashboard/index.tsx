import React, { useEffect } from "react";
import { Card, Flex, Row, Col, Statistic, Carousel } from "antd";
import "./index.scss";
import useUserStore from "@/stores/userStore";
import useAuthStore from "@/stores/authStore";

const Dashboard: React.FC = () => {
  // 从 store 中获取轮播图数据和 fetch 方法

  const token = useAuthStore((state) => state.authState.token);
  const carouselImagesList = useUserStore((state) => state.carouselImagesList);
  const fetchCarouselImages = useUserStore(
    (state) => state.fetchCarouselImages
  );

  // 组件加载时获取轮播图数据

  useEffect(() => {
    if (
      token &&
      Array.isArray(carouselImagesList) &&
      carouselImagesList.length === 0
    ) {
      fetchCarouselImages();
    }
  }, [token, carouselImagesList, fetchCarouselImages]);

  return (
    <Flex vertical gap="middle">
      {/* 轮播图部分 */}
      <Carousel
        autoplay={{ dotDuration: true }}
        autoplaySpeed={5000}
        dotPosition={"bottom"}
        className="Carousel-Container"
      >
        {carouselImagesList.map((image, index) => (
          <div key={index} className="Carousel-Inner">
            <img
              src={image}
              alt={`carousel-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>

      {/* 其他内容 */}
      <Card variant="borderless">123</Card>
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
    </Flex>
  );
};

export default Dashboard;
