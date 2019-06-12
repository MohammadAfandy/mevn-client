<template>
	<div id="players">
		<h1>{{ msg }}</h1>
		<p class="error" v-if="error">{{ error }}</p>
		<form @submit.prevent="createPlayer">
			<input type="text" name="name" placeholder="Name..." v-model="newPlayer.name">
			<select name="position" v-model="newPlayer.position">
				<option value="">==Position==</option>
				<option v-for="(positionList, index) in positionLists" :key="index" :value="positionList">{{ positionList }}</option>
			</select>
			<input type="number" name="details[gameplayed]" placeholder="Game Played..." v-model.number="newPlayer.details.gamePlayed">
			<input type="number" name="details[goals]" placeholder="Goal..." v-model.number="newPlayer.details.goals">
			<input type="number" name="details[assist]" placeholder="Assist..." v-model.number="newPlayer.details.assist">
			<input type="number" name="details[rating]" placeholder="Rating..." v-model.number="newPlayer.details.rating">
			<button type="submit">Create</button>
		</form>
		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Player Name</th>
					<th>#</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(player, index) in players" :index="index" :key="index">
					<td>{{ index + 1 }}</td>
					<td>{{ player.name }}</td>
					<td><button @click="deletePlayer(player._id)">X</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import PlayerService from '@/services/PlayerService'

export default {
	name: 'PlayersComponent',
	props: {
		msg: String
	},
	data() {
		return {
			positionLists: ['Forward', 'Midfielder', 'Back', 'Goalkeeper'],
			players: [],
			error: '',
			newPlayer: {
				name: '',
				position: '',
				details: {
					gamePlayed: 0,
					goals: 0,
					assist: 0,
					rating: 0
				}
			}
		}
	},
	methods: {
		async createPlayer() {
			let result = PlayerService.insertPlayer(JSON.parse(JSON.stringify(this.newPlayer)))
			this.players = await PlayerService.getPlayers()
		},
		async deletePlayer(id) {
			await PlayerService.deletePlayer(id)
			this.players = await PlayerService.getPlayers()
		}
	},
	async created() {
		try {
			this.players = await PlayerService.getPlayers()
		} catch(e) {
			this.error = e.message
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="number"] {
	width: 8em;
}
</style>
