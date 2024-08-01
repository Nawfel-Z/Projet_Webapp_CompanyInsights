import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import Papa from 'papaparse';
import mockDataCSV from '../data/mockdata.csv'; // Import the CSV file

const { Content, Footer } = Layout;
const { Text, Link } = Typography;

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    Papa.parse(mockDataCSV, {
      download: true,
      header: true,
      complete: (result) => {
        const companyData = result.data.find(item => item.id === id);
        setCompany(companyData);
      },
    });
  }, [id]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title={`Dirigeants et représentants de ${company.name}`}>
                <Text>{company.director}</Text><br />
                <Button type="default">Dirigeants et représentants</Button>
              </Card>
            </Col>
            
            <Col span={12}>
              <Card title={`Documents juridiques de ${company.name}`}>
                <Text>Document récent:</Text><br />
                <Link href="#">Extrait de procès-verbal</Link> - {company.juridical?.file || 'N/A'}<br />
                <Link href="#">Statuts mis à jour</Link> - {company.start_date}<br />
                <Button type="default">Rechercher dans les documents</Button>
              </Card>
            </Col>

            <Col span={12}>
              <Card title={`Informations de ${company.name}`}>
                <Text>Nom: {company.name}</Text><br />
                <Text>Description: {company.description || 'N/A'}</Text><br />
                <Text>Date de début: {company.start_date}</Text><br />
                <Text>Statut: {company.status}</Text><br />
                <Text>Situation Juridique: {company.JuridicalSituation}</Text><br />
                <Text>Type d'entreprise: {company.TypeOfEnterprise}</Text><br />
                <Text>Forme Juridique: {company.JuridicalForm}</Text><br />
                <Text>Activité: {company.activity || 'N/A'}</Text><br />
              </Card>
            </Col>

            <Col span={12}>
              <Card title={`Contact de ${company.name}`}>
                <Text>Adresse: {company.contact.address}</Text><br />
                <Text>Téléphone: {company.contact.phone}</Text><br />
                <Text>Email: {company.contact.email || 'N/A'}</Text><br />
                <Text>Type d'adresse: {company.contact.TypeOfAddress}</Text><br />
                <Text>Municipalité: {company.contact.MunicipalityFR}</Text><br />
                <Text>Dénomination: {company.contact.Denomination}</Text><br />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer content here</Footer>
    </Layout>
  );
};

export default CompanyDetail;