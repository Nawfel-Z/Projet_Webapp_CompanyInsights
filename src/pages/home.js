import React from 'react';
import { Layout, Breadcrumb, Divider, Input, Typography, Space } from 'antd';
import 'antd/dist/reset.css';

const { Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

function Home() {
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 10px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Divider />
                <div className="site-layout-content"></div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh', flexDirection: 'column' }}>
                    <Title level={1}>Toute l'information des entreprises</Title>
                    <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                        Gratuite, intelligente, complète
                    </Text>
                    <Space direction="vertical" size="large" style={{ marginTop: '20px' }}>
                        <Input.Search
                            placeholder="Entreprise, N° SIREN, Dirigeant, Mot-clé..."
                            enterButton="Rechercher"
                            size="large"
                            onSearch={(value) => console.log(value)}
                            style={{ width: '500px' }}
                        />
                        <Link href="/AdvancedSearch" style={{ textAlign: 'center', display: 'block' }}>
                            Recherche avancée
                        </Link>
                        
                    </Space>
                    <Text style={{ textAlign: 'center', marginTop: '20px', maxWidth: '600px' }}>
                        Collectez toutes les informations légales, juridiques et financières sur les entreprises de votre choix
                        (statuts, comptes sociaux, marques, dirigeants, actionnaires). Affinez votre analyse avec notre moteur
                        de recherche avancé.
                    </Text>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Company Insights ©2023</Footer>
        </Layout>
    );
}

export default Home;