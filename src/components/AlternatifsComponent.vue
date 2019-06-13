<template>
  <div class="alternatif">
    <b-alert :variant="alert.variantAlert" :show="alert.showAlert">
      <p v-if="alert.variantAlert === 'success'">{{ alert.message }}</p>
      <ul v-if="alert.variantAlert === 'danger'">
        <li v-for="(err, index) in alert.message" :key="index">{{ err.Message }}</li>
      </ul>
    </b-alert>
    <b-form @submit.prevent="createAlternatif" @reset.prevent="onReset">
      <b-form-group
        id="input-group-1"
        label="Nama Alternatif:"
        label-for="nama_alternatif"
      >
        <b-form-input
          id="nama_alternatif"
          v-model="form.nama_alternatif"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Keterangan:" label-for="keterangan">
        <b-form-textarea
          id="keterangan"
          v-model="form.keterangan"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group class="text-right">
        <b-button type="reset" variant="danger" class="mx-2">Reset</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form-group>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <table class="table tbl-hover tbl-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Alternatif</th>
            <th>Keterangan</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(alternatif, index) in alternatifs" :index="index" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ alternatif.nama_alternatif }}</td>
            <td>{{ alternatif.keterangan }}</td>
            <td><b-button variant="danger" size="sm" @click="deleteAlternatif(alternatif.id)">X</b-button></td>
          </tr>
        </tbody>
      </table>
    </b-card>
  </div>
</template>

<script>
import AlternatifService from '@/services/AlternatifService'

export default {
  name: 'AlternatifsComponet',
  data() {
    return {
      alternatifs: [],
      form: {
          nama_alternatif: '',
          keterangan: '',
      },
      alert: {
        variantAlert: '',
        showAlert: false,
        message: null,
      }
    }
  },
  methods: {
    async createAlternatif() {
      this.alert.showAlert = true
      let result = await AlternatifService.insertAlternatif(this.form)
      if (result.data.status === 201) {
        this.alert.message = 'Create Data Success'
        this.alert.variantAlert = 'success'
        this.alternatifs = await AlternatifService.getAlternatifs()
      } else {
        this.alert.variantAlert = 'danger'
        this.alert.message = result.data.error
      }
    },
    async deleteAlternatif(id) {
      await AlternatifService.deleteAlternatif(id)
      this.alternatifs = await AlternatifService.getAlternatifs()
    },
    onReset() {
      this.form.nama_alternatif = ''
      this.form.keterangan = ''
    },
  },
  async created() {
    try {
      this.alternatifs = await AlternatifService.getAlternatifs()
    } catch(e) {
      this.error = e
    }
  }
}
</script>

<style scoped>
</style>
