/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.password = null;
    this.username = null;
    this.birthday = null;
    this.token = null;
    this.status = null;
    this.creationDate = null;
    this.games = null;
    this.moves = null;
    Object.assign(this, data);
  }
}
export default User;