<template>

    <div>
        <header>
            <div class="chancer-container">
                <div class="nav-container">
                    <!-- Site Logo -->
                    <div class="site-logo">
                        <NuxtLink to="/" class="bg-transparent">
                            <img src="~/assets/img/logo.png" alt="Chancer">
                        </NuxtLink>
                    </div>

                    <!-- navigation -->
                    <div class="site-navigation">
                        <ul class="main-nav">
                            <li v-if="!$auth.user ">
                                <a href="javascript:void(0)"></a>
                            </li>

                            <li v-if="$auth.user">
                                <NuxtLink to="/" exact>HOME</NuxtLink>
                            </li>


                            <li v-if="$auth.user">
                                <a href="javascript:void(0)">{{user.username}} ({{user.balance}}{{basic.currency_symbol}})</a>
                            </li>

                            <li v-if="$auth.user && ($auth.user.isClub == 0)">
                                <NuxtLink to="/bet-slip" exact>BET SLIP</NuxtLink>
                            </li>



                            <li v-if="$auth.user && ($auth.user.isClub == 0)">
                                <NuxtLink to="/user/my-prediction" exact>BET LOG</NuxtLink>
                            </li>

                            <li v-if="$auth.user">
                                <a href="javascript:void(0)">DEPOSIT </a>
                                <ul class="submenu">
                                    <li> <NuxtLink to="/user/deposit" exact>DEPOSIT NOW</NuxtLink></li>
                                    <li> <NuxtLink to="/user/depositLog" exact>DEPOSIT LOG</NuxtLink></li>
                                </ul>
                            </li>

                            <li v-if="$auth.user">
                                <a href="javascript:void(0)">WITHDRAW</a>
                                <ul class="submenu">
                                    <li> <NuxtLink to="/user/withdraw" exact>WITHDRAW NOW</NuxtLink></li>
                                    <li> <NuxtLink to="/user/withdrawLog" exact>WITHDRAW LOG</NuxtLink></li>
                                </ul>
                            </li>

                            <li v-if="$auth.user">
                                <a href="javascript:void(0)">PROFILE</a>
                                <ul class="submenu">
                                    <li> <NuxtLink to="/user/profile" exact>PROFILE SETTING</NuxtLink></li>
                                    <li> <NuxtLink to="/user/moneyTransfer" exact>MONEY TRANSFER</NuxtLink></li>
                                    <li> <NuxtLink to="/user/transactions" exact>TRANSACTION</NuxtLink></li>
                                    <li> <NuxtLink to="/user/commissions" exact>COMMISSIONS</NuxtLink></li>
                                    <li v-if="$auth.user.isClub == 1"> <NuxtLink to="/user/clubMember" exact>CLUB MEMBER</NuxtLink></li>
                                    <li v-if="$auth.user.isClub == 1"> <NuxtLink to="/user/clubMemberLog" exact>CLUB MEMBER LOG</NuxtLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!-- Nav buttons -->
                    <div class="navbar-right">
                        <div v-if="!$auth.user" class="nav-buttons">
                            <NuxtLink to="/"  class="register-btn mobile-menu-close">HOME</NuxtLink>
                            <NuxtLink to="/bet-slip"  class="register-btn mobile-menu-close">BET SLIP</NuxtLink>
                            <NuxtLink to="/registration" class="register-btn mobile-menu-close">REGISTER</NuxtLink>
                            <NuxtLink to="/login" class="login-btn text-dark mobile-menu-close"><i class="far fa-user"></i>LOGIN</NuxtLink>
                        </div>
                        <div v-else class="nav-buttons">
                            <NuxtLink v-if="$auth.user && ($auth.user.isAdmin == 1)"  to="/admin" class="register-btn">Admin Panel
                            </NuxtLink>
                            <a @click="logoutModal" href="javascript:void(0)" class="login-btn"><i
                                    class="far fa-sign-out"></i>LOGOUT</a>
                        </div>
                        <!-- Navbar Toggler -->
                        <div class="navbar-toggler">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
                <!-- Panel Menu -->
                <div class="mobile-menu">
                    <!-- Close Icon -->
                    <a href="javascript:void(0)" class="navbar-close">
                        <i class="fal fa-times"></i>
                    </a>
                    <!-- Site Logo -->
                    <div class="site-logo">
                        <NuxtLink to="/" class="bg-transparent">
                            <img src="~/assets/img/logo.png" alt="Chancer">
                        </NuxtLink>
                    </div>
                    <!-- Mobile Menu -->
                    <ul class="main-nav">
                        <li>
                            <NuxtLink to="/" exact class="mobile-menu-close">HOME</NuxtLink>
                        </li>


                        <li v-if="$auth.user">
                            <a href="javascript:void(0)">{{user.username}} ({{user.balance}}{{basic.currency_symbol}})</a>
                        </li>

                        <li v-if="$auth.user && ($auth.user.isClub == 0)">
                            <NuxtLink to="/user/my-prediction" exact class="mobile-menu-close">BET LOG</NuxtLink>
                        </li>


                        <li v-if="$auth.user && ($auth.user.isClub == 0)">
                            <NuxtLink to="/bet-slip" exact class="mobile-menu-close">BET SLIP</NuxtLink>
                        </li>


                        <li v-if="$auth.user ">
                            <a href="javascript:void(0)">DEPOSIT</a>
                            <ul class="submenu">
                                <li> <NuxtLink to="/user/deposit" exact class="mobile-menu-close">DEPOSIT NOW</NuxtLink></li>
                                <li> <NuxtLink to="/user/depositLog" exact class="mobile-menu-close">DEPOSIT LOG</NuxtLink></li>
                            </ul>
                        </li>

                        <li v-if="$auth.user ">
                            <a href="javascript:void(0)">WITHDRAW</a>
                            <ul class="submenu">
                                <li> <NuxtLink to="/user/withdraw" exact class="mobile-menu-close">WITHDRAW NOW</NuxtLink></li>
                                <li> <NuxtLink to="/user/withdrawLog" exact class="mobile-menu-close">WITHDRAW LOG</NuxtLink></li>
                            </ul>
                        </li>


                        <li v-if="$auth.user ">
                            <a href="javascript:void(0)">PROFILE</a>
                            <ul class="submenu">
                                <li> <NuxtLink to="/user/profile" exact class="mobile-menu-close">PROFILE SETTING</NuxtLink></li>
                                <li> <NuxtLink to="/user/moneyTransfer" exact class="mobile-menu-close">MONEY TRANSFER</NuxtLink></li>
                                <li> <NuxtLink to="/user/transactions" exact class="mobile-menu-close">TRANSACTION</NuxtLink></li>
                                <li> <NuxtLink to="/user/commissions" exact class="mobile-menu-close">COMMISSIONS</NuxtLink></li>
                                <li v-if="user.isClub == 1"> <NuxtLink to="/user/clubMember" exact class="mobile-menu-close">CLUB MEMBER</NuxtLink></li>
                                <li v-if="user.isClub == 1"> <NuxtLink to="/user/clubMemberLog" exact class="mobile-menu-close">CLUB MEMBER LOG</NuxtLink></li>
                            </ul>
                        </li>


                        <li v-if="$auth.user && ($auth.user.isAdmin == 1)" >
                            <NuxtLink to="/admin" exact >ADMIN PANEL</NuxtLink>
                        </li>
                    </ul>

                    <div v-if="$auth.user " class="nav-buttons mobile-menu-close">
                        <a href="javascript:void(0)"  @click="logoutModal" class="login-btn"><i class="far fa-sign-out"></i>LOGOUT</a>
                    </div>
                    <div v-else class="nav-buttons">
                        <NuxtLink to="/registration" class="register-btn mobile-menu-close">REGISTER</NuxtLink>
                        <NuxtLink to="/login" class="login-btn text-dark mobile-menu-close"><i class="far fa-user"></i>LOGIN</NuxtLink>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<style scoped>
    a.nuxt-link-active {
        font-weight: bold;
    }

    a.nuxt-link-exact-active {
        color: #00c58e;
    }


</style>
<script>
    import  Vue from 'vue'
    export default {
        methods: {
            async logoutModal() {
                await this.$auth.logout(/* .... */)

                Vue.$toast.open({
                    message: 'Logout Successfully',
                    type: 'success',
                    position: 'top-right'
                });
            }
        },
        mounted(){

        }

    }
</script>