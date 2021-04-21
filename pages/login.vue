<template>
    <div>
        <Breadcrumb title="Login"></Breadcrumb>


        <!--====== resgister Section Start ======-->
        <section class="resgister-section section-gap">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-10">
                        <div class="resgister-signup-title">
                            <h3 class="title">Welcome Back! </h3>
                            <p>Don't have an account?
                                <NuxtLink to="registration">Sign Up Now!</NuxtLink>
                            </p>
                        </div>
                        <form class="resgister-form" @submit.prevent="userLogin">
                            <div class="input-group mb-30">
                                <label for="username">Email Or Username</label>
                                <input type="text" v-model.trim="login.username" placeholder="Email Or Username" id="username">
                                <span class="text-danger" v-if="errors.username">{{errors.username[0]}}</span>
                                <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
                            </div>
                            <div class="input-group mb-30">
                                <label for="password">Password</label>
                                <input type="password" v-model="login.password" placeholder="Password" id="password">

                                <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
                            </div>
                            <div class="input-group">
                                <button class="main-btn" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <!--====== resgister Section Start ======-->

    </div>
</template>


<style scoped>
    a.login-btn.text-dark.mobile-menu-close.nuxt-link-exact-active.nuxt-link-active {
        background: #f7a516!important;
        color: #000;
    }
</style>

<script>
    import Vue from 'vue'
    import Breadcrumb from '@/components/Breadcrumb'

    export default {
        components: {Breadcrumb},
        head() {
            return {
                title: 'heeraexchange.in | Login',
            }
        },
        data() {
            return {
                login: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            async userLogin() {
                try {
                    await this.$auth.loginWith('local', {data: this.login})
                        .then(res => {
                            this.$auth.setUser(res.data.user);
                            this.$auth.setUserToken(res.data.token);
                            // this.$router.push('/admin');


                            Vue.$toast.open({
                                message: 'Login Successfully',
                                type: 'success',
                                position: 'top-right'
                            });



                            this.$router.push({
                                path: this.$router.query.redirect || "/"
                            });
                        });
                }
                catch (err) {

                }

            }
        }
    }
</script>
