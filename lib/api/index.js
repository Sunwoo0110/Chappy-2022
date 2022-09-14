import Axios from 'axios';
import qs from "qs";

const axios = Axios.create({
	baseURL: "http://localhost:3000",
})

axios.defaults.paramsSerializer = params => {
	return qs.stringify(params, {
			arrayFormat: "brackets",
			encode: false,
			indices: false,
		}	
	)
}

export default axios;
