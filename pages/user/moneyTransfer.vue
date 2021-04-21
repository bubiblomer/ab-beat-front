<template>
    <div>
        <Breadcrumb title="MONEY TRANSFER"></Breadcrumb>

        <section class="contact-section-two">
            <div class="chancer-container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="card bg-dark">
                            <div class="card-body darcula-bg">

                                <div class="row justify-content-center">

                                    <div class="col-md-6">

                                        <form @submit.prevent="submit">

                                            <p class="text-info text-center">Transfer Limit: {{basic.min_transfer}} {{basic.currency_symbol}}  - {{basic.max_transfer}} {{basic.currency_symbol}}</p>
                                            <p class="text-info  text-center mb-3">Transfer Charge: {{basic.transfer_charge}}%</p>
                                            <div class="form-group">
                                                <label>Email Or Username</label>
                                                <input type="text" v-model="form.username" class="form-control"
                                                       placeholder="Email Or Username">
                                                <span class="text-danger"
                                                      v-if="errors.username">{{errors.username[0]}}</span>
                                                <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
                                            </div>

                                            <div class="form-group">
                                                <label>Amount</label>
                                                <input type="text" v-model="form.amount" class="form-control"
                                                       placeholder="0.00">
                                                <span class="text-danger"
                                                      v-if="errors.amount">{{errors.amount[0]}}</span>
                                            </div>

                                            <div class="form-group">
                                                <label>Password</label>
                                                <input type="password" v-model="form.password" class="form-control"
                                                       placeholder="Password">
                                                <span class="text-danger"
                                                      v-if="errors.password">{{errors.password[0]}}</span>
                                            </div>


                                            <div class="form-group">
                                                <button type="submit" class="btn btn-warning btn-block text-white mt-3">
                                                    SUBMIT
                                                </button>
                                            </div>


                                        </form>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'

    import {BootstrapVue} from 'bootstrap-vue'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    Vue.use(BootstrapVue);
    import Breadcrumb from '@/components/Breadcrumb'

    export default {
        middleware: 'auth',
        components: {Breadcrumb},
        head() {
            return {
                title: 'heeraexchange.in  | Money Transfer',
            }
        },

        data() {
            return {
                form: {
                    username: "",
                    amount: "",
                    password: ""
                },
            }
        },
        computed: {
            ...mapState(['basic'])
        },
        async asyncData({$axios, store, redirect, params}) {
            var _this = this;
            await $axios.get('/basic')
                .then(res => {
                    store.dispatch("setBasicData", res.data);
                }).catch(err => {
                });
        },
        methods: {
            async submit() {
                var _this = this;
                await this.$axios.$post('moneyTransfer', this.form)
                    .then(res => {


                        if (res.errors) {
                            Vue.$toast.open({
                                message: '' + res.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }

                        if (res.result) {

                            _this.form.username = "";
                            _this.form.amount = "";
                            _this.form.password = "";

                            _this.$store.dispatch('updateUserData', res.user);
                            Vue.$toast.open({
                                message: '' + res.message,
                                type: 'success',
                                position: 'top-right'
                            });
                        }
                    })
                    .catch(err => {
                    });
            }
        }
    }
</script>
