import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Typography, Button, Divider } from 'antd';
import { useLocation } from 'react-router-dom';

const { Content, Footer } = Layout;
const { Text, Title } = Typography;

const CompanyDetail = () => {
  const [company, setCompany] = useState(null);
  const [siren, setSiren] = useState('');


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const EntrepriseNumber = queryParams.get('searchItem');

  console.log("get item",EntrepriseNumber);

  const searchType = queryParams.get('searchType');
  const searchValue = queryParams.get('searchValue');

  console.log("search type",searchType);
  console.log("searchValue",searchValue);



  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchType === "companyNumber") {
          response = await fetch(`http://localhost:3000/data/siren/${searchValue}`);
        } else if (searchType === "companyName") {
          response = await fetch(`http://localhost:3000/data/name/${searchValue}`);
        }
        else{
          response = await fetch(`http://localhost:3000/data/siren/${EntrepriseNumber}`);
        }
        const data = await response.json();
        setCompany(data);        
        console.log("company", data);
      } catch (error) {
        console.error('Error fetching company data:', error);
        console.log(error.messag);
      }
    };

    fetchData();
  }, [searchValue, searchType]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Row justify="space-between">
                {
  company && (
    <Col>
      <Title level={2}>{company.Denomination}</Title>
      <Text>SIREN: {company.EnterpriseNumber} - {company.Status}</Text><br />
      <Text>Adresse: {company.StreetFR}, {company.Zipcode} {company.MunicipalityFR}</Text><br />
      <Text>Activité: {company.ActivityGroup}</Text><br />
      <Text>Type de l'entreprise: {company.TypeOfEnterprise}</Text><br />
      <Text>Création: {company.StartDate}</Text><br />
      <Text>Situation Juridical: {company.JuridicalSituation}</Text>
    </Col>
  )
}
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