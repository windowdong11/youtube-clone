import PostgreSQL from 'pg';
import utils from '../utils';
const { Client, types } = PostgreSQL

class DBModel {
  private readonly pgClient: PostgreSQL.Client;
  constructor(props?: PostgreSQL.ClientConfig) {
    this.pgClient = new Client(props)
    this.pgClient.connect()
  }

  // ----- User -----

  // TODO : Implementation
  async createUser_auth0() {
    throw 'TODO : DBModel createUser_auth0 구현';
  }

  // TODO : Implementation
  async readUser() {
    throw 'TODO : DBModel readUser 구현';
  }

  // TODO : Implementation
  async updateUser() {
    throw 'TODO : DBModel updateUser 구현';
  }

  // TODO : Implementation
  async deleteUser(
    user_name: youtubeDB.website_userEntity['user_name'],
    email: youtubeDB.website_userEntity['email'],
  ) {
    throw 'TODO : DBModel deleteUser 구현';
  }

  // ----- Video -----
  
  // TODO : Implementation
  async createVideo() {
    throw 'TODO : DBModel createVideo 구현';
  }
  // TODO : Implementation
  async readVideo() {
    throw 'TODO : DBModel readVideo 구현';
  }
  // TODO : Implementation
  async deleteVideo() {
    throw 'TODO : DBModel deleteVideo 구현';
  }

  // ----- Comment -----
  
  // TODO : Implementation
  async createComment() {
    throw 'TODO : DBModel createComment 구현';
  }
  // TODO : Implementation
  async readComment() {
    throw 'TODO : DBModel readComment 구현';
  }
  // TODO : Implementation
  async updateComment() {
    throw 'TODO : DBModel updateComment 구현';
  }
  // TODO : Implementation
  async deleteComment() {
    throw 'TODO : DBModel deleteComment 구현';
  }

  // ----- Community -----
  
  // TODO : Implementation
  async createCommunity() {
    throw 'TODO : DBModel createCommunity 구현';
  }
  // TODO : Implementation
  async readCommunity() {
    throw 'TODO : DBModel readCommunity 구현';
  }
  // TODO : Implementation
  async updateCommunity() {
    throw 'TODO : DBModel updateCommunity 구현';
  }
  // TODO : Implementation
  async deleteCommunity() {
    throw 'TODO : DBModel deleteCommunity 구현';
  }
}

export default new DBModel({
  "host": process.env.DB_HOST,
  "user": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE
});