import React from 'react';
import { Layout, Breadcrumb, Card, Row, Col, Typography, Button, Table, Divider } from 'antd';
import { Chart } from "react-google-charts";

const { Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const Company = () => {
  const dataSource = [
    { key: '1', year: '2023', growth: '5%', revenue: '10M' },
    { key: '2', year: '2022', growth: '3%', revenue: '9M' },
    // Add more data as needed
  ];

  const columns = [
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Growth', dataIndex: 'growth', key: 'growth' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
  ];

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Company</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          
        

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Row justify="space-between">
                  <Col>
                    <Title level={2}>DASSAULT AVIATION</Title>
                    <Text>SIREN: 712 042 456 - Active</Text><br />
                    <Text>Adresse: MARCEL DASSAULT, 9 ROND-POINT DES CHAMPS ELYSEES-MARCEL DASSAULT, 75008 PARIS</Text><br />
                    <Text>Activité: Construction aéronautique et spatiale</Text><br />
                    <Text>Effectif: Entre 500 et 999 salariés (année 2021)</Text><br />
                    <Text>Création: 01/01/1971</Text><br />
                    <Text>Dirigeants: Boumara Besma, Dassault Thierry, etc.</Text>
                  </Col>
                  <Col>
                    <Button type="primary" style={{ marginBottom: '10px' }} block>Suivre cette entreprise</Button>
                    <Button block style={{ marginBottom: '10px' }}>Voir les statuts</Button>
                    <Button block style={{ marginBottom: '10px' }}>Voir les comptes</Button>
                    <Button block>Solvabilité</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
            
            <Col span={12}>
              <Card title="Informations juridiques de DASSAULT AVIATION">
                <Text>SIREN: 712042456</Text><br />
                <Text>SIRET (siège): 71204245600111</Text><br />
                <Text>Forme juridique: SA à conseil d'administration (s.a.i)</Text><br />
                <Text>Numéro de TVA: FR73712042456</Text><br />
                <Text>Inscription au RCS: RCS de Paris</Text><br />
                <Text>Numéro RCS: 712 042 456 RCS Paris</Text><br />
                <Button type="default">Avis de situation SIRENE</Button>
              </Card>
            </Col>
            
            <Col span={12}>
              <Card title="Activité de DASSAULT AVIATION">
                <Text>Activité principale: Constructions aéronautiques</Text><br />
                <Text>Code NAF: 30.30Z</Text><br />
                <Text>Convention collective nationale IDCC 650</Text>
              </Card>
            </Col>
            
        <Col span={24}>
            <Card title="Finances de DASSAULT AVIATION">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
            </Card>
            <Chart
                chartType="ScatterChart"
                data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                width="100%"
                height="400px"
                legendToggle
            />
        </Col>
            
            <Col span={12}>
              <Card title="Dirigeants et représentants de DASSAULT AVIATION">
                <Text>Boumara Besma</Text><br />
                <Text>Thierry Dassault</Text><br />
                <Button type="default">Dirigeants et représentants (241)</Button>
              </Card>
            </Col>
            
            <Col span={12}>
              <Card title="Documents juridiques de DASSAULT AVIATION">
                <Text>Document récent:</Text><br />
                <Link href="#">Extrait de procès-verbal</Link> - 10/04/2024<br />
                <Link href="#">Statuts mis à jour</Link> - 19/03/2024<br />
                <Button type="default">Rechercher dans les documents</Button>
              </Card>
            </Col>
            
            <Col span={12}>
              <Card title="Comptes annuels de DASSAULT AVIATION">
                <Link href="#">Comptes sociaux 2023</Link> - 06/06/2024<br />
                <Link href="#">Comptes sociaux 2022</Link> - 16/05/2023<br />
                <Link href="#">Comptes sociaux 2021</Link> - 14/06/2022<br />
              </Card>
            </Col>

            {/* Additional cards for other sections */}
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Company Insight ©2024</Footer>
    </Layout>
  );
};

export default Company;
