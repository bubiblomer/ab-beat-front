<template>
    <div>

        <Breadcrumb v-if="match" :title="match.event.name"></Breadcrumb>

        <!--====== Sports Tab Start ======-->
        <section class="sports-type-tab section-gap">
            <div class="chancer-container">
                <h1 v-if="!match" class="text-danger text-center">Invalid Request</h1>

                <div v-else-if="match" id="all-sports">
                    <div class="live-match-area">
                        <div class="section-title mb-30">
                            <h2 class="title">Live Match </h2>
                        </div>

                        <div class="live-match-table-wrapper mb-4">

                            <div>
                                <div class="filter-select clearfix">
                                    <b-button v-b-toggle="'collapse-'+match.id">{{match.name}} ({{match.totalQuestion}})
                                        <i class="fal fa-angle-down"></i></b-button>
                                </div>

                                <b-collapse visible :id="'collapse-'+match.id">
                                    <b-card class="live-match-table">
                                        <div v-for="(question, index) in match.questions" class="single-match">
                                            <div class="sports-icon" v-html="match.category.icon">
                                            </div>
                                            <div class="event-teams-info">
                                                <h4 class="event-title">{{question.name}} </h4>
                                            </div>
                                            <div class="table-wager-buttons">

                                                <a v-for="(option) in question.options"
                                                   href="javascript:void(0)"
                                                   class="table-wager-button"
                                                   @click="selectOption(option)">
                                                    <h6 class="wager-title">{{option.option_name}}</h6>
                                                    <span class="wager-count">{{option.ratio}}</span>
                                                </a>

                                            </div>
                                        </div>

                                    </b-card>
                                </b-collapse>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
        <!--====== Sports Tab End ======-->


        <div v-if="showModel" @close="showModel = false" class="modal sport-modal" id="myModal" style="display: block;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content ">
                    <div class="modal-header">
                        <h5 class="modal-title">Placing a bet</h5>
                        <button type="button" class="close" @click="showModel = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body" v-if="selectedData">
                        <p class="modal-sport-wager-title">
                            <span class="modal-sport-wager" v-html="selectedData.option_name"></span>
                            <span class="modal-sport-wager-count" v-html="selectedData.ratio"></span>
                        </p>
                        <p class="modal-sport-confrontation" v-html="selectedData.question_name"></p>
                        <div class="stepper-sport ">
                            <div class="stepper ctrl">
                                <div class="ctrl__counter">
                                    <input class="form-input stepper-input ctrl__counter-input" type="number"
                                           data-zeros="true" v-model="form.amount" @keyup="calc(form.amount)"
                                           :min="selectedData.minimum_amount"
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


                        <span class="text-danger" v-if="errors.requestAmount">{{errors.requestAmount[0]}}</span>
                        <span class="text-danger" v-if="errors.betOption">{{errors.betOption[0]}}</span>
                    </div>

                    <div class="modal-footer">
                        <p class="modal-sport-bets">
                            <span class="modal-sport-bets-left">Minimum Amount of Bet</span>
                            <span class="modal-sport-bets-right">{{minimumAmo}}{{basic.currency_symbol}}</span>
                        </p>

                        <p class="modal-sport-stake">
                            <span class="modal-sport-stake-left">Charge Apply <small> (IF YOU WIN) </small></span>
                            <span class="modal-sport-stake-right">{{basic.win_charge}}%</span>
                        </p>
                        <p class="modal-sport-win">
                            <span class="modal-sport-win-left">RETURN AMOUNT</span>
                            <span class="modal-sport-win-right">{{ratio}}{{basic.currency_symbol}}</span>
                        </p>
                        <button class="modal-sport-place" type="button" @click.prevent="submitPeriodForm(form)">place
                            bet
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

    import Vue from 'vue'
    import {mapState} from 'vuex'
    import {BootstrapVue} from 'bootstrap-vue'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import Breadcrumb from '@/components/Breadcrumb'

    Vue.use(BootstrapVue);

    export default {

        components: {Breadcrumb},
        head() {
            return {
                title: 'heeraexchange.in  | ' + this.$route.params.slug,
            }
        },
        created() {
        },
        data() {
            return {
                showModel: false,
                tabIndex: 0,
                form: {
                    amount: '',
                },
                minimumAmo: '',
                ratio: 0,
                selectedData: {}
            }
        },
        validate({params}) {
            return /^\d+$/.test(
                params.id
            )
        },
        computed: {
            ...mapState(['match'])
        },
        async asyncData({$axios, store, redirect, params}) {

            var _this = this;
            await $axios.get('/team/' + params.id)
                .then(res => {
                    store.dispatch('setMatchData', res.data.result);
                    store.dispatch("setBasicData", res.data.basic);

                }).catch(err => {
                });
        },
        methods: {

            selectOption(option) {
                this.selectedData = option;
                this.form.amount = option.minimum_amount;
                this.ratio = parseFloat(option.minimum_amount * option.ratio).toFixed(2);
                this.minimumAmo = option.minimum_amount;
                this.showModel = true
            },
            decrement() {
                if (this.form.amount > this.minimumAmo) {
                    this.form.amount--;
                    this.ratio = parseFloat(this.form.amount * this.selectedData.ratio).toFixed(2);

                    return 0;
                }
                return 1;
            },
            increment() {
                this.form.amount++;
                this.ratio = parseFloat(this.form.amount * this.selectedData.ratio).toFixed(2);
                return 0;
            },
            calc(val) {
                if (isNaN(val)) {
                    val = 0
                }
                if (0 >= val) {
                    val = 0;
                }
                this.ratio = parseFloat(val * this.selectedData.ratio).toFixed(2);
            },
            async submitPeriodForm(form) {
                var _this = this;
                await this.$axios.$post('/betNow', {
                        requestAmount: form.amount,
                        betOption: this.selectedData,
                    })
                    .then(data => {
                        if (data.errors) {
                            Vue.$toast.open({
                                message: '' + data.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }

                        if (data.success) {
                            _this.showModel = false;
                            Vue.$toast.open({
                                message: '' + data.success,
                                type: 'success',
                                position: 'top-right'
                            });
                            this.$auth.setUser(data.user);

                        }

                    })
                    .catch(err => {
                    });
            }

        }

    }
</script>
