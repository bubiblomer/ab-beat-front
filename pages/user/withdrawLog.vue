<template>
    <div>
        <Breadcrumb title="Withdraw Log"></Breadcrumb>

        <section class="contact-section-two" >
            <div class="chancer-container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="section-title p-4 justify-content-between media">
                            <h2 class="title">Withdraw Log</h2>
                            <NuxtLink to="/user/withdraw" class="btn btn-warning text-white"><i class="fa fa-plus-circle"></i> Withdraw Money</NuxtLink>
                        </div>

                        <table class="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">TRX</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                                <th scope="col">Date</th>
                                <th scope="col">Info</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(trans, index) in myWithdrawalLog">
                                <td data-label="#"> {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}</td>
                                <td data-label="TRX">
                                    {{trans.transaction_id}}
                                </td>
                                <td data-label="Payment Method">
                                    {{trans.method.name}}
                                </td>

                                <td data-label="Amount">
                                    <strong> {{trans.amount}}</strong>
                                </td>

                                <td data-label="Status">
                                    <span :class="trans.status_color"> {{trans.status_msg}}</span>
                                </td>
                                <td data-label="Date">{{trans.created_at}}</td>

                                <td data-label="Info">
                                    <button type="button" class="btn btn-sm btn-warning text-white"
                                            @click="withdrawInfo(trans)">
                                        <i class="fa fa-info-circle"></i>
                                    </button>
                                </td>
                            </tr>


                            </tbody>
                        </table>

                        <nav class="my-4 justify-content-between align-items-start d-flex " aria-label="Page navigation example">

                            <ul class="pagination  mr-auto " v-if="0 < meta.links.length">
                                <li class="page-item" v-for="(key, value) in meta.links" :class="{disabled: key.url == null,active: key.active == true}">
                                    <a  href="javascript:void(0)"  @click="loadMore(key.url)"  class="page-link" v-html="key.label"></a>
                                </li>
                            </ul>

                            <ul v-if="meta" class="pagination ml-auto">
                                <li class="mr-2" v-if="10 < meta.total">
                                    {{meta.from}}-{{meta.to}} of
                                    {{meta.total}}
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </section>


        <div v-if="infoModal" @close="infoModal = false" class="modal " id="infoModal"
             style="display: block;">
            <div class="modal-dialog ">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title">Withdraw Information</h5>
                        <button type="button" class="close" @click="infoModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>

                    <div class="modal-body text-left ">
                        <ul class="list-group ">
                            <li v-for="(infoVal, infokey) in (withdrawInformation)"
                                class="list-group-item darcula-bg text-white justify-content-between">{{infokey}} : <span class="text-right">{{infoVal.field_name}}</span></li>
                        </ul>


                        <div class="card mt-2 darcula-bg" v-if="adminReply">
                            <div class="card-header">
                                <h6 class="card-title">Admin Replied</h6>
                            </div>
                            <div class="card-body">
                                <p class="text-white" v-html="adminReply"></p>
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-dark btn-sm" type="button"
                                @click="infoModal = false">
                            Close
                        </button>

                        <button class="btn btn-danger btn-sm" type="button"
                                v-if="paymentForm.status == 1"
                                @click.prevent="savePaymentForm(-2)">
                            Reject
                        </button>



                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import Breadcrumb from '@/components/Breadcrumb'
    export default {
        middleware: 'auth',
        components: {Breadcrumb},
        head () {
            return {
                title: 'heeraexchange.in| Withdraw Log',
            }
        },
        data(){
            return {
                infoModal: false,
                myWithdrawalLog: [],
                links: [],
                meta: [],
                adminReply: '',
                withdrawInformation: {},
                paymentForm: {
                    id: '',
                    status: '',
                }
            }
        },
        async asyncData({$axios, store}){
            let {data} = await $axios.get('/withdrawalLog');
            return {
                myWithdrawalLog: data.data,
                links: data.links,
                meta: data.meta
            }
        },
        methods:{
            async loadMore(key){
                let {data, links, meta} = await this.$axios.$get(key);
                this.myWithdrawalLog = data;
                this.links = links;
                this.meta = meta;
            },
            withdrawInfo(data) {
                this.infoModal = true;
                this.adminReply = data.admin_reply;
                this.withdrawInformation = data.withdraw_information;
                this.paymentForm.id =  data.id;
                this.paymentForm.status =  data.status;
            },
            async savePaymentForm(status) {
                var _this = this;

                await this.$axios.$post('/withdrawCancellation', {
                    id: this.paymentForm.id,
                    status
                })
                    .then(res => {
                        this.infoModal = false;

                        if (res.errors) {
                            Vue.$toast.open({
                                message: '' + res.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }


                        Vue.$toast.open({
                            message: `Withdraw Request Has been Cancelled`,
                            type: 'success',
                            position: 'top-right'
                        });




                        _this.$store.dispatch('updateUserData', res.user);

                        var list = _this.myWithdrawalLog;

                        const result = list.map(function (obj) {
                            if (obj.id == res.data.id) {
                                obj = res.data
                            }
                            return obj
                        });

                        _this.myWithdrawalLog = result;

                        console.log(res)



                    })
                    .catch(err => {
                    })
            }
        }
    }
</script>
