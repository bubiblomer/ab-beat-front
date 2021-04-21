<template>
    <div>
        <Breadcrumb title="Deposit"></Breadcrumb>

        <section class="contact-section-two" >
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="section-title p-4 justify-content-between media">
                            <h2 class="title">Deposit</h2>
                            <NuxtLink to="/user/depositLog" class="btn btn-warning text-white"><i class="fa fa-list"></i> Deposit Log</NuxtLink>
                        </div>
                    </div>
                </div>

                <div v-if="preview == 0"  class="row justify-content-center mt-3">
                    <div  class="col-md-4" v-for="(gateway, index) in gatewayCurrency">
                        <div class="card mb-4 darcula-bg">
                            <div class="card-body text-center">
                                <h5 class="card-title text-center font-weight-bold"> {{gateway.name}}</h5>
                                <img :src="gateway.image"  class="mx-auto d-block rounded img-thumbnail"/>
                                <ul class="list-group my-2">
                                    <li class="list-group-item bg-dark">Deposit Limit: <span class="text-right">{{gateway.min_amount}} - {{gateway.max_amount}} {{basic.currency}}</span></li>
                                    <li class="list-group-item bg-dark" > Charge : <span class="text-right">{{gateway.fixed_charge}} {{basic.currency}}   {{(0 < gateway.percent_charge) ? `+ ${gateway.percent_charge} %` : ''}} </span></li>
                                </ul>
                                <button type="button" class="btn btn-lg btn-warning text-white btn-block" @click="showModal(gateway.id)">Select</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="preview == 1"  class="row justify-content-center mt-3">
                    <div  class="col-md-12">
                        <div class="card darcula-bg mb-4">
                            <div class="card-header card-base">
                                <h5 class="card-title text-center text-white font-weight-bold">   {{logs.method}} </h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group font-weight-bold text-center">
                                    <li class="list-group-item bg-dark">{{logs.amount}}</li>
                                    <li class="list-group-item bg-dark d-none">{{logs.conversion_rate}}</li>
                                    <li class="list-group-item bg-dark">{{logs.charge}}</li>
                                    <li class="list-group-item bg-dark">{{logs.payable}}</li>
                                    <li class="list-group-item bg-dark">
                                        <NuxtLink :to="{name: 'user-recharge-pay', params:{pay: logs.track }}" class="btn btn-block  btn-lg btn-warning text-white">Pay Now</NuxtLink>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>


        <!--Refund Modal Start-->
        <div v-if="makePaymentModal" @close="makePaymentModal = false" class="modal " id="refundModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  ">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">Deposit Money</h5>
                        <button type="button" class="close text-white" @click="makePaymentModal = false"
                                data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <div class="form-group">
                            <label>Enter Amount </label>
                            <div class="input-group">
                                <input v-model="form.amount" type="text" class="form-control form-control-lg"   placeholder="0.00" >
                                <div class="input-group-prepend">
                                    <span class="input-group-text currency-addon addon-bg">{{basic.currency}}</span>
                                </div>
                            </div>

                            <small class="form-text text-danger" v-if="errors.amount">{{errors.amount[0]}}</small>
                            <small class="form-text text-danger" v-if="errors.gateway_id">{{errors.gateway_id[0]}}</small>
                        </div>
                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-lg btn-warning text-white" type="button" @click.prevent="submitModal">Yes</button>
                    </div>
                </div>
            </div>
        </div>

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
                title: 'heeraexchange.in  | Add Fund',
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
        async asyncData({$axios, store}) {
            var _this = this;
            let {data} = await $axios.get('/basic');
            store.dispatch('setBasicData', data);


            await $axios.get('/payment')
                .then(res => {
                    store.dispatch("setGatewayCurrencyData", res.data)
                })
                .catch(err =>{
                });

        },
        computed: {
            ...mapState(['gatewayCurrency','basic']),
        },
        methods: {
            showModal(gatewayId) {
                this.form.gateway_id =  gatewayId;
                this.makePaymentModal =  true;
            },
            async submitModal() {
                var _this =  this;

                await this.$axios.$post('/user/payment',this.form)
                    .then(data => {
                        console.log(data);

                        if(data.success == true){
                            _this.preview = 1;
                            _this.logs= data.logs
                        }
                        this.makePaymentModal =  false;
                    })
                    .catch(err => {
                        console.log(err);
                    });

            }


        }

    }
</script>
