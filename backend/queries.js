// File to modularize the queries since they are messier with mssql
import sql from 'mssql'
import bcrypt from 'bcryptjs'

let con;
async function connectToDatabase() {
    try {
      con = await sql.connect({
        server: 'serverName',
        database: 'DB name',
        user: 'userName',
        password: 'password',
        options: {
          encrypt: true,
          enableArithAbort: true
        }
      });
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
await connectToDatabase(); // Make the connection

async function authenticateUser(email, password) {
    try {
      await sql.connect(config);
      const request = new sql.Request();
  
      const query = 'SELECT * FROM admin WHERE email = @email';
      request.input('email', sql.NVarChar, email);
  
      const result = await request.query(query);
  
      if (result.recordset.length > 0) {
        const admin = result.recordset[0];
  
        if (await bcrypt.compare(password, admin.password)) {
          const id = admin.id;
          const token = jwt.sign({ role: 'admin', id }, 'jwt-secret-key', { expiresIn: '1d' });
          return { Status: 'Success', Token: token };
        } else {
          return { Status: 'Error', Error: 'Wrong Email or Password' };
        }
      } else {
        return { Status: 'Error', Error: 'Admin not found' };
      }
    } catch (error) {
      console.error('Error in running query:', error);
      throw error;
    } finally {
      sql.close();
    }
  }