<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12" v-if="awaitingSingleQuestion">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">{{awaitingSingleQuestion.name}}</h2>
                        <small class="text-danger">{{(awaitingSingleQuestion.match) ? awaitingSingleQuestion.match.name :''}}</small>
                    </div>

                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Threat</th>
                            <th scope="col"> Predict Amount</th>
                            <th scope="col">Return Amount</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in questionInvestors">
                            <th data-label="#">{{++index}}</th>
                            <td data-label="Username">{{item.username}}</td>
                            <td data-label="Threat">{{item.option_name}}</td>
                            <td data-label="Predict Amount">{{item.invest_amount}}</td>
                            <td data-label="Return Amount">{{item.return_amount}}</td>

                            <td data-label="Action">

                                <button v-if="item.status == 0"
                                        @click="selectData(item)"
                                        type="button" class="btn  btn-info btn-round btn-sm"
                                        title="Refund">
                                    <i class="fas fa-paper-plane"></i>
                                </button>

                                <span v-else-if="item.status != 0"
                                      :class="item.status_color">{{item.status_text}}</span>
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

                <div class="col-lg-12" v-else="!awaitingSingleQuestion">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">No Data Found</h2>
                    </div>
                </div>
            </div>
        </div>

        <!--Refund Modal Start-->
        <div v-if="makeRefundModal" @close="makeRefundModal = false" class="modal " id="refundModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  ">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">Refund Amount</h5>
                        <button type="button" class="close text-white" @click="makeRefundModal = false"
                                data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <p class="text-white">Are you want to Refund this?</p>
                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-success " type="button"
                                @click.prevent="refundConfirm">
                            Yes
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

    export default {
        layout: 'admin',
        head() {
            return {
                title: 'heeraexchange.in | Predictor List',
            }
        },
        data() {
            return {
                makeRefundModal: false,
                beInvestId: '',
            }
        },
        validate({params}) {
            return /^\d+$/.test(
                params.id
            )
        },
        computed: {
            ...mapState(['awaitingSingleQuestion','questionInvestors','pageLinks', 'pageMeta']),
        },
        async asyncData({$axios, store, redirect, params}) {
            await $axios.get('/adminQuestionIdPredictors/' + params.id)
                .then(res => {
                    store.dispatch('setAwaitingSingleQuestionData', res.data.question);
                    store.dispatch('setQuestionInvestorsData', res.data.questionInvests.data);


                    store.dispatch("setPageLinksData", res.data.questionInvests.links);
                    let meta = {
                        per_page: res.data.questionInvests.per_page,
                        current_page: res.data.questionInvests.current_page,
                    };
                    store.dispatch('setPageMetaData', meta);

                }).catch(err => {
                });

        },
        methods: {
            async loadMore(key) {
                const {questionInvests} = await this.$axios.$get(key);
                this.$store.dispatch('setQuestionInvestorsData', questionInvests.data);
                this.$store.dispatch('setPageLinksData', questionInvests.links);
                let meta = {
                    per_page: questionInvests.per_page,
                    current_page: questionInvests.current_page
                };
                this.$store.dispatch('setPageMetaData', meta);
            },

            selectData(obj) {
                this.beInvestId = obj.id;
                this.makeRefundModal = true;
            },
            async refundConfirm() {

                this.makeRefundModal = false;

                await this.$axios.$post('/adminMakeRefund', {id: this.beInvestId})
                    .then(res => {


                        if(res.errors){
                            Vue.$toast.open({
                                message: ''+res.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }else {


                            Vue.$toast.open({
                                message: 'Amount has been Refund',
                                type: 'success',
                                position: 'top-right'
                            });


                            var list = this.questionInvestors;
                            const result = list.map(function (obj) {
                                if (obj.id == res.invest.id) {
                                    obj = res.invest
                                }
                                return obj
                            });
                            this.$store.dispatch('setQuestionInvestorsData', result);
                        }
                    })
                    .catch(err => {
                    })


            }

        }
    }
</script>