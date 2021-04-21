<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Pusher Notification</h2>
                    </div>
                </div>

                <div class="col-xl-12 col-lg-12">

                    <div class="card bg-dark">

                        <div class="card-body darcula-bg">

                            <form @submit.prevent="submit">
                                <div class="row">


                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>APP ID</label>
                                            <input type="text" v-model="form.APP_ID" class="form-control">
                                            <span class="text-danger" v-if="errors.APP_ID">{{errors.APP_ID[0]}}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>APP KEY</label>
                                            <input type="text" v-model="form.APP_KEY"  class="form-control">
                                            <span class="text-danger"
                                                  v-if="errors.APP_KEY">{{errors.APP_KEY[0]}}</span>
                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>APP SECRET</label>
                                            <input type="text" v-model="form.APP_SECRET"  class="form-control">
                                            <span class="text-danger"
                                                  v-if="errors.APP_SECRET">{{errors.APP_SECRET[0]}}</span>
                                        </div>
                                    </div>


                                    <div class="col-md-3 col-sm-4">
                                        <div class="form-group">
                                            <label>APP CLUSTER</label>
                                            <input type="text" v-model="form.APP_CLUSTER"  class="form-control">
                                            <span class="text-danger"
                                                  v-if="errors.APP_CLUSTER">{{errors.APP_CLUSTER[0]}}</span>
                                        </div>
                                    </div>




                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success btn-block mt-3">Update
                                            </button>
                                        </div>
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
                title: 'heeraexchange.in | Pusher Notification',
            }
        },
        data(){
            return {
                form:{
                    APP_ID:'',
                    APP_KEY:'',
                    APP_SECRET:'',
                    APP_CLUSTER:''
                },
            }
        },
        mounted(){
            this.form.APP_ID = this.listener.APP_ID;
            this.form.APP_KEY = this.listener.APP_KEY;
            this.form.APP_SECRET = this.listener.APP_SECRET;
            this.form.APP_CLUSTER = this.listener.APP_CLUSTER;
        },

        computed: {
            ...mapState(['listener'])
        },
        async asyncData({$axios, store,redirect}){
            var _this = this;
            await $axios.get('/pusherInfo')
                .then(res => {
                    store.dispatch("setListenerData",res.data);
                }).catch(err => {
                });
        },
        methods: {
            async submit() {

                var _this = this;
                await this.$axios.$post('pusherInfoUpdate', this.form)
                    .then(res => {
                        this.$store.dispatch('setListenerData', res);

                        Vue.$toast.open({
                            message: 'Update Successfully',
                            type: 'success',
                            position: 'top-right'
                        });
                    })
                    .catch(err => {

                    });
            }
        },

    }
</script>