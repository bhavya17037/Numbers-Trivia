import axios from "axios";

export default axios.create({
  headers: {
    "x-rapidapi-host": "numbersapi.p.rapidapi.com",
    "x-rapidapi-key": "qpXqmUZAJ1mshts25ThoXIGvO2DSp1tTHCZjsn5lH5MdSG89QW"
  }
});
