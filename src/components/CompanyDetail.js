import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Typography, Button, Divider } from 'antd';

const { Content, Footer } = Layout;
const { Text, Title } = Typography;

const CompanyDetail = () => {
  const [company, setCompany] = useState(null);
  const [siren, setSiren] = useState('');

  useEffect(() => {
    fetch('/src/data/data.json')
      .then(response => response.json())
      .then(data => {
        const companyData = data["0200.065.765"]; // Replace with the appropriate key
        setCompany(companyData);
        setSiren("0200.065.765"); // Replace with the appropriate SIREN
      })
      .catch(error => console.error('Error fetching company data:', error));
  }, []);

  // if (!company) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Row justify="space-between">
                  <Col>
                    <Title level={2}>{company.name}</Title>
                    <Text>SIREN: {siren} - {company.status}</Text><br />
                    <Text>Adresse: {company.contact.address}, {company.contact.StreetFR}, {company.contact.Zipcode} {company.contact.MunicipalityFR}</Text><br />
                    <Text>Activité: {company.description}</Text><br />
                    <Text>Effectif: {company.TypeOfEnterprise}</Text><br />
                    <Text>Création: {company.start_date}</Text><br />
                    <Text>Dirigeants: {company.JuridicalSituation}</Text>
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
              <Card title={`Informations juridiques de ${company.name}`}>
                <Text>SIREN: {siren}</Text><br />
                <Text>SIRET (siège): {company.siret}</Text><br />
                <Text>Forme juridique: {company.JuridicalForm}</Text><br />
                <Text>Numéro de TVA: {company.vat_number}</Text><br />
                <Text>Inscription au RCS: {company.rcs_registration}</Text><br />
                <Text>Numéro RCS: {company.rcs_number}</Text><br />
                <Button type="default">Avis de situation SIRENE</Button>
              </Card>
            </Col>
            
            <Col span={12}>
              <Card title={`Activité de ${company.name}`}>
                <Text>Activité principale: {company.main_activity}</Text><br />
                <Text>Code NAF: {company.naf_code}</Text><br />
                <Text>Convention collective nationale {company.collective_agreement}</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Company Insights ©2023</Footer>
    </Layout>
  );
};

export default CompanyDetail;