import axios from 'axios'

const url = '/api/go/alternatif/'

class AlternatifService {
	// GET
	static getAlternatifs() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url)
				const data = res.data
				resolve(
					data.map(alternatif => ({
						...alternatif
					}))
				)
			} catch(e) {
				reject(e)
			}
		})
	}

	// CREATE
	static insertAlternatif(data) {
		return axios.post(url, data)
	}

	// DELETE
	static deleteAlternatif(id) {
		return axios.delete(`${url}${id}`)
	}
}

export default AlternatifService