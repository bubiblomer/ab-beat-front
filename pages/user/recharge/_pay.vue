<template>
    <div>
        <Breadcrumb title="Payment Via"></Breadcrumb>

        <section class="contact-section-two" >
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="section-title p-4 justify-content-between media">
                            <h2 class="title">Add Fund</h2>
                            <NuxtLink to="/user/depositLog" class="btn btn-warning text-white "><i class="fa fa-list"></i> Fund Log</NuxtLink>
                        </div>
                    </div>
                </div>

                <div v-if="errors.message" class="row align-items-center justify-content-center ">
                    <div class="col-md-8">
                        <h1 class="form-text text-danger" v-if="errors.message">{{errors.message[0]}}</h1>
                    </div>
                </div>

                <div v-else class="row align-items-center justify-content-center ">

                    <div class="col-md-8" v-if="depositPayment.view == 'user.payment.g110'">
                        <div class="card my-3">
                            <div class="card-body">
                                <form :action="depositPayment.data.url" :method="depositPayment.data.method">
                                    <h3 class="text-center">Please Pay {{depositPayment.deposit.final_amo}} {{basic.currency}}</h3>
                                    <h3 class="my-3 text-center">To Get {{depositPayment.deposit.amount}}  {{depositPayment.deposit.method_currency}}</h3>
                                </form>
                            </div>
                        </div>

                    </div>

                    <div class="col-md-12" v-else-if="depositPayment.view == 'manual'">
                        <div class="card darcula-bg my-3">
                            <div class="card-header">
                                <h3 class="card-title">Payment Via {{depositPayment.gateway_name}}</h3>
                            </div>
                            <div class="card-body">

                                <p v-html="depositPayment.info"></p>


                                <form @submit.prevent="submit">
                                    <div class="row ">
                                        <div class="form-group col-md-12"  v-for="(item, index) in depositPayment.gateway_parameter"  >
                                            <label>{{item.field_level}}<span v-if="item.validation == 'required'" class="text-danger">*</span></label>

                                            <input type="text" v-model="form[index]" v-if="item.type == 'text'" :placeholder="item.field_level" class="form-control form-control-lg">

                                            <textarea v-model="form[index]" rows="5" v-if="item.type == 'textarea'" :placeholder="item.field_level"  class="form-control form-control-lg"></textarea>


                                            <input type="file" v-on:change="form[index]"  v-if="item.type == 'file'" class="form-control form-control-lg">


                                            <small class="form-text text-danger" v-if="errors.index">
                                                {{errors.index[0]}}
                                            </small>
                                        </div>

                                        <div class="form-group col-md-12">
                                            <p class="form-text text-danger" v-if="errors" v-for="error in errors">
                                                {{error[0]}}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="row form-group justify-content-center">
                                        <div class="col-md-12">
                                            <button class="btn btn-lg btn-warning text-white btn-block" type="submit"><i
                                                    class="fa fa-paper-plane"></i>Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </section>


    </div>
</template>
<style scoped>
    .img-thumbnail {
        background-color: #f7a516;
        border: 1px solid #f7a516;
        max-width: 65%;
    }
</style>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import { mapState } from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    export default {
        middleware: 'auth',
        components: {Breadcrumb},
        head () {
            return {
                title: 'heeraexchange.in  | Payment Preview',
            }
        },
        data(){
            return {
                preview:0,
                form:{
                    amount:'',
                    gateway_id:''
                },
                logs:{},
                makePaymentModal : false
            }
        },
        async asyncData({$axios, store, redirect,  params }) {
            var _this = this;
            let {data} = await $axios.get('/basic');
            store.dispatch('setBasicData', data);

            await $axios.get(`user/paynow/${params.pay}`)
                .then(res => {
                    store.dispatch('setDepositPaymentData', res.data)
                })
                .catch(err =>{
                    console.log(err)
                });


        },
        computed: {
            ...mapState(['depositPayment','basic']),
        },
        mounted(){
            var _this= this;
            if(this.$store.state.depositPayment.view == "manual"){
                var parameter_keys = this.$store.state.depositPayment.parameter_keys;
                _this.form = {};
                for (var i =0; i <parameter_keys.length; i++){
                    _this.form[parameter_keys[i]] = ''
                }
            }
        },
        methods: {
            async submit() {
                var _this = this;
                var trx =  this.$store.state.depositPayment.deposit.trx;

                await this.$axios.$post(`user/manualConfirm/${trx}`,this.form)
                    .then(res => {
                        if (res.result == 'success') {
                            return _this.$router.push('/user/depositLog')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        }

    }
</script>
