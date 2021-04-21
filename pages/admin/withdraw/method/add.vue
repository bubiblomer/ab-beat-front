<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Add New Method</h2>
                        <nuxt-link to="/admin/withdraw/method" class="btn btn-sm btn-success btn-round text-right" exact>
                            <i class="fa fa-list"></i> List
                        </nuxt-link>
                    </div>


                    <div class="card bg-dark">
                        <div class="card-header section-title media align-items-center justify-content-between">
                            <h5>Gateway Form</h5>
                        </div>
                        <div class="card-body darcula-bg">
                            <p v-for="error in errors">{{error}}</p>
                            <form @submit.prevent="submit">

                                <div class="row ">

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input type="text" v-model="form.name" class="form-control"
                                                   placeholder="Gateway Name">
                                            <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                                        </div>
                                    </div>



                                    <div class="col-md-4">
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

                                    <div class="col-md-4">
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

                                    <div class="col-md-4">
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


                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Percent Charge</label>
                                            <div class="input-group">
                                                <input type="text" v-model="form.percent_charge" class="form-control"
                                                       placeholder="Percent Charge">

                                                <div class="input-group-append bg-dark">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger"
                                                  v-if="errors.percent_charge">{{errors.percent_charge[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Select Status</label>
                                            <select v-model="form.status" class="form-control">
                                                <option v-for="status in statuses" v-bind:value="status.value">
                                                    {{status.text}}
                                                </option>
                                            </select>

                                            <span class="text-danger" v-if="errors.status">{{errors.status[0]}}</span>

                                        </div>
                                    </div>

                                </div>

                                <div class="card bg-dark">
                                            <div class="card-header justify-content-between align-items-center d-flex">
                                                <h4 class="card-title">User Information Field</h4>
                                                <button type="button" @click="addForm" class="btn btn-success btn-sm">Add
                                                    Form
                                                </button>
                                            </div>
                                            <div class="card-body">
                                                <div class="form-row justify-content-between align-items-center"
                                                     v-for="(genForm, index) in form.builders" :key="index">
                                                    <div class="form-group col-md-3">
                                                        <input v-model="genForm.field_name"
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

                                                <div class="form-row">
                                                    <div class="form-group col-md-12">
                                                        <button class="btn btn-success btn-block mt-3" type="submit">Save
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>






                            </form>


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
                title: 'heeraexchange.in | Add Method',
            }
        },
        computed: {
            ...mapState(['basic'])
        },
        data() {
            return {
                editModal: false,
                form: {
                    id: '',
                    name: '',
                    min_amount: '',
                    max_amount: '',
                    fixed_charge: '',
                    percent_charge: '',
                    parameter: {},
                    status: 1,
                    builders: [
                        {
                            field_name: "",
                            type: "text",
                            validation: "required",
                        }
                    ]
                },
                statuses: [
                    {text: 'Active', value: 1},
                    {text: 'DeActive', value: 0}
                ],


            }
        },
        async asyncData({$axios, store, redirect}) {
            let {data} =  await $axios.get('/basic')
            store.dispatch("setBasicData", data);
        },

        methods: {
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

            async submit() {
                await this.$axios.$post('/methodStore', this.form)
                    .then(res => {

                        if(res.success){
                            Vue.$toast.open({
                                message: ''+res.success,
                                type: 'success',
                                position: 'top-right'
                            });

                            this.$router.push('/admin/withdraw/method')
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

    }
</script>