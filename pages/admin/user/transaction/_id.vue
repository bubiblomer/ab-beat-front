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
                                <h5 class="">Transaction History</h5>
                            </div>
                            <div class="card-body darcula-bg">


                                <table class="table table-dark">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Charge</th>
                                        <th scope="col">Remaining Balance</th>
                                        <th scope="col">Details</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(trans, index) in userTransactions">
                                        <td data-label="#">
                                            {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}
                                        </td>

                                        <td data-label="Amount">
                                            <strong :class="trans.text_color"> {{trans.type}}{{trans.amount}} </strong>
                                        </td>
                                        <td data-label="Charge">{{trans.charge}}
                                        </td>

                                        <td data-label="Remaining Balance">
                                            <strong> {{trans.main_amo}} </strong>
                                        </td>

                                        <td data-label="Details" v-html="trans.title"></td>
                                        <td data-label="Time">{{trans.created_at}}</td>
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
        data() {
            return {
                userTransactions: [],
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
            let  res = await $axios.get('/adminSingleUserTrx/' + params.id);

            store.dispatch('setAdminSingleUserData', res.data.user);
            return {
                userTransactions: res.data.transactions.data,
                links: res.data.transactions.links,
                meta: {
                    per_page: res.data.transactions.per_page,
                    current_page: res.data.transactions.current_page
                }
            }
        },
        methods: {
            async loadMore(key) {
                let {transactions} = await this.$axios.$get(key);
                this.userTransactions = transactions.data;
                this.links = transactions.links;
                this.meta.per_page = transactions.per_page;
                this.meta.current_page = transactions.current_page
            }
        }

    }
</script>
