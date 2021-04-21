<template>
    <div>
        <Breadcrumb title="BET SLIP"></Breadcrumb>

        <section class="about-section section-gap">
            <div class="chancer-container-right-fluid">
                <div class="row ">
                    <div class="col-lg-12 col-md-12">
                        <div class="live__matches slip">

                            <div v-for="(option, index) in newSlip" class="match__item bet-slip ">
                                <div class="match__title row justify-content-between d-flex  "
                                     :class="(option.status != 1 || option.question.isExpired == false) ? 'border-danger':''">
                                    <div class="col-md-7 media">
                                        <div class="title__content">
                                            <div class="d-flex mb-1">
                                                <span class="team__name">{{(option.match) ? option.match.team1 : ''}}</span>
                                                <span class="vs mx-2">vs</span>
                                                <span class="team__name">{{(option.match) ? option.match.team2 : ''}}</span>

                                            </div>
                                            <div class="title__content__info">
                                                {{(option.question) ? option.question.name : ''}}
                                            </div>
                                            <div class="title__content__info text-white">
                                            </div>
                                        </div>

                                        <small v-if="option.status != 1 || option.question.isExpired == false" class="badge badge-danger ml-2 remove-badge" @click="removeItem(option)">REMOVE</small>
                                    </div>

                                    <div class="col-md-5 ">
                                        <div class="justify-content-between align-items-center d-flex">
                                            <div class="title__content">
                                                <ul class="match__prediction">
                                                    <li>
                                                        <a href="javascript:void(0)" class="px-2">{{option.option_name}}
                                                            <span class="odd">{{option.ratio}}</span></a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="title__thumb w-25 ml-2">
                                                <button class="btn btn-sm btn-default cross-btn text-danger " @click="removeItem(option)"
                                                        type="button"><i
                                                        class="fa fa-times"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="0 < newSlip.length" class="match__item bet-slip bg-dark">
                                <div class="match__title row justify-content-end d-flex ">
                                    <div class="col-md-6 col-lg-6 col-xl-4">


                                        <ul class="list-group">
                                            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                                                TOTAL ODDS
                                                <span class="text-warning">{{totalOdds}}</span>
                                            </li>

                                            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                                                <span>CHARGE APPLY <small>(IF YOU WIN)</small></span>

                                                <span class="text-warning">{{basic.win_charge}}%</span>
                                            </li>

                                            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent">RETURN AMOUNT
                                                <span class="text-warning font-weight-bold">{{return_amount}} {{basic.currency}}</span>
                                            </li>

                                            <li class="list-group-item d-flex justify-content-end align-items-center bg-transparent">
                                                <div class="stepper-sport d-block">
                                                    <div class="stepper ctrl">
                                                        <div class="ctrl__counter">
                                                            <input class="form-input stepper-input ctrl__counter-input"
                                                                   v-model="form.amount"
                                                                   @keyup="calc(form.amount)"
                                                                   type="number"
                                                                   data-zeros="true"
                                                                   :max="999999">
                                                        </div>
                                                        <span class="stepper-arrow up  ctrl__button  ctrl__button--increment "
                                                              @click="increment()"><i
                                                                class="far fa-plus"></i></span>
                                                        <span class="stepper-arrow down ctrl__button ctrl__button--decrement"
                                                              @click="decrement()"><i
                                                                class="far fa-minus"></i></span>
                                                    </div>
                                                </div>
                                            </li>

                                            <li v-if="errors" class="list-group-item text-right justify-content-end  bg-transparent">
                                                <span class="text-danger" v-if="errors.requestAmount" >{{errors.requestAmount[0]}}</span>
                                                <span class="text-danger" v-if="errors.betOption">{{errors.betOption[0]}}</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-end align-items-center bg-transparent">

                                                <button @click="betPlace" type="button"
                                                        class="btn btn-warning btn-block btn-lg font-weight-bold text-white w-220">
                                                    Place Bet
                                                </button>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="match__item bet-slip bg-dark">
                                <div class="match__title row justify-content-center ">
                                    <div class="col-md-12">
                                        <p>No Data Found</p>
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
<style scoped>
    .match__title{
        cursor: initial;
    }
    .match__prediction li a{
        cursor: initial;
    }
    .remove-badge{
        cursor: pointer;
        font-size: 50%;
    }
    .stepper {
        width: 220px;
        max-width: 220px;
        text-align: center;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
    }

    .stepper input[type="number"] {
        width: 100px;
        height: 60px;
        padding: 0 5px;
        margin-left: auto;
        margin-right: auto;
        line-height: 60px;
        text-align: center;
        -moz-appearance: textfield;
        font-size: 22px;
        font-weight: 400;
        color: #151515;
        background-color: #edeff4;
        border: 0;
    }

    .stepper .stepper-arrow {
        top: 0;
        bottom: 0;
        width: 60px;
        height: 60px;
        margin: 0;
        line-height: 60px;
        color: #fff;
        text-align: center;
        border-radius: 3px;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
        position: absolute;
        background-color: #b47c13;
    }

    .stepper .stepper-arrow.up {
        right: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        display: block;
    }

    .stepper .stepper-arrow.down {
        left: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        display: block;
    }

    .w-220 {
        max-width: 220px;
    }

    .border-danger {
        border: 1px solid #c3414d;
        opacity: 0.7;
    }

</style>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    import Vue from 'vue'
    import {mapState} from 'vuex'

    export default {
        components: {Breadcrumb},
        head() {
            return {
                title: 'heeraexchange.in  | bet slip',
            }
        },
        data() {
            return {
                newSlip:[],
                activeSlip:[],
                totalOdds: 0,
                minimumAmo: 0,
                return_amount: 0,
                form: {
                    amount: ''
                }
            }
        },
        computed: {
            ...mapState(['basic'])
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/basic')
                .then(res => {
                    _this.minimumAmo = res.data.minimum_amount;
                    store.dispatch("setBasicData", res.data);
                })
                .catch(err => {
                });
        },
        mounted(){
            this.getSlip();
        },

        methods: {
            async betPlace() {
                var _this = this;

                if((_this.newSlip.length - _this.activeSlip.length) != 0){
                    Vue.$toast.open({
                        message: 'Please remove indicator marking point',
                        type: 'error',
                        position: 'top-right'
                    });
                    return 0
                }
                await this.$axios.$post('/betSlip', {
                    requestAmount: this.form.amount,
                    activeSlip: this.activeSlip,
                })
                    .then(res => {

                        _this.showModel = false;

                        if (res.errors) {
                            Vue.$toast.open({
                                message: '' + res.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }
                          if (res.success) {
                              localStorage.setItem("newBetSlip", null);
                              _this.getSlip();

                              Vue.$toast.open({
                                  message: '' + res.success,
                                  type: 'success',
                                  position: 'top-right'
                              });
                              this.$auth.setUser(res.user);
                          }

                    })
                    .catch(err => {
                    });
            },
            async getSlip() {
                var _this = this;
                var selectData = JSON.parse(localStorage.getItem('newBetSlip'));
                if(selectData != null){
                    var storeIds = selectData.map((obj) => obj.id);
                }else{
                    storeIds = [0]
                }

                await this.$axios.$get('/slipData', {
                    params: {
                        storeIds: storeIds
                    }
                })
                .then(res => {
                    _this.newSlip = res;
                    _this.activeSlip   = _this.activeSlipData(res);
                    _this.totalOdds =  _this.oddsCalc(_this.activeSlip)
                })
                .catch(err => {
                });
            },
            activeSlipData(res){
                var result = res.filter(function(item) {
                    if (item.status != 1 || item.question.isExpired == false){
                        return false;
                    }
                    return true;
                });
                return result;
            },
            removeItem(obj){
                var _this = this;
                _this.newSlip.splice(_this.newSlip.indexOf(obj),1);
                _this.activeSlip   = _this.activeSlipData(_this.newSlip);
                _this.totalOdds =  _this.oddsCalc(_this.activeSlip)

                var selectData = JSON.parse(localStorage.getItem('newBetSlip'));
                var storeIds = selectData.filter(function(item) {
                    if (item.id === obj.id){
                        return false;
                    }

                    return true;
                });
                localStorage.setItem("newBetSlip", JSON.stringify(storeIds) );
            },
            oddsCalc( obj ) {
                var ratio  = 1;
                for (var property in obj) {
                    ratio *= parseFloat(obj[property].ratio);
                }
                return ratio.toFixed(2);
            },

            decrement() {
                if (this.form.amount > this.minimumAmo) {
                    this.form.amount--;
                    this.return_amount = parseFloat(this.form.amount * this.totalOdds).toFixed(2);

                    return 0;
                }
                return 1;
            },
            increment() {
                this.form.amount++;
                this.return_amount = parseFloat(this.form.amount * this.totalOdds).toFixed(2);

                return 0;
            },
            calc(val) {
                if (isNaN(val)) {
                    val = 0
                }
                if (0 >= val) {
                    val = 0;
                }
                this.return_amount = parseFloat(val * this.totalOdds).toFixed(2);
            },
        }
    }
</script>
