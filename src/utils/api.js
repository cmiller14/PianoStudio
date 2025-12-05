export class Api {
  getToken = () => null;

  constructor(getTokenFn) {
    this.getToken = getTokenFn;
  }

  async makeRequest(url, method, body) {
    const authToken = this.getToken();

    const headers = {
      Authorization: `Bearer ${authToken}`
    };

    const options = { method, headers };

    // Only set JSON headers when sending JSON
    if (body && !(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
      // Let browser set multipart/form-data boundary
      options.body = body;
    }

    const res = await fetch(url, options);
    return res.json();
  }

  get(url) {
    return this.makeRequest(url, "GET");
  }

  post(url, body = {}) {
    return this.makeRequest(url, "POST", body);
  }

  put(url, body = {}) {
    return this.makeRequest(url, "PUT", body);
  }

  del(url) {
    return this.makeRequest(url, "DELETE");
  }

  upload(url, formData) {
    return this.makeRequest(url, "POST", formData);
  }
}
