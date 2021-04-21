<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Edit Gateway</h2>
                        <nuxt-link to="/admin/gateway" class="btn btn-sm btn-success btn-round text-right" exact>
                            <i class="fa fa-list"></i> List
                        </nuxt-link>
                    </div>


                    <div class="card bg-dark">
                        <div class="card-header section-title media align-items-center justify-content-between">
                            <h5>Gateway Form</h5>
                        </div>
                        <div class="card-body darcula-bg">
                            <form @submit.prevent="submit">

                                <div class="row">

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input type="text" v-model="form.name" class="form-control"
                                                   placeholder="Gateway Name">
                                            <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                                        </div>
                                    </div>


                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>currency</label>
                                            <input type="text" v-model="form.currency" class="form-control"
                                                   placeholder="Currency">
                                            <span class="text-danger"
                                                  v-if="errors.currency">{{errors.currency[0]}}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Currency Symbol</label>
                                            <input type="text" v-model="form.symbol" class="form-control"
                                                   placeholder="Currency Symbol">
                                            <span class="text-danger"
                                                  v-if="errors.symbol">{{errors.symbol[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Rate</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend bg-dark">
                                                    <span class="input-group-text">1 {{basic.currency}} = </span>
                                                </div>
                                                <input type="text" v-model="form.rate" class="form-control"
                                                       placeholder="0.00">

                                                <div class="input-group-append bg-dark">
                                                    <span class="input-group-text">{{form.currency}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row justify-content-between">


                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Minimum Amount</label>
                                            <div class="input-group">

                                                <input type="text" v-model="form.min_amount" class="form-control"
                                                       placeholder="Minimum Amount">

                                                <div class="input-group-append bg-dark">
                                                    <span class="input-group-text">{{basic.currency}} </span>
                                                </div>
                                            </div>
                                            <span class="text-danger"
                                                  v-if="errors.min_amount">{{errors.min_amount[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Maximum Amount</label>
                                            <div class="input-group">
                                                <input type="text" v-model="form.max_amount" class="form-control"
                                                       placeholder="Maximum Amount">
                                                <div class="input-group-append bg-dark">
                                                    <span class="input-group-text">{{basic.currency}} </span>
                                                </div>
                                            </div>
                                            <span class="text-danger"
                                                  v-if="errors.max_amount">{{errors.max_amount[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Fixed Charge</label>
                                            <div class="input-group">

                                                <input type="text" v-model="form.fixed_charge" class="form-control"
                                                       placeholder="Fixed Charge">
                                                <div class="input-group-append bg-dark">
                                                    <span class="input-group-text">{{basic.currency}} </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span class="text-danger"
                                              v-if="errors.fixed_charge">{{errors.fixed_charge[0]}}</span>
                                    </div>


                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Percent Charge</label>
                                            <div class="input-group">
                                                <input type="text" v-model="form.percent_charge"
                                                       class="form-control"
                                                       placeholder="Percent Charge">

                                                <div class="input-group-append bg-dark">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger"
                                                  v-if="errors.percent_charge">{{errors.percent_charge[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Select Status</label>
                                            <select v-model="form.status" class="form-control">
                                                <option v-for="status in statuses" v-bind:value="status.value">
                                                    {{status.text}}
                                                </option>
                                            </select>

                                            <span class="text-danger"
                                                  v-if="errors.status">{{errors.status[0]}}</span>

                                        </div>
                                    </div>


                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Deposit Instruction</label>
                                            <textarea id="editor" v-model="form.description" class="form-control"
                                                      placeholder="Type here Instruction to deposit"
                                                      rows="3"></textarea>
                                            <span class="text-danger"
                                                  v-if="errors.description">{{errors.description[0]}}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="card bg-dark">
                                    <div class="card-header justify-content-between align-items-center d-flex">
                                        <h4 class="card-title">User Data</h4>
                                        <button type="button" @click="addForm" class="btn btn-success btn-sm">Add
                                            Form
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-row justify-content-between align-items-center"
                                             v-for="(genForm, index) in form.builders" :key="index">
                                            <div class="form-group col-md-3">
                                                <input v-model="genForm.field_level"
                                                       :name="`form.builders[${index}][field_name]`" type="text"
                                                       class="form-control" placeholder="Field Name">
                                            </div>
                                            <div class="form-group col-md-3">
                                                <select v-model="genForm.type"
                                                        :name="`form.builders[${index}][type]`"
                                                        class="form-control">
                                                    <option value="text">Input Text</option>
                                                    <option value="textarea">Textarea</option>
                                                </select>

                                            </div>
                                            <div class="form-group col-md-3">
                                                <select v-model="genForm.validation"
                                                        :name="`form.builders[${index}][validation]`"
                                                        class="form-control">
                                                    <option value="required">Required</option>
                                                    <option value="nullable">Optional</option>
                                                </select>

                                            </div>

                                            <div class="form-group col-md-2">
                                                <button @click="removeForm(form.builders[index])" type="button"
                                                        class="btn btn-danger"><i class="fa fa-times"></i></button>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <button class="btn btn-success btn-block mt-3" type="submit">Save
                                        </button>
                                    </div>
                                </div>


                            </form>

                        </div>
                    </div>

                    <div class="card darcula-bg mt-3">
                        <div class="card-header">
                            <h5>Gateway Logo</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">

                                    <form @submit="fileSubmit" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label>Choose Image</label>
                                            <input type="file" class="form-control" v-on:change="onImageChange">
                                            <span class="text-danger" v-if="errors.image">{{errors.image[0]}}</span>
                                        </div>


                                        <button class="btn btn-success" type="submit"><i class="fa fa-upload"></i> Upload</button>

                                    </form>
                                </div>

                                <div class="col-md-4">
                                    <img :src="logoPath" alt="">
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>


    </div>
</template>


<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'

    export default {
        layout: 'admin',

        head() {
            return {
                title: 'heeraexchange.in | Edit Gateway',
            }
        },
        computed: {
            ...mapState(['basic'])
        },
        data() {
            return {
                editModal: false,
                image: '',
                logoPath: '',
                form: {
                    id: '',
                    name: '',
                    currency: '',
                    symbol: '',
                    rate: '',
                    min_amount: '',
                    max_amount: '',
                    fixed_charge: '',
                    percent_charge: '',
                    description: '',
                    status: '',
                    builders: []
                },
                statuses: [
                    {text: 'Active', value: 1},
                    {text: 'DeActive', value: 0}
                ]
            }
        },

        validate({params}) {
            return /^\d+$/.test(
                params.id
            )
        },
        mounted() {
            this.gatewayData();
        },
        async asyncData({$axios, store, redirect, params}) {
            let {data} = await $axios.get('/basic')
            store.dispatch("setBasicData", data);


        },

        methods: {
            onImageChange(e) {
                this.image = e.target.files[0];
            },
            fileSubmit(e) {
                e.preventDefault();
                let currentObj = this;
                const config = {
                    headers: {'content-type': 'multipart/form-data'}
                };

                let formData = new FormData();
                formData.append('image', this.image);

                this.$axios.post('/gatewayImageUpload/' + this.$route.params.id, formData, config)
                    .then(function (res) {
                        if (res.data.success) {
                            Vue.$toast.open({
                                message: '' + res.data.success,
                                type: 'success',
                                position: 'top-right'
                            });

                        }
                        currentObj.logoPath = res.data.logoPath
                    })
                    .catch(function (error) {
                    });
            },

            addForm() {
                this.form.builders.push({
                    field_name: "",
                    type: "text",
                    validation: "required",

                })
            },
            removeForm(index) {
                this.form.builders.splice(this.form.builders.indexOf(index), 1);
            },
            async gatewayData() {
                var _this = this;
                await this.$axios.get('/gatewayEdit/' + this.$route.params.id)
                    .then(res => {
                        this.logoPath = res.data.logoPath;
                        this.form.id = res.data.id;
                        this.form.name = res.data.name;
                        this.form.currency = res.data.currency;
                        this.form.symbol = res.data.symbol;
                        this.form.rate = res.data.rate;
                        this.form.min_amount = res.data.min_amount;
                        this.form.max_amount = res.data.max_amount;
                        this.form.fixed_charge = res.data.fixed_charge;
                        this.form.percent_charge = res.data.percent_charge;
                        this.form.description = res.data.description;
                        this.form.status = res.data.status;
                        this.form.builders = res.data.builders;

                    }).catch(err => {
                    });
            },

            async submit(e) {

                await this.$axios.$post('/gatewayUpdate', this.form)
                    .then(res => {

                        if (res.success) {
                            Vue.$toast.open({
                                message: '' + res.success,
                                type: 'success',
                                position: 'top-right'
                            });
                        }
                        this.$router.push('/admin/gateway/edit/' + this.params.id)
                    })
                    .catch(err => {
                    })
            }
        }

    }
</script>