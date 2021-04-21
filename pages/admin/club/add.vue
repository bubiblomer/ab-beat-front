<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Add Club Member</h2>

                        <NuxtLink :to="{name: 'admin-club'}"  class="btn btn-info text-white"><i class="fa fa-list"></i> Club Members</NuxtLink>
                    </div>

                    <div class="card bg-dark">
                        <div class="card-header section-title media align-items-center justify-content-between">
                            <h5>Club Member Form</h5>
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

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input type="text" v-model="form.password" placeholder="Password">
                                            <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Confirm Password</label>
                                            <input type="text" v-model="form.password_confirmation" placeholder="Confirm Password">
                                        </div>
                                    </div>




                                    <div class="col-md-12">
                                        <button type="submit" class="main-btn btn btn-block mt-3">Add Club Members
                                        </button>
                                    </div>
                                </div>
                            </form>


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
                title: 'heeraexchange.in | Add Club Members',
            }
        },
        data() {
            return {
                form: {
                    name: "",
                    username: "",
                    mobile: "",
                    email: "",
                    club_name: "",
                    status: "",
                    isClub: 1
                },
                statuses: [
                    {text: 'Active', value: 1},
                    {text: 'DeActive', value: 0}
                ],
            }
        },
        async asyncData({$axios, store, redirect}) {

        },
        methods: {
            async submit() {
                var _this = this;
                console.log(this.form);


                await this.$axios.$post('adminNewClub', this.form)
                    .then(res => {

                        Vue.$toast.open({
                            message: 'Member Added Successfully',
                            type: 'success',
                            position: 'top-right'
                        });


                        this.$router.push('/admin/club')

                    })
                    .catch(err => {
                        console.log(err)
                    });
            },
        }

    }
</script>