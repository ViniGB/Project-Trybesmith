import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';
// import Login from '../interfaces/login.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async createUser(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }

  public async getUserByName(data: User): Promise<User> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users WHERE username=?', [data.username]);
    const [row] = result;
    const [user] = row as User[];
    return user;
  }
}