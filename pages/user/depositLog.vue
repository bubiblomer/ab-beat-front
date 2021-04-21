<template>
    <div>
        <Breadcrumb title="Deposit Log"></Breadcrumb>

        <section class="contact-section-two" >
            <div class="chancer-container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="section-title p-4 justify-content-between media">
                            <h2 class="title">Deposit Log</h2>
                            <NuxtLink to="/user/deposit" class="btn btn-warning text-white"><i class="fa fa-plus-circle"></i> DEPOSIT</NuxtLink>
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
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(trans, index) in userDeposits">
                                <th data-label="#">
                                    {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}</th>

                                <td data-label="TRX">
                                    {{trans.trx}}
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
                            </tr>


                            </tbody>
                        </table>
                        <nav class="my-4  justify-content-between align-items-start d-flex " aria-label="Page navigation example">

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
    </div>
</template>

<script>

    import Breadcrumb from '@/components/Breadcrumb'
    export default {
        middleware: 'auth',
        components: {Breadcrumb},
        head () {
            return {
                title: 'heeraexchange.in  | DEPOSIT LOG',
            }
        },
        data(){
            return {
                userDeposits: [],
                links: [],
                meta: []
            }
        },
        async asyncData({$axios, store}){
            let {data} = await $axios.get('/depositLog');
            return {
                userDeposits: data.data,
                links: data.links,
                meta: data.meta
            }
        },
        methods:{
            async loadMore(key){
                let {data, links, meta} = await this.$axios.$get(key);
                this.userDeposits = data;
                this.links = links;
                this.meta = meta;
            }
        }
    }
</script>
