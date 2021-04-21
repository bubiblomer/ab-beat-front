<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">User: {{adminSingleUser.username}}</h2>
                        <span>Balance {{adminSingleUser.balance}} {{basic.currency}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!--====== Sports Tab Start ======-->
        <section class="sports-type-tab">
            <div class="chancer-container">
                <div class="row">
                    <div class="col-xl-12 col-lg-12">
                        <UserSidebar :adminSingleUser="adminSingleUser"></UserSidebar>
                    </div>
                    <div class="col-xl-12 col-lg-12">
                        <div class="card bg-dark">
                            <div class="card-header section-title media align-items-center justify-content-between">
                                <h5 class="">Bet History</h5>
                            </div>
                            <div class="card-body darcula-bg">
                                <table class="table table-dark">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
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
                                        <tr v-for="(item, index) in myInvests">
                                            <td data-label="#"> {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}
                                            </td>
                                            <td data-label="Prediction Amount">{{item.invest_amount}}</td>
                                            <td data-label="Ratio">{{item.ratio}}</td>
                                            <td data-label="Return Amount">{{item.return_amount}}</td>
                                            <td data-label="Prediction Type">
                                                <span :class="(item.isMultiBet == '1')? 'badge badge-primary': 'badge badge-success'">{{(item.isMultiBet == '1')? 'Multiple': 'Single'}}</span>
                                            </td>


                                            <td data-label="Details">
                                                <button class="btn btn-sm btn-warning text-white ml-2"
                                                        @click="moreInfo(item)">
                                                    <i class="fa fa-info-circle"></i>
                                                </button>
                                            </td>

                                            <td data-label="Result">
                                                <span :class="item.result_color">{{item.result}}</span>
                                            </td>
                                            <td data-label="Time">{{item.time}}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <nav class="my-4  justify-content-between align-items-start d-flex "
                                     aria-label="Page navigation example">
                                    <ul class="pagination  mr-auto " v-if="0 < links.length">
                                        <li class="page-item" v-for="(key, value) in links"
                                            :class="{disabled: key.url == null,active: key.active == true}">
                                            <a href="javascript:void(0)" @click="loadMore(key.url)" class="page-link"
                                               v-html="key.label"></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


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
                            <li  class="list-group-item darcula-bg text-white justify-content-between">Match : <span class="text-right">{{singleInformation.match}}</span></li>
                            <li  class="list-group-item darcula-bg text-white justify-content-between">Question : <span class="text-right">{{singleInformation.question}}</span></li>
                            <li  class="list-group-item darcula-bg text-white justify-content-between">Threat : <span class="text-right">{{singleInformation.threat}}</span></li>
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
    import {BootstrapVue} from 'bootstrap-vue'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import UserSidebar from '@/components/Admin/UserSidebar'
    Vue.use(BootstrapVue);
    export default {
        layout: 'admin',
        components: {UserSidebar},
        head() {
            return {
                title: 'heeraexchange.in | User Details',
            }
        },
        created() {
        },
        data() {
            return {
                myInvests: [],
                links: [],
                meta: [],
                infoModal: false,
                singleInformation:{},
                moreInformation:{}
            }
        },
        validate({params}) {
            return /^\d+$/.test(
                params.id
            )
        },
        mounted() {
        },
        computed: {
            ...mapState(['adminSingleUser'])
        },
        async asyncData({$axios, store, params}) {

            var _this = this;
            let res = await $axios.get('/adminSingleUserBet/' + params.id);


            store.dispatch('setAdminSingleUserData', res.data.user);

            return {
                myInvests: res.data.betLogs.data,
                links: res.data.betLogs.links,
                meta: {
                    per_page: res.data.betLogs.per_page,
                    current_page: res.data.betLogs.current_page
                }
            }
        },
        methods: {
            async loadMore(key) {
                let {betLogs} = await this.$axios.$get(key);
                this.myInvests = betLogs.data;
                this.links = betLogs.links;
                this.meta.per_page = betLogs.per_page;
                this.meta.current_page = betLogs.current_page
            },
            moreInfo(data) {
                this.infoModal = true;
                this.singleInformation = data;
                this.moreInformation = data.details;
            }
        }

    }
</script>
