import multer from 'multer';
import fs from 'fs';
import Papa from 'papaparse';
import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';


const upload = multer({ dest: 'uploads/' });

const parseCSV = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return new Promise((resolve, reject) => {
        Papa.parse(fileContent, {
            header: true,
            complete: resolve,
            error: reject
        })
    });
};

function formatDate(dateStr) {
    if (!dateStr) return null; // Return null if the date string is empty or undefined
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const [month, day, year] = parts;
        return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
    } else {
        console.error(`Invalid date format: ${dateStr}`);
        return null;
    }
}

const combineCSVData = (dataArrays) => {
    const combinedData = {};
    const idLookup = new Map();

    // Combine dataset1 and dataset2, which have IDs
    dataArrays.slice(0, 2).forEach(dataArray => {
        dataArray.forEach(record => {
            let key = `id-${record.Id}`;
            combinedData[key] = { ...record };
            idLookup.set(`${record.Name}-${record.email}`, record.Id);
        });
    });

    // Process dataset3, which does not have IDs
    dataArrays[2].forEach(record => {
        let key = `name-email-${record.Name}-${record.email}`;
        if (idLookup.has(key)) {
            // Use the existing ID to match and combine data
            let idKey = `id-${idLookup.get(key)}`;
            combinedData[idKey] = { ...combinedData[idKey], ...record };
        } else {
            // If there is no match, generate a new ID for this record
            let newId = generateNewId();
            combinedData[newId] = { ...record, Id: newId };
        }
    });

    return Object.values(combinedData);
};

// Example implementation of generateNewId function
const generateNewId = () => {
    // Generate a unique ID (e.g., UUID)
    return uuidv4(); // Make sure to import uuid library
};

const mergeAndInsertData = async (data, con) => {
    const transaction = new sql.Transaction(con);

    try {
        await transaction.begin();

        for (const record of data) {
            const request = new sql.Request(transaction);

            // Set up your SQL parameters here
            request.input('ID', sql.VarChar, record.Id);
            request.input('Name', sql.VarChar, record.Name);
            request.input('Email', sql.VarChar, record.Email);
            request.input('DevicePaymentPlan', sql.Bit, record['Device Payment Plan']);
            request.input('CreditCardNumber', sql.VarChar, record['Credit Card Number']);
            request.input('CreditCardType', sql.VarChar, record['Credit Card Type']);
            request.input('AccountLastPaymentDate', sql.DateTimeOffset, formatDate(record['Account Last Payment Date']));
            request.input('Address', sql.VarChar, record.Address);
            request.input('State', sql.VarChar, record.State);
            request.input('PostalCode', sql.VarChar, record['Postal Code']);

            // Check if a record with the ID already exists
            const checkQuery = `SELECT COUNT(*) as count FROM combined_data WHERE ID = @ID`;
            const checkResult = await request.query(checkQuery);

            if (checkResult.recordset[0].count > 0) {
                // Record exists, prepare an update query
                const updateQuery = `
                    UPDATE combined_data SET
                    name = @Name,
                    email = @Email,
                    device_payment_plan = @DevicePaymentPlan,
                    credit_card = @CreditCardNumber,
                    credit_card_type = @CreditCardType,
                    account_last_payment_date = @AccountLastPaymentDate,
                    address = @Address,
                    state = @State,
                    postal_code = @PostalCode
                    WHERE ID = @ID
                `;
                await request.query(updateQuery);
            } else {
                // Record does not exist, prepare an insert query
                const insertQuery = `
                    INSERT INTO combined_data (ID, name, email, device_payment_plan, credit_card, credit_card_type, account_last_payment_date, address, state, postal_code)
                    VALUES (@ID, @Name, @Email, @DevicePaymentPlan, @CreditCardNumber, @CreditCardType, @AccountLastPaymentDate, @Address, @State, @PostalCode)
                `;
                await request.query(insertQuery);
            }
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error('Error during database operation:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};


    const processCSVUpload = async (req, res, con) => {
        try {
            console.log('Received files:', req.files);
    
            const allData = [];
            for (const file of req.files) {
                console.log('Processing file:', file.originalname);
                const filePath = file.path;
                const parsedData = await parseCSV(filePath);
                console.log('Parsed data:', parsedData.data);
                allData.push(parsedData.data);
            }
            
            console.log('Combining data...');
            const combinedData = combineCSVData(allData);
            console.log('Combined data:', combinedData);
    
            console.log('Merging and inserting data...');
            await mergeAndInsertData(combinedData, con);
            console.log('Data processed and inserted.');
    
            res.send('Files processed and data inserted into the database.');
        } catch (error) {
            console.error('Error processing files:', error);
            res.status(500).send('Error processing files');
        } finally {
            console.log('Cleaning up uploaded files...');
            for (const file of req.files) {
                fs.unlinkSync(file.path);
            }
            console.log('Cleanup complete.');
        }
    };
    
        export { generateNewId };
        export { upload, processCSVUpload };