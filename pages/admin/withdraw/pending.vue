<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Pending Withdraw </h2>

                        <button class="btn btn-sm btn-info" @click="refresh"><i class="fa fa-sync"></i> Refresh</button>
                    </div>


                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">TRX</th>
                            <th scope="col">User</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Charge</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(trans, index) in withdraws">
                            <th data-label="#">
                                {{(pageMeta.per_page *( pageMeta.current_page - 1)) + (++index) }}
                            </th>
                            <td data-label="TRX">
                                {{trans.transaction_id}}
                            </td>
                            <td data-label="User">
                                <nuxt-link :to="{name: 'admin-user-id', params:{id: trans.user.id }}">
                                    {{trans.user.username}}
                                </nuxt-link>
                            </td>

                            <td data-label="Payment Method">
                                {{trans.method.name}}
                            </td>

                            <td data-label="Amount">
                                <strong> {{trans.amount}}</strong>
                            </td>
                            <td data-label="Charge">
                                <strong> {{trans.charge}}</strong>
                            </td>

                            <td data-label="Status">
                                <span :class="trans.status_color"> {{trans.status_msg}}</span>
                            </td>
                            <td data-label="Date">{{trans.created_at}}</td>

                            <td data-label="Action">

                                <button type="button" class="btn btn-info btn-round btn-sm"
                                        @click="selectPayment(trans)"
                                        title="Edit">
                                    <i class="fa fa-eye"></i>
                                </button>

                            </td>
                        </tr>
                        </tbody>
                    </table>


                    <nav class="my-4  justify-content-between align-items-start d-flex "
                         aria-label="Page navigation example">
                        <ul class="pagination  mr-auto ">
                            <li class="page-item" v-for="(key, value) in pageLinks"
                                :class="{disabled: key.url == null, active: key.active == true}">
                                <a href="javascript:void(0)" @click="loadMore(key.url)"
                                   class="page-link" v-html="key.label"></a>
                            </li>
                        </ul>
                    </nav>


                </div>
            </div>
        </div>


        <!--Refund Modal Start-->
        <div v-if="paymentModal" @close="paymentModal = false" class="modal " id="refundModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  ">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">Withdraw Details</h5>
                        <button type="button" class="close text-white" @click="paymentModal = false"
                                data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <ul class="list-group">
                            <li v-for="(detail, index) in paymentForm.withdraw_information"
                                class="list-group-item bg-dark media justify-content-between align-items-center">
                                <span> {{index}} :</span>
                                <span class="font-weight-bold text-right">{{detail.field_name}}</span>
                            </li>
                        </ul>
                        <h6 v-if="paymentForm.status != 1" class="my-1">Admin Reply</h6>
                        <p v-if="paymentForm.status != 1" class="text-white">{{paymentForm.admin_reply}}</p>


                        <div v-if="paymentForm.status == 1" class="form-group my-2">
                            <label>Reply</label>
                            <textarea v-model="paymentForm.admin_reply" class="form-control" rows="4"></textarea>
                        </div>
                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-dark btn-sm" type="button"
                                @click="paymentModal = false">
                            Close
                        </button>
                        <button v-if="paymentForm.status == 1" class="btn btn-danger btn-sm" type="button"
                                @click.prevent="savePaymentForm(-2)">
                            Reject
                        </button>


                        <button v-if="paymentForm.status == 1" class="btn btn-success btn-sm" type="button"
                                @click.prevent="savePaymentForm(2)">
                            Approve
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
    import datetime from 'vuejs-datetimepicker'

    export default {
        layout: 'admin',
        components: {datetime},
        head() {
            return {
                title: 'heeraexchange.in | Pending Withdraw',
            }
        },
        data() {
            return {
                paymentModal: false,
                paymentForm: {
                    id: '',
                    status: '',
                    admin_reply: '',
                    withdraw_information: '',
                }
            }
        },
        computed: {
            ...mapState(['withdraws', 'pageLinks', 'pageMeta']),
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/adminWithdrawPending')
                .then(res => {
                    store.dispatch("setWithdrawsData", res.data.data);
                    store.dispatch("setPageLinksData", res.data.meta.links);
                    let metaData = {
                        per_page: res.data.meta.per_page,
                        current_page: res.data.meta.current_page,
                    };
                    store.dispatch('setPageMetaData', metaData);
                })
                .catch(err => {
                });
        },
        methods: {
            refresh(){
                this.$router.app.refresh()
            },
            async loadMore(key) {
                const {data, meta} = await this.$axios.$get(key);
                this.$store.dispatch('setWithdrawsData', data);
                this.$store.dispatch('setPageLinksData', meta.links);
                let metaData = {
                    per_page: meta.per_page,
                    current_page: meta.current_page
                };
                this.$store.dispatch('setPageMetaData', metaData);
            },
            selectPayment(item) {
                this.paymentForm.id = item.id;
                this.paymentForm.status = item.status;
                this.paymentForm.admin_reply = item.admin_reply;
                this.paymentForm.withdraw_information = item.withdraw_information;
                this.paymentModal = true;
            },
            async savePaymentForm(status) {
                var _this = this;

                await this.$axios.$post('/withdrawAction', {
                    id: this.paymentForm.id,
                    admin_reply: this.paymentForm.admin_reply,
                    status
                })
                .then(res => {
                    this.paymentModal = false;
                    if (res.errors) {
                        Vue.$toast.open({
                            message: '' + res.errors,
                            type: 'error',
                            position: 'top-right'
                        });
                    }
                    Vue.$toast.open({
                        message: `${(res.data.status == 2) ? 'Approve' : 'Rejected'} Successfully`,
                        type: 'success',
                        position: 'top-right'
                    });

                    var list = this.withdraws;
                    const result = list.map(function (obj) {
                        if (obj.id == res.data.id) {
                            obj = res.data
                        }
                        return obj
                    });
                    this.$store.dispatch('setWithdrawsData', result);
                })
                .catch(err => {
                })
            }
        }
    }
</script>