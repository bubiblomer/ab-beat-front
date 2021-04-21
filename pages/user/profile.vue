<template>
    <div>
        <Breadcrumb title="Profile"></Breadcrumb>

        <section class="contact-section-two">
            <div class="chancer-container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="card bg-dark">
                            <div class="card-header section-title media align-items-center justify-content-between">
                                <h4>Profile</h4>
                                <div>
                                    <button class="btn btn-warning text-white" type="button" @click="passwordModal = true">
                                       <i class="fa fa-key"></i> Password Change
                                    </button>
                                </div>
                            </div>
                            <div class="card-body darcula-bg">

                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group disabled">
                                            <label>My Username</label>
                                            <input type="text" ref="mylink"
                                                   class="form-control form-control-lg ref-link-textarea"
                                                   v-model="user.username">
                                        </div>

                                        <div class="form-group disabled">
                                            <label>My Promotion link</label>
                                            <textarea class="form-control form-control-lg ref-link-textarea "
                                                      ref="text">{{refCode}}</textarea>
                                        </div>

                                        <div class="form-group text-center">
                                            <button type="button" class="v-btn theme--light"
                                                    @click.stop.prevent="copyTestingCode">
                                                <div class="v-btn__content btn btn-success p-2">Copy Link</div>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-7">

                                        <form @submit.prevent="submit">

                                            <div class="form-group">
                                                <label>Fullname</label>
                                                <input type="text" v-model="form.name" class="form-control"
                                                       placeholder="Full Name">
                                                <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                                            </div>

                                            <div class="form-group">
                                                <label>Mobile</label>
                                                <input type="text" v-model="form.mobile" class="form-control"
                                                       placeholder="Mobile Number">
                                                <span class="text-danger"
                                                      v-if="errors.mobile">{{errors.mobile[0]}}</span>
                                            </div>

                                            <div class="form-group">
                                                <label>Select Club</label>
                                                <select v-model="form.club_id" class="form-control">
                                                    <option v-for="club in clubs" v-bind:value="club.id">
                                                        {{club.club_name}}
                                                    </option>
                                                </select>
                                                <span class="text-danger"
                                                      v-if="errors.club_id">{{errors.club_id[0]}}</span>
                                            </div>

                                            <div class="form-group">
                                                <button type="submit" class="btn btn-warning btn-block text-white mt-3">Update Profile
                                                </button>
                                            </div>


                                        </form>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <div v-if="passwordModal" @close="passwordModal = false" class="modal sport-modal" id="passwordModal"
             style="display: block;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title">Password Change</h5>
                        <button type="button" class="close" @click="passwordModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>

                    <div class="modal-body text-left">

                        <div class="form-group">
                            <label for="password">Current Password</label>
                            <input type="password" v-model="passwordForm.current_password" class="form-control"
                                   placeholder="*****"
                                   id="password_confirmation">

                            <span class="text-danger"
                                  v-if="errors.current_password">{{errors.current_password[0]}}</span>
                        </div>


                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="passwordForm.password" class="form-control"
                                   placeholder="*****"
                                   id="password">
                            <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
                        </div>

                        <div class="form-group">
                            <label for="password">Confirm Password</label>
                            <input type="password" v-model="passwordForm.password_confirmation" class="form-control"
                                   placeholder="*****">
                        </div>


                        <div class="form-group">
                            <button class="btn btn-warning btn-lg btn-block text-white" type="button"
                                    @click.prevent="changePassword">Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style>


    .ref-link-textarea {
        border: none;
        border-bottom: 1px solid #000;
        border-radius: 0;
        flex: 1 1 auto;
        line-height: 18px;
        max-width: 100%;
        min-height: 32px;
        outline: none;
        padding: 7px 10px 8px;
        width: 100%;
        pointer-events: none;
    }

    .disabled {
        opacity: 0.9;
    }

    .disabled:after {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .v-btn {

        text-transform: none;
        width: 200px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: 2px;
        display: -ms-inline-flexbox;
        display: inline-flex;
        height: 36px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        font-size: 14px;
        font-weight: 500;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin: 6px 8px;
        min-width: 88px;
        outline: 0;
        text-decoration: none;
        -webkit-transition: .3s cubic-bezier(.25, .8, .5, 1), color 1ms;
        transition: .3s cubic-bezier(.25, .8, .5, 1), color 1ms;
        position: relative;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 0 16px;
    }

    .v-btn__content {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: inherit;
        color: inherit;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1 0 auto;
        flex: 1 0 auto;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin: 0 auto;
        position: relative;
        -webkit-transition: .3s cubic-bezier(.25, .8, .5, 1);
        transition: .3s cubic-bezier(.25, .8, .5, 1);
        white-space: nowrap;
        width: inherit;
    }
</style>

<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'

    import {BootstrapVue} from 'bootstrap-vue'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    Vue.use(BootstrapVue);
    import Breadcrumb from '@/components/Breadcrumb'

    export default {
        middleware: 'auth',
        components: {Breadcrumb},
        head() {
            return {
                title: 'heeraexchange.in  | Profile',
            }
        },

        data() {
            return {
                referralLink: ``,
                refCode: '',
                passwordModal: false,
                form: {
                    name: "",
                    mobile: "",
                    club_id: ""
                },
                passwordForm: {
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                },
                statuses: [
                    {text: 'Active', value: 1},
                    {text: 'DeActive', value: 0}
                ]
            }
        },
        computed: {
            ...mapState(['basic', 'clubs'])
        },
        mounted() {
            this.form.name = this.user.name;
            this.form.mobile = this.user.mobile;
            this.form.club_id = this.user.club_id;

            this.referralLink = `registration?r_code=${this.user.username}`;
            if (process.browser) {
                this.refCode = window.location.origin + '/' + this.referralLink;
            } else {
                this.refCode = '';
            }
        },
        async asyncData({$axios, store, redirect, params}) {
            var _this = this;
            await $axios.get('/profile')
                .then(res => {
                    store.dispatch('updateUserData', res.data.user);
                    store.dispatch("setBasicData", res.data.basic);
                    store.dispatch("setClubsData", res.data.clubs);
                }).catch(err => {
                });
        },
        methods: {
            async submit() {
                var _this = this;
                await this.$axios.$post('profileUpdate', this.form)
                    .then(res => {

                        _this.$store.dispatch('updateUserData', res.user);

                        Vue.$toast.open({
                            message: 'Update Successfully',
                            type: 'success',
                            position: 'top-right'
                        });
                    })
                    .catch(err => {
                    });
            },
            async changePassword() {
                var _this = this;
                await this.$axios.$post('passwordUpdate', this.passwordForm)
                    .then(res => {


                        if (res.user) {
                            _this.passwordModal = false;
                            _this.$store.dispatch('updateUserData', res.user);
                            Vue.$toast.open({
                                message: 'Password Has been Changed',
                                type: 'success',
                                position: 'top-right'
                            });
                            _this.passwordForm.current_password = '';
                            _this.passwordForm.password = '';
                            _this.passwordForm.password_confirmation = '';
                        }
                    })
                    .catch(err => {
                    });

            },
            copyTestingCode() {
                this.$refs.text.select();
                document.execCommand('copy');
                try {
                    alert('Copy succeeded');
                } catch (err) {
                    alert('Oops, unable to copy');
                }
            },
        }
    }
</script>
