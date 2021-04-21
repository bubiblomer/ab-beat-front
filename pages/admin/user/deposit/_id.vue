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
                                <h5 class="">Deposit Log</h5>
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
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(trans, index) in userDeposits">
                                        <td data-label="#"> {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}
                                        </td>


                                        <td data-label="TRX">
                                            {{trans.trx}}
                                        </td>
                                        <td data-label="Payment Method">
                                            {{trans.payment_method}}
                                        </td>

                                        <td data-label="Amount">
                                            <strong> {{trans.amount}}</strong>
                                        </td>

                                        <td data-label="Status">
                                            <span :class="trans.status_color"> {{trans.status_msg}}</span>
                                        </td>
                                        <td data-label="Date">{{trans.created_at}}</td>
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
                userDeposits: [],
                links: [],
                meta: [],
                serial: 0
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
            let  res = await $axios.get('/adminSingleUserDepositLog/' + params.id);

            store.dispatch('setAdminSingleUserData', res.data.user);
            return {
                userDeposits: res.data.deposits.data,
                links: res.data.deposits.links,
                meta: {
                    per_page: res.data.deposits.per_page,
                    current_page: res.data.deposits.current_page
                }
            }
        },
        methods: {
            async loadMore(key) {
                let {deposits} = await this.$axios.$get(key);
                this.userDeposits = deposits.data;
                this.links = deposits.links;
                this.meta.per_page = deposits.per_page;
                this.meta.current_page = deposits.current_page
            }
        }

    }
</script>
