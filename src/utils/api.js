import { BASE_URL } from "./config";

export class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  /** проверить ответ */
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  /** получить users*/
  getUsers(login, sort) {
    return fetch(
      `${this._baseUrl}/search/users?q=${login}&sort=repositories&order=${sort}&per_page=100`,
      {
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  getRepositories(login) {
    return fetch(`${this._baseUrl}/users/${login}/repos`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

export default api;
