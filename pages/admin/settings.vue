<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Settings</h2>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12">

                    <div class="card bg-dark">

                        <div class="card-body darcula-bg">

                            <form @submit.prevent="submit">
                                <div class="row">
                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Site Title</label>
                                            <input type="text" v-model="form.site_title" class="form-control">
                                            <span class="text-danger" v-if="errors.site_title">{{errors.site_title[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Currency</label>
                                            <input type="text" v-model="form.currency" class="form-control">
                                            <span class="text-danger" v-if="errors.currency">{{errors.currency[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Currency Symbol</label>
                                            <input type="text" v-model="form.currency_symbol"  class="form-control">
                                            <span class="text-danger"
                                                  v-if="errors.currency_symbol">{{errors.currency_symbol[0]}}</span>
                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Bet Win charge</label>
                                            <div class="input-group ">
                                                <input type="text" v-model="form.win_charge" class="form-control">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger" v-if="errors.win_charge">{{errors.win_charge[0]}}</span>
                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Refund charge</label>
                                            <div class="input-group ">
                                                <input type="text" v-model="form.refund_charge" class="form-control">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger" v-if="errors.refund_charge">{{errors.refund_charge[0]}}</span>
                                        </div>
                                    </div>




                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Paginate (Per Page)</label>
                                            <input type="text" v-model="form.paginate" class="form-control">
                                            <span class="text-danger" v-if="errors.paginate">{{errors.paginate[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Club commission Status</label>
                                            <select v-model="form.club_commission_status" class="form-control">
                                                <option v-for="status in statuses" v-bind:value="status.value">
                                                    {{status.text}}
                                                </option>
                                            </select>
                                            <span class="text-danger"
                                                  v-if="errors.club_commission_status">{{errors.club_commission_status[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Club commission</label>
                                            <div class="input-group ">
                                                <input type="text" v-model="form.club_commission" class="form-control">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger" v-if="errors.club_commission">{{errors.club_commission[0]}}</span>
                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Referral commission Status</label>
                                            <select v-model="form.referral_commission_status" class="form-control">
                                                <option v-for="status in statuses" v-bind:value="status.value">
                                                    {{status.text}}
                                                </option>
                                            </select>
                                            <span class="text-danger"
                                                  v-if="errors.referral_commission_status">{{errors.referral_commission_status[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Referral commission</label>
                                            <div class="input-group ">
                                                <input type="text" v-model="form.referral_commission" class="form-control">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger" v-if="errors.referral_commission">{{errors.referral_commission[0]}}</span>
                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Bet Win charge</label>
                                            <div class="input-group ">
                                                <input type="text" v-model="form.win_charge" class="form-control">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger" v-if="errors.win_charge">{{errors.win_charge[0]}}</span>
                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Minimum Transfer</label>
                                            <div class="input-group ">
                                                <input type="text" v-model="form.min_transfer" class="form-control">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">{{basic.currency}}</span>
                                                </div>
                                            </div>
                                            <span class="text-danger" v-if="errors.min_transfer">{{errors.min_transfer[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Maximum Transfer</label>
                                            <div class="input-group ">
                                                <input type="text" v-model="form.max_transfer" class="form-control">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">{{basic.currency}}</span>
                                                </div>
                                            </div>
                                            <span class="text-danger" v-if="errors.max_transfer">{{errors.max_transfer[0]}}</span>
                                        </div>
                                    </div>




                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Transfer charge</label>
                                            <div class="input-group ">
                                                <input type="text" v-model="form.transfer_charge" class="form-control">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger" v-if="errors.transfer_charge">{{errors.transfer_charge[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>Pusher Notification Status</label>
                                            <select v-model="form.push_notification" class="form-control">
                                                <option v-for="status in statuses" v-bind:value="status.value">
                                                    {{status.text}}
                                                </option>
                                            </select>
                                            <span class="text-danger"
                                                  v-if="errors.push_notification">{{errors.push_notification[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success btn-block mt-3">Update
                                            </button>
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
                title: 'heeraexchange.in | Settings',
            }
        },
        data(){
            return {
                form:{
                    site_title:'',
                    min_transfer:'',
                    max_transfer:'',
                    transfer_charge:'',
                    currency:'',
                    currency_symbol:'',
                    fraction_number:'',
                    win_charge:'',
                    refund_charge:'',
                    paginate:'',
                    club_commission_status:'',
                    club_commission:'',
                    referral_commission_status:'',
                    referral_commission:'',
                    push_notification:''
                },
                statuses: [
                    {text: 'Active', value: 1},
                    {text: 'DeActive', value: 0}
                ],
            }
        },
        mounted(){
            this.form.site_title = this.basic.site_title;
            this.form.min_transfer = this.basic.min_transfer;
            this.form.max_transfer = this.basic.max_transfer;
            this.form.transfer_charge = this.basic.transfer_charge;

            this.form.currency = this.basic.currency;
            this.form.currency_symbol = this.basic.currency_symbol;
            this.form.win_charge = this.basic.win_charge;
            this.form.refund_charge = this.basic.refund_charge;
            this.form.paginate = this.basic.paginate;
            this.form.club_commission_status = this.basic.club_commission_status;
            this.form.club_commission = this.basic.club_commission;
            this.form.referral_commission_status = this.basic.referral_commission_status;
            this.form.referral_commission = this.basic.referral_commission;
            this.form.push_notification = this.basic.push_notification;
        },

        computed: {
            ...mapState(['basic'])
        },
        async asyncData({$axios, store,redirect}){
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
                await this.$axios.$post('basicUpdate', this.form)
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