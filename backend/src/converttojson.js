// correct 
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// File paths
const combinedPath = path.join(__dirname, '..', 'convertedData', 'data.csv');
const activityPath = path.join(__dirname, '..', 'files', 'activity.csv');
const filteredCodePath = path.join(__dirname, '..', 'files', 'filtered_code.csv');
const outputPath = path.join(__dirname, '..', 'convertedData', 'data.json');

// Helper function to read CSV files with a row limit
const readCsvWithLimit = (filePath, limit) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                if (results.length < limit) {
                    results.push(data);
                }
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

// Main function to convert CSV to structured JSON
const convertToJSON = async () => {
    try {
        console.log('Starting CSV to JSON conversion...');

        console.log('Loading filtered codes...');
        const filteredCodeData = await readCsvWithLimit(filteredCodePath, 100000); // No limit needed here

        // Create a map for activity descriptions
        const activityMap = new Map();
        filteredCodeData.forEach(item => {
            if (item.Language === 'FR' && item.Code && item.Description) {
                activityMap.set(item.Code, item.Description);
            }
        });
        console.log('Filtered codes loaded.');

        console.log('Processing combined data...');
        const combinedData = await readCsvWithLimit(combinedPath, 1000); // Limit to 1000 rows
        const jsonData = {};

        combinedData.forEach(item => {
            const enterpriseNumber = item.EnterpriseNumber;

            if (!jsonData[enterpriseNumber]) {
                jsonData[enterpriseNumber] = {
                    name: item.Denomination || "",
                    description: item.Classification || "",
                    start_date: item.StartDate || "",
                    status: item.Status || "",
                    JuridicalSituation: item.JuridicalSituation || "",
                    TypeOfEnterprise: item.TypeOfEnterprise || "",
                    JuridicalForm: item.JuridicalForm || "",
                    activity: {},
                    contact: {
                        address: item.StreetFR ? `${item.StreetFR} ${item.HouseNumber || ''} ${item.Zipcode || ''} ${item.MunicipalityFR || ''}` : "",
                        phone: item.Tel || '',
                        email: item.Email || '',
                        TypeOfAddress: item.TypeOfAddress || '',
                        MunicipalityFR: item.MunicipalityFR || '',
                        Denomination: item.Denomination || ''
                    }
                };
            }
        });
        console.log('Combined data processed.');

        console.log('Adding activity data...');
        const activityData = await readCsvWithLimit(activityPath, 100000); // No limit needed here
        activityData.forEach(item => {
            const enterpriseNumber = item.EntityNumber;
            if (jsonData[enterpriseNumber]) {
                const activityCode = item.NaceCode;
                // Use description from activityMap or fallback to code if not found
                const activityDescription = activityMap.get(activityCode) || activityCode;
                jsonData[enterpriseNumber].activity[activityCode] = activityDescription;
            }
        });
        console.log('Activity data added.');

        console.log('Writing JSON file...');
        fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
        console.log('JSON file written successfully.');
    } catch (error) {
        console.error('Error converting to JSON:', error);
    }
};

// Run the main function
convertToJSON();
