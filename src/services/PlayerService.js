import axios from 'axios'

const url = '/api/players/'

class PlayerService {
	// GET
	static getPlayers() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url)
				const data = res.data
				resolve(
					data.map(player => ({
						...player
					}))
				)
			} catch(e) {
				reject(e)
			}
		})
	}

	// CREATE
	static insertPlayer(data) {
		return axios.post(url, data)
	}

	// DELETE
	static deletePlayer(id) {
		return axios.delete(`${url}${id}`)
	}
}

export default PlayerService