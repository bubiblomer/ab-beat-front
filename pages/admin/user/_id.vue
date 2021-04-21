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
                                <h5 class="">Profile</h5>
                                <div>
                                    <button class="btn btn-info btn-sm" type="button" @click="passwordModal = true">Password Change</button>
                                    <button class="btn btn-primary btn-sm" type="button" @click="balanceModal = true">Manage Balance</button>
                                </div>
                            </div>
                            <div class="card-body darcula-bg">

                                <form @submit.prevent="submit">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Fullname</label>
                                                <input type="text" v-model="form.name" placeholder="Full Name">
                                                <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Username</label>
                                                <input type="text" v-model="form.username" placeholder="Username">
                                                <span class="text-danger"
                                                      v-if="errors.username">{{errors.username[0]}}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Mobile</label>
                                                <input type="text" v-model="form.mobile" placeholder="Mobile Number">
                                                <span class="text-danger"
                                                      v-if="errors.mobile">{{errors.mobile[0]}}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Email Address</label>
                                                <input type="text" v-model="form.email" placeholder="Email Address">
                                                <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Select Status</label>
                                                <select v-model="form.status">
                                                    <option v-for="status in statuses" v-bind:value="status.value">
                                                        {{status.text}}
                                                    </option>
                                                </select>

                                                <span class="text-danger"
                                                      v-if="errors.status">{{errors.status[0]}}</span>

                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>User Role</label>
                                                <select v-model="form.isAdmin">
                                                    <option v-for="role in roles" v-bind:value="role.value">
                                                        {{role.text}}
                                                    </option>
                                                </select>

                                                <span class="text-danger"
                                                      v-if="errors.isAdmin">{{errors.isAdmin[0]}}</span>
                                            </div>
                                        </div>


                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Select Club</label>
                                                <select v-model="form.club_id">
                                                    <option v-for="club in clubs" v-bind:value="club.id">
                                                        {{club.club_name}}
                                                    </option>
                                                </select>
                                                <span class="text-danger"
                                                      v-if="errors.club_id">{{errors.club_id[0]}}</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Club Name</label>
                                                <input type="text" v-model="form.club_name" placeholder="Club Name">
                                                <span class="text-danger" v-if="errors.club_name">{{errors.club_name[0]}}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Club Member</label>
                                                <select v-model="form.isClub">
                                                    <option v-for="status in memberStatuses"
                                                            v-bind:value="status.value">
                                                        {{status.text}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <button type="submit" class="main-btn btn btn-block mt-3">Update Profile
                                            </button>
                                        </div>
                                    </div>
                                </form>


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
                            <label for="password">Password</label>
                            <input type="password" v-model="passwordForm.password" placeholder="*****"
                                   id="password">
                            <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
                        </div>

                        <div class="form-group">
                            <label for="password">Confirm Password</label>
                            <input type="password" v-model="passwordForm.password_confirmation" placeholder="*****">
                        </div>


                    </div>

                    <div class="modal-footer">
                        <button class="modal-sport-place" type="button" @click.prevent="changePassword">Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>



        <div v-if="balanceModal" @close="balanceModal = false" class="modal sport-modal" id="balanceModal"
             style="display: block;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title">Manage Balance</h5>
                        <button type="button" class="close" @click="balanceModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>

                    <div class="modal-body text-left">

                        <div class="form-group">
                            <label>Amount</label>
                            <input type="text" v-model="balanceForm.amount"  >
                            <span class="text-danger" v-if="errors.amount">{{errors.amount[0]}}</span>
                        </div>

                        <div class="form-group">
                            <label>Select Operation</label>
                            <select v-model="balanceForm.type">
                                <option v-for="status in balanceStatus" v-bind:value="status.value">
                                    {{status.text}}
                                </option>
                            </select>
                            <span class="text-danger"
                                  v-if="errors.type">{{errors.type[0]}}</span>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="modal-sport-place" type="button" @click.prevent="balanceUpdate">Balance Update
                        </button>
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
        data() {
            return {
                passwordModal: false,
                balanceModal: false,
                form: {
                    id: "",
                    name: "",
                    username: "",
                    mobile: "",
                    email: "",
                    club_id: "",
                    club_name: "",
                    status: "",
                    isAdmin: "",
                    isClub: ""
                },
                passwordForm: {
                    id: '',
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                },
                statuses: [
                    {text: 'Active', value: 1},
                    {text: 'DeActive', value: 0}
                ],
                memberStatuses: [
                    {text: 'Yes', value: 1},
                    {text: 'No', value: 0}
                ],
                roles: [
                    {text: 'Admin', value: 1},
                    {text: 'Normal User', value: 0}
                ],

                balanceForm: {
                    id: '',
                    amount:'',
                    type: '',
                },
                balanceStatus: [
                    {text: 'Add Balance', value: 1},
                    {text: 'Substruct Balance', value: 0}
                ],
            }
        },
        validate({params}) {
            return /^\d+$/.test(
                params.id
            )
        },
        mounted() {
            this.passwordForm.id = this.adminSingleUser.id;
            this.balanceForm.id = this.adminSingleUser.id;
            this.balanceForm.amount = this.adminSingleUser.balance;
            this.form.id = this.adminSingleUser.id;
            this.form.name = this.adminSingleUser.name;
            this.form.username = this.adminSingleUser.username;
            this.form.mobile = this.adminSingleUser.mobile;
            this.form.email = this.adminSingleUser.email;
            this.form.club_id = this.adminSingleUser.club_id;
            this.form.club_name = this.adminSingleUser.club_name;
            this.form.status = this.adminSingleUser.status;
            this.form.isAdmin = this.adminSingleUser.isAdmin;
            this.form.isClub = this.adminSingleUser.isClub;
        },
        computed: {
            ...mapState(['adminSingleUser', 'clubs'])
        },
        async asyncData({$axios, store, redirect, params}) {

            var _this = this;
            await $axios.get('/adminSingleUser/' + params.id)
                .then(res => {
                    store.dispatch('setAdminSingleUserData', res.data.user);
                    store.dispatch("setBasicData", res.data.basic);
                    store.dispatch("setClubsData", res.data.clubs);
                }).catch(err => {
                });
        },
        methods: {
            async submit() {
                var _this = this;
                await this.$axios.$post('adminSingleUserUpdate', this.form)
                    .then(res => {

                        _this.$store.dispatch('setAdminSingleUserData', res.user);

                        Vue.$toast.open({
                            message: 'Update Successfully',
                            type: 'success',
                            position: 'top-right'
                        });
                    })
                    .catch(err => {
                    });
            },
            async changePassword(){
                var _this =  this;
                await this.$axios.$post('adminSingleUserPasswordUpdate', this.passwordForm)
                    .then(res => {
                        if(res.user){

                            _this.passwordModal = false;
                            _this.$store.dispatch('setAdminSingleUserData', res.user);
                            Vue.$toast.open({
                                message: 'Password Has been Changed',
                                type: 'success',
                                position: 'top-right'
                            });
                        }
                    })
                    .catch(err => {
                    });

            },
            async balanceUpdate(){
                var _this =  this;
                await this.$axios.$post('adminSingleUserBalanceUpdate', this.balanceForm)
                    .then(res => {
                        _this.$store.dispatch('setAdminSingleUserData', res.user);

                        _this.balanceModal = false;

                        Vue.$toast.open({
                            message: 'Balance Has been Updated',
                            type: 'success',
                            position: 'top-right'
                        });
                    })
                    .catch(err => {
                    });

            }
        }

    }
</script>
