<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Payment Log</h2>

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
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>

                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(trans, index) in deposits">
                            <th data-label="#">
                                {{(pageMeta.per_page *( pageMeta.current_page - 1)) + (++index) }}
                            </th>
                            <td data-label="TRX">
                                {{trans.trx}}
                            </td>
                            <td data-label="User">
                                <nuxt-link :to="{name: 'admin-user-id', params:{id: trans.user.id }}">
                                    {{trans.user.username}}
                                </nuxt-link>
                            </td>

                            <td data-label="Payment Method">
                                {{trans.payment_method}}
                            </td>

                            <td data-label="Amount">
                                <strong> {{trans.amount}}</strong>
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
                        <h5 class="modal-title">Payment Preview</h5>
                        <button type="button" class="close text-white" @click="paymentModal = false"
                                data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <ul class="list-group">
                            <li v-for="(detail, index) in paymentForm.detail"
                                class="list-group-item bg-dark media justify-content-between align-items-center">
                                <span> {{index}} :</span>
                                <span class="font-weight-bold text-right">{{detail.field_name}}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-dark btn-sm" type="button"
                                @click="paymentModal = false">
                            Close
                        </button>
                        <button v-if="paymentForm.status == 2" class="btn btn-danger btn-sm" type="button"
                                @click.prevent="savePaymentForm(3)">
                            Reject
                        </button>


                        <button v-if="paymentForm.status == 2" class="btn btn-success btn-sm" type="button"
                                @click.prevent="savePaymentForm(1)">
                            Approve
                        </button>

                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<!--End of Tawk.to Script-->
<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'
    import datetime from 'vuejs-datetimepicker'

    export default {
        layout: 'admin',
        components: {datetime},
        head() {
            return {
                title: 'heeraexchange.in | Payment Log',
            }
        },
        data() {
            return {
                paymentModal: false,
                paymentForm: {
                    id: '',
                    status: '',
                    detail: ''
                }
            }
        },
        computed: {
            ...mapState(['deposits', 'pageLinks', 'pageMeta']),
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/adminDepositLog')
                .then(res => {
                    store.dispatch("setDepositsData", res.data.data);
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
                this.$store.dispatch('setDepositsData', data);
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
                this.paymentForm.detail = item.detail;
                this.paymentModal = true;
            },
            async savePaymentForm(status) {
                var _this = this;

                await this.$axios.$post('/depositAction', {
                    id: this.paymentForm.id,
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
                            message: `${(res.data.status == 1) ? 'Approve' : 'Rejected'} Successfully`,
                            type: 'success',
                            position: 'top-right'
                        });

                        var list = this.deposits;
                        const result = list.map(function (obj) {
                            if (obj.id == res.data.id) {
                                obj = res.data
                            }
                            return obj
                        });
                        this.$store.dispatch('setDepositsData', result);

                    })
                    .catch(err => {
                    })
            }


        }
    }
</script>