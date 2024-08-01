import React, { useState, useEffect } from 'react';
import { Layout, Input, Typography, Space, Spin, List } from 'antd';
import Papa from 'papaparse';
import 'antd/dist/reset.css';

const { Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

function Home() {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Load and parse the CSV file
        Papa.parse('/data/mockdata.csv', {
            download: true,
            header: true,
            complete: (result) => {
                setData(result.data);
            },
        });
    }, []);

    const handleSearch = (value) => {
    setSearchValue(value);
    setLoading(true);

    setTimeout(() => {
        const filteredResults = data.filter(item =>
            (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
            (item.siren && item.siren.includes(value))
        );
        setResults(filteredResults);
        setLoading(false);
    }, 2000); // Simulate a 2-second search operation
};

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 10px' }}>
                <div className="site-layout-content"></div>
                <div style={{ ...styles.container, width: '100%' }}>
                    <Title level={1}>Toute l'information des entreprises</Title>
                    <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                        Gratuite, intelligente, complète
                    </Text>
                    <Space direction="vertical" size="large" style={{ marginTop: '20px' }}>
                        <Input.Search
                            placeholder="Entreprise, N° SIREN"
                            enterButton="Rechercher"
                            size="large"
                            onSearch={handleSearch}
                            style={styles.searchInput}
                        />
                        {loading && <Spin size="large" />}
                        <List
                            itemLayout="horizontal"
                            dataSource={results}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={`SIREN: ${item.siren}`}
                                    />
                                </List.Item>
                            )}
                        />
                        <Link href="/AdvancedSearch" style={{ textAlign: 'center', display: 'block' }}>
                            Recherche avancée
                        </Link>
                    </Space>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Footer content here</Footer>
        </Layout>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    },
    searchInput: {
        width: '100%',
    },
};

export default Home;