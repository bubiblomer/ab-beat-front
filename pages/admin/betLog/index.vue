<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Bet History</h2>
                    </div>

                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Prediction Amount</th>
                            <th scope="col">Ratio</th>
                            <th scope="col">Return Amount</th>
                            <th scope="col">Prediction Type</th>
                            <th scope="col">Details</th>
                            <th scope="col">Result</th>
                            <th scope="col">Time</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in betInvestors">
                            <th data-label="#">{{++index}}</th>
                            <td data-label="Username">
                                <nuxt-link :to="{name: 'admin-user-id', params:{id: item.user.id }}">
                                    {{item.user.username}}
                                </nuxt-link>
                            </td>
                            <td data-label="Prediction Amount">{{item.invest_amount}}</td>
                            <td data-label="Ratio">{{item.ratio}}</td>
                            <td data-label="Return Amount">{{item.return_amount}}</td>

                            <td data-label="Prediction Type">
                                <span :class="(item.isMultiBet == 1)? 'badge badge-primary': 'badge badge-success'">{{(item.isMultiBet == 1)? 'Multiple': 'Single'}}</span>
                            </td>

                            <td data-label="Details">
                                <button class="btn btn-sm btn-warning text-white ml-2"
                                        @click="moreInfo(item)">
                                    <i class="fa fa-info-circle"></i>
                                </button>
                            </td>

                            <td data-label="Result">
                                <button v-if="item.status == 0"
                                        @click="selectData(item)"
                                        type="button" class="btn  btn-info btn-round btn-sm"
                                        title="Refund">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                                <span v-else-if="item.status != 0"
                                      :class="item.status_color">{{item.status_text}}</span>


                            </td>

                            <td  data-label="Time">{{item.time}}</td>
                        </tr>
                        </tbody>
                    </table>

                    <nav class="my-4  justify-content-between align-items-start d-flex "
                         aria-label="Page navigation example">
                        <ul class="pagination  mr-auto ">
                            <li class="page-item" v-for="(key, value) in pageLinks"
                                :class="{disabled: key.url == null, active: key.active == true}">
                                <a href="javascript:void(0)" @click="loadMore(key.url)"
                                   class="page-link" v-html="key.label"></a>
                            </li>
                        </ul>
                    </nav>

                </div>

            </div>
        </div>

        <!--Refund Modal Start-->
        <div v-if="makeRefundModal" @close="makeRefundModal = false" class="modal " id="refundModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  ">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">Refund Amount</h5>
                        <button type="button" class="close text-white" @click="makeRefundModal = false"
                                data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <p class="text-white">Are you want to Refund this?</p>
                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-success " type="button"
                                @click.prevent="refundConfirm">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>




        <div v-if="infoModal" @close="infoModal = false" class="modal information-modal" id="infoModal"
             style="display: block;overflow-y:auto;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content darcula-bg">
                    <div class="modal-header">
                        <h5 class="modal-title">Information</h5>
                        <button type="button" class="close" @click="infoModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>

                    <div class="modal-body text-left ">
                        <ul v-if="singleInformation.isMultiBet == 0" class="list-group ">
                            <li  class="list-group-item darcula-bg text-white justify-content-between">Match : <span class="text-right">{{singleInformation.match.name}}</span></li>
                            <li  class="list-group-item darcula-bg text-white justify-content-between">Question : <span class="text-right">{{singleInformation.question_name}}</span></li>
                            <li  class="list-group-item darcula-bg text-white justify-content-between">Threat : <span class="text-right">{{singleInformation.option_name}}</span></li>
                        </ul>

                        <table v-if="singleInformation.isMultiBet == 1" class="table text-white">
                            <thead>
                            <tr>
                                <th scope="col">Match</th>
                                <th scope="col">Question</th>
                                <th scope="col">Threat</th>
                                <th scope="col">Ratio</th>
                                <th scope="col">Result</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(infoVal, infokey) in moreInformation">
                                <td data-label="Match"> {{infoVal.match_name}}</td>
                                <td data-label="Question">{{infoVal.question_name}}</td>
                                <td data-label="Threat">{{infoVal.option_name}}</td>
                                <td data-label="Ratio">{{infoVal.ratio}}</td>
                                <td data-label="Result">
                                    <span v-if="infoVal.status == '1'" class="badge badge-warning"> Pending</span>
                                    <span v-else-if="infoVal.status == '2'" class="badge badge-success"> Win</span>
                                    <span v-else-if="infoVal.status == '0'" class="badge badge-primary"> DeActive</span>
                                    <span v-else-if="infoVal.status == '-2'" class="badge badge-danger"> Lose</span>
                                    <span v-else-if="infoVal.status == '3'" class="badge badge-info">Refunded </span>
                                    <span v-else class="badge badge-info"> Processing</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-dark btn-sm" type="button" @click="infoModal = false">Close</button>
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
                title: 'heeraexchange.in  | Predictor List',
            }
        },
        data() {
            return {
                makeRefundModal: false,
                beInvestId: '',
                infoModal: false,
                singleInformation:{},
                moreInformation:{},
            }
        },
        computed: {
            ...mapState(['betInvestors','pageLinks', 'pageMeta']),
        },
        async asyncData({$axios, store, redirect, params}) {
            await $axios.get('/adminBetLog')
                .then(res => {

                    store.dispatch('setBetInvestorsData', res.data.data);


                    store.dispatch("setPageLinksData", res.data.links);
                    let meta = {
                        per_page: res.data.per_page,
                        current_page: res.data.current_page,
                    };
                    store.dispatch('setPageMetaData', meta);

                }).catch(err => {
                });

        },
        methods: {
            async loadMore(key) {
                const {data, links, per_page, current_page} = await this.$axios.$get(key);
                this.$store.dispatch('setBetInvestorsData', data);
                this.$store.dispatch('setPageLinksData', links);
                let meta = {
                    per_page,
                    current_page
                };
                this.$store.dispatch('setPageMetaData', meta);
            },

            selectData(obj) {
                this.beInvestId = obj.id;
                this.makeRefundModal = true;
            },
            async refundConfirm() {
                this.makeRefundModal = false;
                await this.$axios.$post('/adminMakeRefund', {id: this.beInvestId})
                    .then(res => {

                        if(res.errors){
                            Vue.$toast.open({
                                message: ''+res.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }else {
                            Vue.$toast.open({
                                message: 'Amount has been Refund',
                                type: 'success',
                                position: 'top-right'
                            });
                            var list = this.betInvestors;
                            const result = list.map(function (obj) {
                                if (obj.id == res.invest.id) {
                                    obj = res.invest
                                }
                                return obj
                            });
                            this.$store.dispatch('setBetInvestorsData', result);
                        }
                    })
                    .catch(err => {
                    });
            },
            moreInfo(data) {
                this.infoModal = true;
                this.singleInformation = data;
                this.moreInformation = data.details;
            },

        }
    }
</script>
