<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12" v-if="awaitingSingleQuestion">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">{{awaitingSingleQuestion.name}}</h2>
                        <small class="text-danger">{{(awaitingSingleQuestion.match) ? awaitingSingleQuestion.match.name: ''}}</small>
                    </div>

                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Option</th>
                            <th scope="col">Ratio</th>
                            <th scope="col">Total Predict Amount</th>
                            <th scope="col">Total Return Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in awaitingSingleQuestionByOptions">
                            <th data-label="#">{{++index}}</th>
                            <td data-label="Option">{{item.option_name}}</td>
                            <td data-label="Ratio">{{item.ratio}}</td>
                            <td data-label="Total Predict Amount">{{item.predict_amount}}</td>
                            <td data-label="Total Return Amount">{{item.return_amount}}</td>
                            <td data-label="Status">
                                <span :class="item.status_color">{{item.status_text}}</span>
                            </td>
                            <td data-label="Action">

                                <button v-if="item.status == 0 || item.status == 1"
                                        @click="selectData(item)"
                                        type="button" class="btn  btn-info btn-round btn-sm"
                                        title="Make Winner">
                                    <i class="fa fa-pencil"></i>
                                </button>


                                <span v-else-if="item.status == 2 || item.status == -2 || item.status == 3"
                                      class="badge badge-info">Completed</span>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col-lg-12" v-else="!awaitingSingleQuestion">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">No Data Found</h2>
                    </div>
                </div>
            </div>
        </div>

        <!--Refund Modal Start-->
        <div v-if="makeWinnerModal" @close="makeWinnerModal = false" class="modal " id="refundModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  ">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">Make Winner</h5>
                        <button type="button" class="close text-white" @click="makeWinnerModal = false"
                                data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <p class="text-white">Are want to Make winner this?</p>
                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-success " type="button"
                                @click.prevent="winnerConfirm">
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
                title: 'heeraexchange.in | Select Winner',
            }
        },
        data() {
            return {
                makeWinnerModal: false,
                betOptionId: '',
            }
        },
        validate({params}) {
            return /^\d+$/.test(
                params.id
            )
        },
        computed: {
            ...mapState(['awaitingQuestions', 'awaitingSingleQuestion', 'awaitingSingleQuestionByOptions']),
        },
        async asyncData({$axios, store, redirect, params}) {
            var _this = this;
            await $axios.get('/adminQuestionId/' + params.id)
                .then(res => {

                    store.dispatch('setAwaitingSingleQuestionData', res.data.question);
                    store.dispatch("setAwaitingSingleQuestionByOptionsData", res.data.options);

                }).catch(err => {
                });

        },
        methods: {

            selectData(obj) {
                this.betOptionId = obj.id;
                this.makeWinnerModal = true;
            },
            async winnerConfirm() {

                await this.$axios.$post('/adminMakeWinner', {id: this.betOptionId})
                    .then(res => {

                        this.makeWinnerModal = false;

                        if(res.errors){
                            Vue.$toast.open({
                                message: ''+res.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }else {

                            Vue.$toast.open({
                                message: 'Make Winner Successfully',
                                type: 'success',
                                position: 'top-right'
                            });

                            this.$store.dispatch('setAwaitingSingleQuestionData', res.question);
                            this.$store.dispatch("setAwaitingSingleQuestionByOptionsData", res.options);


                            var list = this.awaitingQuestions;
                            const result = list.map(function (obj) {
                                if (obj.id == res.question.id) {
                                    obj = res.question
                                }
                                return obj
                            });

                            this.$store.dispatch('setAwaitingQuestionsData', result);

                        }





                    })
                    .catch(err => {
                    })

            }

        }
    }
</script>