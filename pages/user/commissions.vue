<template>
    <div>
        <Breadcrumb title="Commissions"></Breadcrumb>

        <section class="contact-section-two" >
            <div class="chancer-container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="section-title mt-2 mb-30 justify-content-between media">
                            <h2 class="title">Commissions</h2>

                            <NuxtLink to="/user/transactions" exact class="btn btn-warning text-white"><i class="fa fa-list"></i> Transaction </NuxtLink>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <table class="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Commission Via</th>
                                <th scope="col">Description</th>
                                <th scope="col">Amount</th>
                                <th scope="col">After Balance</th>
                                <th scope="col">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(trans, index) in myCommissions">
                                <th data-label="#"> {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}</th>
                                <td data-label="Commission Via">
                                    {{trans.commission_via}}
                                </td>
                                <td data-label="Description">
                                    <strong> {{trans.description}}</strong>
                                </td>


                                <td data-label="Amount">
                                    <strong class="text-success">{{trans.amount}} </strong>
                                </td>
                                <td data-label="After Balance">
                                    <strong >{{trans.after_balance}} </strong>
                                </td>

                                <td data-label="Time">{{trans.created_at}}</td>
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
                title: 'heeraexchange.in  | Commissions',
            }
        },
        data(){
            return {
                myCommissions: [],
                links: [],
                meta: []
            }
        },
        async asyncData({$axios, store}){
            let {data} = await $axios.get('/commission');
            return {
                myCommissions: data.data,
                links: data.links,
                meta: data.meta
            }
        },
        methods:{
            async loadMore(key){
                let {data, links, meta} = await this.$axios.$get(key);
                this.myCommissions = data;
                this.links = links;
                this.meta = meta;
            }
        }
    }
</script>
