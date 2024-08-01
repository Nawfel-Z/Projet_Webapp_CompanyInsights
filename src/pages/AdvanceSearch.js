import React, { useState } from 'react';
import { Layout, Row, Col, Card, Select, Input, Button } from 'antd';

const { Content, Footer } = Layout;
const { Option } = Select;

const AdvancedSearch = () => {
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    // Implement search logic here
    console.log(`Searching for ${searchValue} by ${searchType}`);
  };

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 0 auto' }}>
        <div className="site-layout-content">
          <Row gutter={[16, 16]}>
            <Col>
              <Card title="Advanced Search">
                <Select 
                  style={{ width: '100%', marginBottom: '16px' }} 
                  onChange={(value) => setSearchType(value)} 
                  placeholder="Select Search Type"
                >
                  <Option value="companyNumber">By Company Number</Option>
                  <Option value="companyName">By Company Name</Option>
                  <Option value="activity">By Activity</Option>
                  <Option value="address">By Address</Option>
                </Select>
                <Input 
                  type="text" 
                  value={searchValue} 
                  onChange={(e) => setSearchValue(e.target.value)} 
                  placeholder="Enter search value" 
                  style={{ marginBottom: '16px' }}
                />
                <Button type="primary" onClick={handleSearch} block>
                  Search
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Company Insights ©2023 Created by Your Company
      </Footer>
    </Layout>
  );
};

export default AdvancedSearch;