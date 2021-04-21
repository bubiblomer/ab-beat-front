<template>
    <div>
        <Breadcrumb title="Withdraw Form"></Breadcrumb>

        <section class="contact-section-two" >
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="section-title p-4 justify-content-between media">
                            <h2 class="title">Withdraw Fund</h2>
                            <NuxtLink to="/user/withdrawLog" class="btn btn-lg btn-warning text-white"><i class="fa fa-list"></i> Withdraw Log</NuxtLink>
                        </div>
                    </div>
                </div>

                <div v-if="errors.message" class="row align-items-center justify-content-center ">
                    <div class="col-md-8">
                        <h1 class="form-text text-danger" v-if="errors.message">{{errors.message[0]}}</h1>
                    </div>
                </div>

                <div v-else class="row align-items-center justify-content-center ">


                    <div class="col-md-12">
                        <div class="card darcula-bg my-3">
                            <div class="card-header">
                                <h3 class="card-title">Withdraw  Via {{withdrawPayment.gateway_name}}</h3>
                            </div>
                            <div class="card-body">



                                <form @submit.prevent="submit">
                                    <div class="row ">

                                        <div class="form-group col-md-12"  v-for="(item, index) in withdrawPayment.gateway_parameter"  >
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
                title: 'heeraexchange.in  | Withdraw Preview',
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

            await $axios.get(`withdrawCalcData/${params.pay}`)
                .then(res => {
                    store.dispatch('setWithdrawPaymentData', res.data)
                })
                .catch(err =>{
                    console.log(err)
                });


        },
        computed: {
            ...mapState(['withdrawPayment','basic']),
        },
        mounted(){
            var _this= this;
            var parameter_keys = this.$store.state.withdrawPayment.parameter_keys;
            _this.form = {};
            for (var i =0; i <parameter_keys.length; i++){
                _this.form[parameter_keys[i]] = ''
            }
        },
        methods: {
            async submit() {
                var _this = this;
                var trx =  this.$store.state.withdrawPayment.withdraw.transaction_id;


                await this.$axios.$post(`withdrawConfirm/${trx}`,this.form)
                    .then(res => {

                        if (res.result == 'error') {
                            Vue.$toast.open({
                                message: ''+res.message,
                                type: 'error',
                                position: 'top-right'
                            });
                        }

                        if (res.result == 'success') {

                            _this.$store.dispatch('updateUserData', res.user);
                            return _this.$router.push('/user/withdrawLog')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        }

    }
</script>
