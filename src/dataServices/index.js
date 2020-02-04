

const _baseURL = "https://starnavi-frontend-test-task.herokuapp.com/";

export default class GetData {
  async getResource(url) {
    const res = await fetch(_baseURL + url);
    if (!res.ok) {
      throw new Error(`Could not fetch: ${this._apiBaseURL + url},
          resived ${res.status}`);
    }
    const data = await res.json();
    return data;
  }

  getDataFromServer = async url => {
    const res = await this.getResource(url);
    return res;
  };
 
}
