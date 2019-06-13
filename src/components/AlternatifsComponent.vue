<template>
  <div class="alternatif">
    <v-btn color="info" @click="showForm('create')" fab small><v-icon>add</v-icon></v-btn>
    <b-card class="mt-3" :header="formOption.header" v-show="formOption.show">
      <b-form
        @submit.prevent="formOption.action === 'create' ? createAlternatif() : updateAlternatif()"
        @reset.prevent="onReset"
        id="form-alternatif"
        >
        <b-form-group id="input-group-1" label="Nama Alternatif:" label-for="nama_alternatif">
          <b-form-input id="nama_alternatif" v-model="form.nama_alternatif"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Keterangan:" label-for="keterangan">
          <b-form-textarea id="keterangan" v-model="form.keterangan" max-rows="6"></b-form-textarea>
        </b-form-group>

        <b-form-group class="text-right">
          <v-btn type="reset" color="error" class="mx-2">Reset</v-btn>
          <v-btn type="submit" color="success">{{ formOption.action }}</v-btn>
        </b-form-group>
      </b-form>
    </b-card>
    <b-card class="mt-3" header="DATA ALTERNATIF">
      <v-data-table
        :headers="table.headers"
        :items="alternatifs"
        :hide-actions="true"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.index + 1}}</td>
          <td>{{ props.item.nama_alternatif }}</td>
          <td>{{ props.item.keterangan }}</td>
          <td>
            <v-btn color="primary" @click="showForm('update', props.item)" fab small>
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="error" @click="deleteAlternatif(props.item.id)" fab small>
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </b-card>
    <v-snackbar
      v-model="popup.snackbar"
      :timeout="popup.timeout"
      :top="true"
      :color="popup.color"
      :auto-height="popup.autoHeight"
    >
      <ul style="list-style: none;padding-left: 0;">
        <li v-for="txt in popup.text" :key="txt">{{ txt }}</li>
      </ul>
      <v-btn color="pink" flat @click="popup.snackbar = false">X</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AlternatifService from "@/services/AlternatifService";

export default {
  name: "AlternatifsComponet",
  data() {
    return {
      formOption: {
        header: "",
        action: "",
        show: false
      },
      table: {
        headers: [
          { text: "#", value: "#" },
          { text: "Nama Alternatif", value: "nama_alternatif" },
          { text: "Keterangan", value: "keterangan" }
        ]
      },
      popup: {
        snackbar: false,
        autoHeight: true,
        timeout: 6000,
        text: [],
        color: "success"
      },
      alternatifs: [],
      form: {
        nama_alternatif: "",
        keterangan: ""
      }
    };
  },
  methods: {
    async createAlternatif() {
      try {
        let result = await AlternatifService.insertAlternatif(this.form);
        if (result.data.status === 201) {
          this.showPopup("success", ["Create Data Success"]);
          this.alternatifs = await AlternatifService.getAlternatifs();
          this.hideForm()
          window.scrollTo(0,document.body.scrollHeight);
        } else if (result.data.status === 422) {
          this.showPopup(
            "error",
            (this.popup.text = result.data.error.map(err => {
              return err.Message;
            }))
          );
        } else {
          this.showPopup("error", ["Create Data Failed", result.data.error]);
        }
      } catch (e) {
        this.showPopup("error", ["System Failure. Please Try Again"]);
      }
    },
    async updateAlternatif() {
      try {
        let result = await AlternatifService.updateAlternatif(this.form);
        if (result.data.status === 200) {
          this.showPopup("success", ["Update Data Success"]);
          this.alternatifs = await AlternatifService.getAlternatifs();
          this.hideForm()
        } else if (result.data.status === 422) {
          this.showPopup(
            "error",
            (this.popup.text = result.data.error.map(err => {
              return err.Message;
            }))
          );
        } else {
          this.showPopup("error", ["Update Data Failed", result.data.error]);
        }
      } catch (e) {
        this.showPopup("error", ["System Failure. Please Try Again"]);
      }
    },
    async deleteAlternatif(id) {
      try {
        let result = await AlternatifService.deleteAlternatif(id);
        if (result.data.status === 200) {
          this.showPopup("success", ["Delete Data Success"]);
          this.alternatifs = await AlternatifService.getAlternatifs();
        } else {
          this.showPopup("error", ["Delete Data Failed", result.data.error]);
        }
      } catch (e) {
        this.showPopup("error", ["System Failure. Please Try Again"]);
      }
    },
    onReset() {
      this.form = {}
    },
    showPopup(color, text) {
      this.popup = {
        color: color,
        text: text,
        snackbar: true
      }
    },
    showForm(type, data = {}) {
      let headerForm = ''
      this.onReset()
      if (type === "update") {
        this.form = Object.assign({}, data)
        headerForm = data.nama_alternatif
        window.scrollTo(0, 0);
      }
      this.formOption.header = (`form ${type} data: ${headerForm}`).toUpperCase()
      this.formOption.action = type
      this.formOption.show = true
    },
    hideForm() {
      this.formOption.show = false
      this.onReset()
    }
  },
  async created() {
    try {
      this.alternatifs = await AlternatifService.getAlternatifs();
    } catch (e) {
      this.showPopup("error", ["System Failure. Please Try Again"]);
    }
  }
};
</script>