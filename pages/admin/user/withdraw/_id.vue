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
                                <h5 class="">Withdraw Log</h5>
                            </div>
                            <div class="card-body darcula-bg">


                                <table class="table table-dark">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">TRX</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Info</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(trans, index) in userWithdrawals">
                                        <td data-label="#"> {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}
                                        </td>


                                        <td data-label="TRX">
                                            {{trans.transaction_id}}
                                        </td>
                                        <td data-label="Payment Method">
                                            {{trans.method}}
                                        </td>

                                        <td data-label="Amount">
                                            <strong> {{trans.amount}}</strong>
                                        </td>

                                        <td data-label="Status">
                                            <span :class="trans.status_color"> {{trans.status_msg}}</span>
                                        </td>
                                        <td data-label="Date">{{trans.created_at}}</td>

                                        <td data-label="Info">
                                            <button type="button" class="btn btn-sm btn-info"
                                                    @click="withdrawInfo(trans)">
                                                <i class="fa fa-info-circle"></i>
                                            </button>
                                        </td>

                                    </tr>


                                    </tbody>
                                </table>

                                <nav class="my-4  justify-content-between align-items-start d-flex "
                                     aria-label="Page navigation example">

                                    <ul class="pagination  mr-auto " v-if="0 < links.length">
                                        <li class="page-item" v-for="(key, value) in links"
                                            :class="{disabled: key.url == null,active: key.active == true}">
                                            <a href="javascript:void(0)" @click="loadMore(key.url)" class="page-link"
                                               v-html="key.label">
                                            </a>
                                        </li>
                                    </ul>

                                </nav>


                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>


        <div v-if="infoModal" @close="infoModal = false" class="modal sport-modal" id="infoModal"
             style="display: block;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog ">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title">Withdraw Information</h5>
                        <button type="button" class="close" @click="infoModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>

                    <div class="modal-body text-left ">
                        <ul class="list-group ">
                            <li v-for="(infoVal, infokey) in (withdrawInformation)"
                                class="list-group-item darcula-bg text-white justify-content-between">{{infokey}} : <span class="text-right">{{infoVal.field_name}}</span></li>
                        </ul>


                        <div class="card mt-2 darcula-bg" v-if="adminReply">
                            <div class="card-header">
                                <h6 class="card-title">Admin Replied</h6>
                            </div>
                            <div class="card-body">
                                <p class="text-white" v-html="adminReply"></p>
                            </div>
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
                infoModal: false,
                userWithdrawals: [],
                links: [],
                meta: [],
                adminReply: '',
                withdrawInformation: {},
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
            let res = await $axios.get('/adminSingleUserWithdrawLog/' + params.id);

            store.dispatch('setAdminSingleUserData', res.data.user);
            return {
                userWithdrawals: res.data.withdrawals.data,
                links: res.data.withdrawals.links,
                meta: {
                    per_page: res.data.withdrawals.per_page,
                    current_page: res.data.withdrawals.current_page
                }
            }
        },
        methods: {
            async loadMore(key) {
                let {withdrawals} = await this.$axios.$get(key);
                this.userWithdrawals = withdrawals.data;
                this.links = withdrawals.links;
                this.meta.per_page = withdrawals.per_page;
                this.meta.current_page = withdrawals.current_page
            },
            withdrawInfo(data) {
                this.infoModal = true;
                this.adminReply = data.admin_reply;
                this.withdrawInformation = data.withdraw_information;
            }

        }

    }
</script>
