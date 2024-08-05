import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Select, Input, Button, Row, Col, Card } from 'antd';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AdvancedSearch = () => {
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/company?searchValue=${searchValue}&searchType=${searchType}`);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  return (
    <Layout style={{ minHeight: '100vh', padding: '50px' }}>
      <Content>
        <Row justify="center">
          <Col span={12}>
            <Card>
              <Title level={2} style={{ textAlign: 'center' }}>Advanced Search</Title>
              <Input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Enter search value"
                style={{ width: '100%', marginBottom: '20px' }}
              />
              <Select
                style={{ width: '100%', marginBottom: '20px' }}
                placeholder="Select Search Type"
                onChange={(value) => setSearchType(value)}
              >
                <Option value="">Select Search Type</Option>
                <Option value="companyNumber">By Company Number</Option>
                <Option value="companyName">By Company Name</Option>
                <Option value="zipcode">By Zipcode</Option>
              </Select>
              
              <Button type="primary" block onClick={handleSearch}>
                Search
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdvancedSearch;