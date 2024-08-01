const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const basePath = path.join(__dirname, '..', 'files');
const entreprisePath = path.join(basePath, 'enterprise.csv');
const addressPath = path.join(basePath, 'address.csv');
const contactPath = path.join(basePath, 'contact.csv');
const denominationPath = path.join(basePath, 'denomination.csv');
const activityPath = path.join(basePath, 'activity.csv');
const branchPath = path.join(basePath, 'branch.csv');
const newPath = path.join(__dirname, '..', 'convertedData');
const outputPath = path.join(newPath, 'combined.csv');

const readCsv = (filePath, limit = 1000000) => {
    return new Promise((resolve, reject) => {
        const results = [];
        let count = 0;
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                if (count < limit) {
                    results.push(data);
                    count++;
                }
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const combineData = async () => {
    try {
        const entrepriseData = await readCsv(entreprisePath);
        const addressData = await readCsv(addressPath);
        const contactData = await readCsv(contactPath);
        const denominationData = await readCsv(denominationPath);
        const activityData = await readCsv(activityPath);
        const branchData = await readCsv(branchPath);

        const addressMap = new Map(addressData.map(item => [item.EntityNumber, item]));
        const denominationMap = new Map(denominationData.map(item => [item.EntityNumber, item]));
        const activityMap = new Map(activityData.map(item => [item.EntityNumber, item]));
        const branchMap = new Map(branchData.map(item => [item.EnterpriseNumber, item]));

        const emailMap = new Map();
        const telMap = new Map();

        contactData.forEach(item => {
            if (item.ContactType === 'EMAIL') {
                emailMap.set(item.EntityNumber, item.Value);
            } else if (item.ContactType === 'TEL') {
                telMap.set(item.EntityNumber, item.Value);
            }
        });

        // Combine data
        const combinedData = entrepriseData.map(item => {
            const entityNumber = item.EnterpriseNumber;

            return {
                ...item,
                ...addressMap.get(entityNumber),
                email: emailMap.get(entityNumber) || "",
                tel: telMap.get(entityNumber) || "",
                ...denominationMap.get(entityNumber),
                ...activityMap.get(entityNumber),
                ...branchMap.get(entityNumber),
            };
        });

        // Define the CSV writer
        const csvWriter = createCsvWriter({
            path: outputPath,
            header: [
                { id: 'EnterpriseNumber', title: 'EnterpriseNumber' },
                { id: 'Status', title: 'Status' },
                { id: 'JuridicalSituation', title: 'JuridicalSituation' },
                { id: 'TypeOfEnterprise', title: 'TypeOfEnterprise' },
                { id: 'JuridicalForm', title: 'JuridicalForm' },
                { id: 'JuridicalFormCAC', title: 'JuridicalFormCAC' },
                { id: 'StartDate', title: 'StartDate' },
                { id: 'TypeOfAddress', title: 'TypeOfAddress' },
                // { id: 'CountryNL', title: 'CountryNL' },
                { id: 'CountryFR', title: 'CountryFR' },
                { id: 'Zipcode', title: 'Zipcode' },
                // { id: 'MunicipalityNL', title: 'MunicipalityNL' },
                { id: 'MunicipalityFR', title: 'MunicipalityFR' },
                // { id: 'StreetNL', title: 'StreetNL' },
                { id: 'StreetFR', title: 'StreetFR' },
                { id: 'HouseNumber', title: 'HouseNumber' },
                { id: 'Box', title: 'Box' },
                { id: 'ExtraAddressInfo', title: 'ExtraAddressInfo' },
                // { id: 'DateStrikingOff', title: 'DateStrikingOff' },
                { id: 'email', title: 'Email' },
                { id: 'tel', title: 'Tel' },
                { id: 'TypeOfDenomination', title: 'TypeOfDenomination' },
                { id: 'Denomination', title: 'Denomination' },
                { id: 'ActivityGroup', title: 'ActivityGroup' },
                { id: 'NaceVersion', title: 'NaceVersion' },
                { id: 'NaceCode', title: 'NaceCode' },
                { id: 'Classification', title: 'Classification' },
                // { id: 'Id', title: 'Id' },
            ]
        });

        // Write combined data to a new CSV file
        await csvWriter.writeRecords(combinedData);
        console.log('CSV file written successfully.');
    } catch (error) {
        console.error('Error combining data:', error);
    }
};

// Run the main function
combineData()