<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Dashboard</h2>
                    </div>
                </div>
            </div>
            <div class="row text-center">

                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Total User</h5>
                            <p class="card-text">{{adminDashboard.totalUser}}</p>
                        </div>
                    </div>
                </div>


                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Active User</h5>
                            <p class="card-text">{{adminDashboard.activeUser}}</p>
                        </div>
                    </div>
                </div>


                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Club Members</h5>
                            <p class="card-text">{{adminDashboard.clubMembers}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Total Admin</h5>
                            <p class="card-text">{{adminDashboard.adminMembers}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Total User Balance</h5>
                            <p class="card-text">{{adminDashboard.totalUserBalance}}</p>
                        </div>
                    </div>
                </div>



                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Payment Gateway</h5>
                            <p class="card-text">{{adminDashboard.paymentGateway}}</p>
                        </div>
                    </div>
                </div>


                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Pending Payment</h5>
                            <p class="card-text">{{adminDashboard.pendingPayment}}</p>
                        </div>
                    </div>
                </div>


                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Withdraw Method</h5>
                            <p class="card-text">{{adminDashboard.withdrawMethod}}</p>
                        </div>
                    </div>
                </div>


                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Withdraw Request</h5>
                            <p class="card-text">{{adminDashboard.withdrawRequest}}</p>
                        </div>
                    </div>
                </div>




            </div>

            <div class="row text-center text-capitalize">
                <div class="col-md-12">
                    <h4 class="text-left my-3">Financial Statistics</h4>
                </div>



                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Today Invest</h5>
                            <p class="card-text">{{adminDashboard.betInvests.invest_today}} {{adminDashboard.base_currency}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Today  Return</h5>
                            <p class="card-text">{{adminDashboard.betInvests.return_today}} {{adminDashboard.base_currency}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Last Day Invest</h5>
                            <p class="card-text">{{adminDashboard.betInvests.invest_lastday}} {{adminDashboard.base_currency}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Last Days Return</h5>
                            <p class="card-text">{{adminDashboard.betInvests.return_lastday}} {{adminDashboard.base_currency}}</p>
                        </div>
                    </div>
                </div>


                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Last 7 Days Invest</h5>
                            <p class="card-text">{{adminDashboard.betInvests.invest_7_days}} {{adminDashboard.base_currency}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Last 7 Days Return</h5>
                            <p class="card-text">{{adminDashboard.betInvests.return_7_days}} {{adminDashboard.base_currency}}</p>
                        </div>
                    </div>
                </div>



                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Last 30 Days Invest</h5>
                            <p class="card-text">{{adminDashboard.betInvests.invest_30_days}} {{adminDashboard.base_currency}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card text-white darcula-bg  mb-3" >
                        <div class="card-body">
                            <h5 class="card-title">Last 30 Days Return</h5>
                            <p class="card-text">{{adminDashboard.betInvests.return_30_days}} {{adminDashboard.base_currency}}</p>
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
                title: 'heeraexchange.in | Dashboard',
            }
        },
        computed: {
            ...mapState(['adminDashboard'])
        },
        async asyncData({$axios, store,redirect}){
            var _this = this;
            await $axios.get('/dashboard')
                .then(res => {
                    store.dispatch("setAdminDashboardData", res.data);
                }).catch(err => {
                });
        },
        methods: {},

    }
</script>