<template>
    <div>

        <Breadcrumb title="Registration"></Breadcrumb>

        <!--====== Resgister Section Start ======-->
        <section class="resgister-section section-gap">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-10 col-md-10">
                        <div class="resgister-signup-title">
                            <h3 class="title">Let's create your account!</h3>

                        </div>
                        <form class="signup-form" @submit.prevent="submit">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group mb-30">
                                        <label for="name">Fullname</label>
                                        <input type="text" id="name" v-model.trim="form.name" placeholder="Fullname">
                                        <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group mb-30">
                                        <label for="username">Username</label>
                                        <input type="text" id="username" v-model.trim="form.username"
                                               placeholder="Username">
                                        <span class="text-danger" v-if="errors.username">{{errors.username[0]}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group mb-30">
                                        <label for="mobile">Mobile Number</label>
                                        <input type="text" id="mobile" v-model.trim="form.mobile" 
                                               placeholder="Mobile Number">
                                        <span class="text-danger" v-if="errors.mobile">{{errors.mobile[0]}}</span>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group mb-30">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" v-model.trim="form.email" 
                                               placeholder="Email Address">
                                        <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
                                    </div>
                                </div>
                            </div>


                            <div class="row">

                                <div class="col-md-6">
                                    <div class="input-group mb-30">
                                        <label>Select Club</label>


                                        <select v-model="form.club_id">
                                            <option  v-for="club in clubs" v-bind:value="club.id" >{{club.club_name}}</option>
                                        </select>
                                        <span class="text-danger" v-if="errors.club_id">{{errors.club_id[0]}}</span>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group mb-30">
                                        <label for="recommendation_code">Sponsor Name</label>
                                        <input type="text" v-model="form.recommendation_code"
                                               placeholder="Sponsor Name" id="recommendation_code">
                                        <span class="text-danger" v-if="errors.recommendation_code">{{errors.recommendation_code[0]}}</span>
                                    </div>
                                </div>

                            </div>


                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group mb-30">
                                        <label for="password">Password</label>
                                        <input type="password" v-model="form.password" placeholder="*****" 
                                               id="password">
                                        <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group mb-30">
                                        <label for="password">Confirm Password</label>
                                        <input type="password" v-model="form.password_confirmation" placeholder="*****" 
                                               id="password_confirmation">
                                    </div>
                                </div>
                            </div>

                            <div class="input-group mt-2">
                                <button class="main-btn" type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <!--====== Resgister Section Start ======-->

    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    import Vue from 'vue'
    import {mapState} from 'vuex'

    export default {
        components: {Breadcrumb},
        head() {
            return {
                title: 'heeraexchange.in  | Sign Up',
            }
        },
        data() {
            return {
                form: {
                    name: "",
                    username: "",
                    mobile: "",
                    email: "",
                    club_id: "",
                    recommendation_code: "",
                    password: "",
                    password_confirmation: "",
                }
            }
        },

        computed: {
            ...mapState(['clubs']),
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/clubs')
                .then(res => {
                    store.dispatch("setClubsData", res.data);
                })
                .catch(err => {
                });
        },
        mounted() {
            if (this.$router.currentRoute.query['r_code'] != undefined) {
                this.form.recommendation_code = this.$router.currentRoute.query['r_code']
            }

            const self = this;
            $("select").change(function () {
                const val = $(this).find("option:selected").val();
                self.form.club_id = val;
            });

        },

        methods: {
            async submit() {
                var _this = this;
                await this.$axios.$post('register', this.form)
                    .then(data => {
                        this.$auth.loginWith("local", {
                            data: {
                                username: this.form.username,
                                password: this.form.password
                            }
                        }).then(res => {
                            this.$auth.setUser(res.data.user);
                            this.$auth.setUserToken(res.data.token);
                            Vue.$toast.open({
                                message: 'Registration Has Been Successful',
                                type: 'success',
                                position: 'top-right'
                            });

                            this.$router.push('/admin')
                        });


                    })
                    .catch(err => {
                    })


            }
        }
    }
</script>
