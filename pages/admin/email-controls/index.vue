<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Email Controls
                        </h2>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12">

                    <div class="card darcula-bg mb-2 ">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th class="text-white"> SHORTCODE </th>
                                        <th class="text-white"> DESCRIPTION </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><pre class="text-white"> [[name]] </pre></td>
                                        <td class="text-white"> User's Name will replace here. </td>
                                    </tr>
                                    <tr>
                                        <td><pre class="text-white"> [[message]] </pre></td>
                                        <td class="text-white"> Application notification message will replace here.</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="card bg-dark">

                        <div class="card-body darcula-bg">



                            <form @submit.prevent="submit">

                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group ">
                                            <label>From Email</label>
                                            <input type="text" v-model.trim="form.sender_email"  class="form-control" placeholder="From Email" >
                                            <span class="text-danger" v-if="errors.sender_email">{{errors.sender_email[0]}}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group ">
                                            <label>From Email Name</label>
                                            <input type="text" v-model.trim="form.sender_email_name" class="form-control" placeholder="From Email Name" >
                                            <span class="text-danger" v-if="errors.sender_email_name">{{errors.sender_email_name[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Send Email Method</label>
                                            <select v-model="form.email_method" class="form-control">
                                                <option  v-for="mailMethod in statuses" v-bind:value="mailMethod.value">{{mailMethod.text}}</option>

                                            </select>

                                            <span class="text-danger" v-if="errors.email_method">{{errors.email_method[0]}}</span>

                                        </div>
                                    </div>
                                </div>

                                <div v-if="form.email_method == 'smtp'" class="form-row mt-4">
                                    <div class="col-md-12">
                                        <h6 class="mb-2">SMTP Configuration</h6>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="font-weight-bold">Host <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" placeholder="Host or Email Address" v-model.trim="form.smtp_host">
                                        <span class="text-danger" v-if="errors.smtp_host">{{errors.smtp_host[0]}}</span>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <label class="font-weight-bold">Port <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" placeholder="Available port" v-model="form.smtp_port">

                                        <span class="text-danger" v-if="errors.smtp_port">{{errors.smtp_port[0]}}</span>

                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="font-weight-bold">Encryption</label>

                                        <select v-model="form.smtp_encryption" class="form-control">
                                            <option  v-for="encType in encryptions" v-bind:value="encType.value">{{encType.text}}</option>
                                        </select>

                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Username <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" placeholder="username or Email" v-model.trim="form.smtp_username">
                                        <span class="text-danger" v-if="errors.smtp_username">{{errors.smtp_username[0]}}</span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="font-weight-bold">Password <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" placeholder="Password" v-model.trim="form.smtp_password">

                                        <span class="text-danger" v-if="errors.smtp_password">{{errors.smtp_password[0]}}</span>
                                    </div>
                                </div>


                                <div class="row">

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success btn-block mt-3">Update</button>
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
                title: 'heeraexchange.in | Email Settings',
            }
        },
        data(){
            return {
                content: '',
                form:{
                    sender_email:'',
                    sender_email_name:'',
                    email_method:'',
                    smtp_host:'',
                    smtp_port:'',
                    smtp_encryption:'',
                    smtp_username:'',
                    smtp_password:'',
                    email_description:''
                },
                statuses: [
                    {text: 'PHP Mail', value: 'sendmail'},
                    {text: 'SMTP', value: 'smtp'}
                ],
                encryptions: [
                    {text: 'TLS', value: 'tls'},
                    {text: 'SSL', value: 'ssl'}
                ],
            }
        },
        mounted(){
            this.form.sender_email = this.basic.sender_email;
            this.form.sender_email_name = this.basic.sender_email_name;
            this.form.email_method = this.basic.email_configuration.name;

            this.form.smtp_host = this.basic.email_configuration.smtp_host;
            this.form.smtp_port = this.basic.email_configuration.smtp_port;
            this.form.smtp_encryption = this.basic.email_configuration.smtp_encryption;
            this.form.smtp_username = this.basic.email_configuration.smtp_username;
            this.form.smtp_password = this.basic.email_configuration.smtp_password;
            this.form.email_description = this.mailTemplate;
            this.form.content = this.mailTemplate;
        },

        computed: {
            ...mapState(['basic','mailTemplate'])
        },
        async asyncData({$axios, store,redirect}){
            var _this = this;
            await $axios.get('/basic')
                .then(res => {
                    store.dispatch("setBasicData", res.data);
                }).catch(err => {
                });


            await $axios.get('/mailTemplate')
                .then(res => {
                    store.dispatch("setMailTemplateData", res.data);
                }).catch(err => {
                });
        },
        methods: {

            async submit() {

                var _this = this;
                await this.$axios.$post('email-controls', this.form)
                    .then(res => {

                        this.$store.dispatch('setBasicData', res.basic);

                        Vue.$toast.open({
                            message: 'Update Successfully',
                            type: 'success',
                            position: 'top-right'
                        });
                    })
                    .catch(err => {
                    });
            }
        },

    }
</script>