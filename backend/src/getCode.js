const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const combinedPath = path.join(__dirname, '..', 'convertedData', 'combined.csv');
const filteredCodePath = path.join(__dirname, '..', 'files', 'filtered_code.csv');
const outputPath = path.join(__dirname, '..', 'convertedData', 'data.csv');

const readCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const translateColumns = async () => {
    try {
        const combinedData = await readCsv(combinedPath);
        const filteredCodeData = await readCsv(filteredCodePath);

        const translationMaps = {
            Status: new Map(),
            JuridicalSituation: new Map(),
            TypeOfEnterprise: new Map(),
            JuridicalForm: new Map(),
            TypeOfAddress: new Map(),
            TypeOfDenomination: new Map(),
            ActivityGroup: new Map(),
            Classification: new Map()
        };

        filteredCodeData.forEach(item => {
            const category = item.Category;
            const code = item.Code;
            const description = item.Description;

            if (translationMaps[category]) {
                translationMaps[category].set(code, description);
            }
        });

        const translatedData = combinedData.map(item => {
            Object.keys(translationMaps).forEach(column => {
                if (item[column]) {
                    item[column] = translationMaps[column].get(item[column]) || item[column];
                }
            });
            return item;
        });

        const csvWriter = createCsvWriter({
            path: outputPath,
            header: Object.keys(translatedData[0]).map(key => ({ id: key, title: key }))
        });

        // Write translated data to a new CSV file
        await csvWriter.writeRecords(translatedData);
        console.log('CSV file written successfully.');
    } catch (error) {
        console.error('Error translating columns:', error);
    }
};

// Run the main function
translateColumns();
