<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Manage Result</h2>
                        <button class="btn btn-sm btn-info" @click="refresh"><i class="fa fa-sync"></i> Refresh</button>
                    </div>


                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Question</th>
                            <th scope="col">Match</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Predictors</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in awaitingQuestions">
                            <th data-label="#">
                                {{ (pageMeta.per_page * (pageMeta.current_page - 1)) + (++index)}}

                            </th>
                            <td data-label="Question">
                                <p>{{item.name}}</p>
                            <small class="text-danger">Predict Amount  {{item.totalInvest}}{{basic.currency_symbol}}</small>
                            </td>
                            <td data-label="Match">{{(item.match) ? item.match.name : ''}}</td>
                            <td data-label="End Time"> {{item.end_date}}</td>

                            <td data-label="Predictors">
                                    <NuxtLink :to="{name: 'admin-result-predictors-id', params:{id: item.id }}" class="btn btn-outline-info btn-round btn-sm">
                                    {{item.totalInvestor}}
                                    </NuxtLink>
                            </td>
                            <td data-label="Action">

                                <div v-if="item.result ==1">
                                    <NuxtLink :to="{name: 'admin-result-winner-id', params:{id: item.id }}"

                                              class="btn btn-success btn-round btn-sm"
                                              title="View Winner">
                                        <i class="fa fa-eye"></i>
                                    </NuxtLink>
                                </div>

                                <div v-else-if="item.result ==0">

                                    <NuxtLink :to="{name: 'admin-result-winner-id', params:{id: item.id }}"
                                              class="btn btn-primary btn-round btn-sm"
                                              title="Select Winner">
                                        <i class="fa fa-eye"></i>
                                    </NuxtLink>



                                    <button  type="button" class="btn btn-info btn-round btn-sm"
                                            @click="selectQuestion(item, 'Edit')"
                                            title="Edit">
                                        <i class="fa fa-pencil"></i>
                                    </button>


                                    <button  @click="selectRefundData(item)" type="button"
                                            class="btn btn-danger btn-round btn-sm" title="Refund">
                                        <i class="fa fa-paper-plane"></i>
                                    </button>
                                </div>


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


        <!--Question Modal Start-->
        <div v-if="questionModal" @close="questionModal = false" class="modal sport-modal" id="questionModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">{{questionForm.type}} Question </h5>
                        <button type="button" class="close" @click="questionModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <div class="form-group">
                            <label>Question Name</label>
                            <input type="text" class="form-control" v-model="questionForm.name"
                                   placeholder="Question Name">
                            <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                        </div>

                        <div class="form-group">
                            <label>End Date </label>
                            <datetime format="YYYY-MM-DD H:i:s" width="300px" typeable="true"
                                      v-model="questionForm.end"></datetime>
                            <span class="text-danger" v-if="errors.end">{{errors.end[0]}}</span>
                        </div>


                        <div class="form-group">
                            <label>Status</label>
                            <select v-model="questionForm.status" class="form-control">
                                <option v-for="status in questionStatuses" v-bind:value="status.value">
                                    {{status.text}}
                                </option>
                            </select>

                            <span class="text-danger" v-if="errors.status">{{errors.status[0]}}</span>
                        </div>

                    </div>

                    <div class="modal-footer p-3">
                        <button class="modal-sport-place mt-0" type="button"
                                @click.prevent="saveQuestionForm(questionForm)">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!--Refund Modal Start-->
        <div v-if="refundModal" @close="refundModal = false" class="modal " id="refundModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  ">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">Refund Prediction Amount</h5>
                        <button type="button" class="close text-white" @click="refundModal = false"
                                data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <p class="text-white">Are You want sure refund Amount?</p>
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
    import datetime from 'vuejs-datetimepicker'

    export default {
        layout: 'admin',
        components: {datetime},
        head() {
            return {
                title: 'heeraexchange.in | Awaiting Winners',
            }
        },
        data() {
            return {
                questionModal: false,
                refundModal: false,
                refundId: '',

                questionForm: {
                    id: '',
                    name: '',
                    status: '',
                    end: '',
                    type: 'Add',
                },
                questionStatuses: [
                    {text: 'DeActive', value: 0},
                    {text: 'Active', value: 1},
                    {text: 'Closed', value: 2}
                ],
            }
        },
        computed: {
            ...mapState(['awaitingQuestions', 'pageLinks', 'pageMeta']),
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/adminAwaitingWinner')
                .then(res => {
                    store.dispatch("setAwaitingQuestionsData", res.data.questions.data);
                    store.dispatch("setPageLinksData", res.data.questions.links);
                    let meta = {
                        per_page: res.data.questions.per_page,
                        current_page: res.data.questions.current_page,
                    };
                    store.dispatch('setPageMetaData', meta);
                })
                .catch(err => {
                });
        },
        methods: {
            refresh(){
                this.$router.app.refresh()
            },
            async loadMore(key) {
                const {questions} = await this.$axios.$get(key);
                this.$store.dispatch('setAwaitingQuestionsData', questions.data);
                this.$store.dispatch('setPageLinksData', questions.links);
                let meta = {
                    per_page: questions.per_page,
                    current_page: questions.current_page
                };
                this.$store.dispatch('setPageMetaData', meta);
            },

            selectRefundData(obj) {
                this.refundId = obj.id;
                this.refundModal = true;
            },

            async refundConfirm() {
                await this.$axios.$post('/adminRefund', {id: this.refundId})
                    .then(res => {

                        this.refundModal = false;
                        if(res.errors){
                            Vue.$toast.open({
                                message: ''+res.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }else{

                            Vue.$toast.open({
                                message: 'Refunded Successfully',
                                type: 'success',
                                position: 'top-right'
                            });

                            var list = this.awaitingQuestions;
                            const result = list.map(function (obj) {
                                if (obj.id == res.id) {
                                    obj = res
                                }
                                return obj
                            });

                            this.$store.dispatch('setAwaitingQuestionsData', result);
                        }


                    })
                    .catch(err => {
                    })

            },
            selectQuestion(item, type) {
                this.questionForm.id = item.id;
                this.questionForm.match_id = item.match_id;
                this.questionForm.name = item.name;
                this.questionForm.status = item.status;
                this.questionForm.end = item.end_date;
                this.questionForm.type = type;
                this.questionModal = true;
            },
            async saveQuestionForm(questionForm) {
                var _this = this;
                await this.$axios.$post('/awaitingQuestionUpdate', questionForm)
                    .then(res => {


                        this.questionModal = false;
                        Vue.$toast.open({
                            message: 'Update Successfully',
                            type: 'success',
                            position: 'top-right'
                        });

                        var list = this.awaitingQuestions;
                        const result = list.map(function (obj) {
                            if (obj.id == res.id && res.field == "choto") {
                                obj = res
                            }
                            return obj
                        });
                        this.$store.dispatch('setAwaitingQuestionsData', result);
                    })
                    .catch(err => {
                    })
            }


        }
    }
</script>