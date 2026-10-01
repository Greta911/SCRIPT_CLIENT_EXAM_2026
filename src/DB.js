export default class DB {
    static setApiURL(url) {
        this.apiURL = url;
    }

    static async findAll() {
    const response = await fetch(`${this.apiURL}/monsters`);
    return response.json();
  }

  static async store(data) {
    const response = await fetch(`${this.apiURL}/monsters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

    static async update(id, data) {
    const response = await fetch(`${this.apiURL}/monsters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async delete(id) {
    const response = await fetch(`${this.apiURL}/monsters/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }
}