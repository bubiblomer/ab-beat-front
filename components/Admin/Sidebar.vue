<template>
    <div>
        <div class="admin-panel-sidebar">
            <div class="panel-logo">
                <nuxtLink to="/">
                    <img src="~/assets/img/logo.png" alt="Chancer">
                </nuxtLink>
            </div>

            <div class="panel-menus">
                <ul class="panel-menu">
                    <li>
                        <nuxtLink to="/admin" exact class="mobile-menu-close">
                            <i class="fas fa-tachometer-alt"></i> Dashboard
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/category" exact class="mobile-menu-close">
                            <i class="fas fa-tree"></i> Manage Category
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/event" exact class="mobile-menu-close">
                            <i class="fas fa-list"></i> Manage Event
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/match" exact class="mobile-menu-close">
                            <i class="fas fa-clipboard-list"></i> Manage Match
                        </nuxtLink>
                    </li>
                    <li>
                        <nuxtLink to="/admin/result" exact class="mobile-menu-close">
                            <i class="far fa-file-alt"></i> Manage Result
                        </nuxtLink>
                    </li>


                    <li>
                        <nuxtLink to="/admin/staff" exact class="mobile-menu-close">
                            <i class="fas fa-users"></i> Admin List
                        </nuxtLink>
                    </li>


                    <li>
                        <nuxtLink to="/admin/user" exact class="mobile-menu-close">
                            <i class="fas fa-users"></i> User List
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/club" exact class="mobile-menu-close">
                            <i class="fas fa-users-cog"></i> Club List
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/betLog" exact class="mobile-menu-close">
                            <i class="fas fa-hand-holding-usd"></i> Bet History
                        </nuxtLink>
                    </li>


                </ul>
                <h4 class="panel-menus-title">Payment Setting</h4>
                <ul class="panel-menu">
                    <li>
                        <nuxtLink to="/admin/gateway" exact class="mobile-menu-close">
                            <i class="far fa-credit-card"></i>Payment Gateway
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/payment" exact class="mobile-menu-close">
                            <i class="far fa-money-check-alt"></i>Payment Log
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/payment/pending" exact class="mobile-menu-close">
                            <i class="fas fa-spinner"></i>Pending Log
                        </nuxtLink>
                    </li>

                </ul>


                <h4 class="panel-menus-title">Withdraw Setting</h4>
                <ul class="panel-menu">
                    <li>
                        <nuxtLink to="/admin/withdraw/pending" exact class="mobile-menu-close">
                            <i class="far fa-hand-holding-usd"></i>Withdraw Request
                        </nuxtLink>
                    </li>
                    <li>
                        <nuxtLink to="/admin/withdraw" exact class="mobile-menu-close">
                            <i class="far fa-money-bill-alt"></i>Withdraw Log
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/withdraw/method" exact class="mobile-menu-close">
                            <i class="far fa-wallet"></i>Withdraw Method
                        </nuxtLink>
                    </li>


                </ul>


                <h4 class="panel-menus-title">Basic Setting</h4>
                <ul class="panel-menu">
                    <li>
                        <nuxtLink to="/admin/settings" exact class="mobile-menu-close">
                            <i class="fas fa-cogs"></i>Charge & Control
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/email-controls" exact class="mobile-menu-close">
                            <i class="fas fa-cogs"></i>Email Controls
                        </nuxtLink>
                    </li>
                    <li>
                        <nuxtLink to="/admin/pusherNotification" exact class="mobile-menu-close">
                            <i class="fas fa-microphone"></i>Push Notification
                        </nuxtLink>
                    </li>

                    <li>
                        <nuxtLink to="/admin/notice" exact class="mobile-menu-close">
                            <i class="fas fa-newspaper"></i>Notice
                        </nuxtLink>
                    </li>
                </ul>

                <h4 class="panel-menus-title">ACCOUNT</h4>
                <ul class="panel-menu">

                    <li>
                        <a @click="logoutModal" href="javascript:void(0)">
                            <i class="fas fa-sign-out-alt"></i>Logout
                        </a>
                    </li>
                </ul>


            </div>
            <a href="javascript:void(0)" class="panel-close">
                <i class="far fa-times"></i>
            </a>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                access: false
            }
        },
        methods: {
            async logoutModal() {
                await this.$auth.logout(/* .... */)
                Vue.$toast.open({
                    message: 'Logout Successfully',
                    type: 'success',
                    position: 'top-right'
                });
            }
        }
    }
</script>