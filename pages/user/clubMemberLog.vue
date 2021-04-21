<template>
    <div>
        <Breadcrumb title="Member Bet Log"></Breadcrumb>

        <section class="contact-section-two" >
            <div class="chancer-container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="section-title p-4 justify-content-between media">
                            <h2 class="title">Member Bet Log</h2>
                        </div>

                        <table class="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Match</th>
                                <th scope="col">Question</th>
                                <th scope="col">Threat</th>
                                <th scope="col">Prediction Amount</th>
                                <th scope="col">Return Amount</th>
                                <th scope="col">Result</th>
                                <th scope="col">Time</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr v-for="(item, index) in myInvests">
                                <th data-label="#">
                                    {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}</th>
                                <td  data-label="Username"><a href="javascript:void(0)">{{(item.user) ? item.user.username : ''}}</a></td>
                                <td  data-label="Match">{{item.match}} </td>
                                <td  data-label="Question">{{item.question}}</td>
                                <td  data-label="Threat">{{item.threat}}</td>
                                <td  data-label="Prediction Amount">{{item.prediction_amount}}</td>
                                <td  data-label="Return Amount">{{item.return_amount}}</td>
                                <td  data-label="Result"><span :class="item.result_color">{{item.result}}</span> </td>
                                <td  data-label="Time">{{item.time}}</td>
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
                title: 'heeraexchange.in  | Club Member Log',
            }
        },
        data(){
            return {
                myInvests: [],
                links: [],
                meta: [],
                serial: 0
            }
        },
        async asyncData({$axios, store}){
            let {data} = await $axios.get('/clubMemberPrediction');
            return {
                myInvests: data.data,
                links: data.links,
                meta: data.meta
            }
        },
        methods:{
            async loadMore(key){
                let {data, links, meta} = await this.$axios.$get(key);
                this.myInvests = data;
                this.links = links;
                this.meta = meta;
            }
        }
    }
</script>
