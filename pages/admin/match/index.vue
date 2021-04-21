<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Manage Match</h2>



                        <div>

                            <button type="button" class="btn btn-sm btn-success btn-round text-right"
                                    @click="addItem(form, 'Add')">
                                <i class="fa fa-plus"></i> Add Match
                            </button>

                            <button class="btn btn-sm btn-info" @click="refresh"><i class="fa fa-sync"></i> Refresh</button>
                        </div>

                    </div>

                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Event</th>
                            <th scope="col">Category</th>
                            <th scope="col">Schedule Start</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in adminMatches">
                            <th data-label="#">
                                {{ (pageMeta.per_page * (pageMeta.current_page - 1)) + (++index)}}

                            </th>
                            <td data-label="Name">
                                <p>{{item.name}}</p>

                                <small v-if="0 < item.totalInvest" class="text-danger ">Predict Amount
                                    {{item.totalInvest}}{{basic.currency_symbol}}
                                </small>
                            </td>
                            <td data-label="Event" v-html="item.event_name"></td>
                            <td data-label="Category" v-html="item.category_name"></td>
                            <td data-label="Schedule Start"> {{item.start}}</td>
                            <td data-label="Status"><span :class="item.status_color">{{item.status_text}}</span></td>
                            <td data-label="Action">
                                <button type="button" class="btn btn-primary btn-round btn-sm"
                                        @click="selectItem(item, 'Edit')">
                                    <i class="fa fa-edit"></i>
                                </button>

                                <button type="button" class="btn btn-info btn-round btn-sm"
                                        @click="selectMatch(item)">
                                    <i class="fas fa-question-circle"></i>
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


        <!--Edit Modal-->
        <div v-if="editModal" @close="editModal = false" class="modal sport-modal" id="myModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  modal-lg">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">{{form.type}} Match </h5>
                        <button type="button" class="close" @click="editModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Team 01</label>
                                    <input type="text" class="form-control" v-model="form.team1" @keyup="matchName()"
                                           placeholder="Team 01">
                                    <span class="text-danger" v-if="errors.team1">{{errors.team1[0]}}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Team 02</label>
                                    <input type="text" class="form-control" v-model="form.team2" @keyup="matchName()"
                                           placeholder="Team 02">
                                    <span class="text-danger" v-if="errors.team2">{{errors.team2[0]}}</span>
                                </div>
                            </div>

                        </div>

                        <div class="form-group">
                            <label>Match Name</label>
                            <input type="text" class="form-control" v-model="form.name" placeholder="Name">
                            <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                        </div>


                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Category</label>
                                    <select v-model="form.category_id" @change="getEvents(form.category_id)"
                                            class="form-control">
                                        <option v-for="lib in adminCategories" v-bind:value="lib.id">
                                            {{lib.name}}
                                        </option>
                                    </select>
                                    <span class="text-danger" v-if="errors.category_id">{{errors.category_id[0]}}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Event</label>
                                    <select v-model="form.event_id "
                                            class="form-control">
                                        <option v-for="eve in categoryEvents" v-bind:value="eve.id">
                                            {{eve.name}}
                                        </option>
                                    </select>
                                    <span class="text-danger" v-if="errors.event_id">{{errors.event_id[0]}}</span>
                                </div>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Start Date</label>
                                    <datetime format="YYYY-MM-DD H:i:s" width="300px" class="form-control"
                                              v-model="form.start"></datetime>
                                    <span class="text-danger" v-if="errors.start">{{errors.start[0]}}</span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>End Date</label>
                                    <datetime format="YYYY-MM-DD H:i:s" width="300px" v-model="form.end"></datetime>
                                    <span class="text-danger" v-if="errors.end">{{errors.end[0]}}</span>
                                </div>
                            </div>


                        </div>

                        <div class="form-group">
                            <label>Status</label>
                            <select v-model="form.status" class="form-control">
                                <option v-for="status in statuses" v-bind:value="status.value">
                                    {{status.text}}
                                </option>
                            </select>

                            <span class="text-danger" v-if="errors.status">{{errors.status[0]}}</span>
                        </div>

                    </div>

                    <div class="modal-footer p-3">
                        <button class="modal-sport-place mt-0" type="button" @click.prevent="saveMatchForm(form)">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!--Match Info Modal-->
        <div v-if="matchInfoModal" @close="matchInfoModal = false" class="modal sport-modal" id="matchInfoModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  modal-lg">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header ">
                        <h5 class="modal-title">{{match.name}} </h5>
                        <button type="button" class="close" @click="matchInfoModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div  class="modal-body text-left">
                        <div class="mb-2 media justify-content-between align-items-center">
                            <h6 class="text-white ">Question List

                                <button type="button" class="btn btn-sm btn-success btn-round "
                                        @click="addQuestion(match, 'Add')">
                                    <i class="fas fa-plus"></i> Add Question
                                </button>
                            </h6>


                            <button type="button" class="btn btn-sm btn-info btn-round "
                                    @click="addOption(match, 'Add')">
                                <i class="fas fa-plus-circle"></i> Add Option
                            </button>
                        </div>

                        <div v-for="question in (match.questions) " class="card bg-dark mb-3">
                            <div class="card-body">

                                <h6 class="card-title ">{{question.name}}
                                    <button v-if="question.result != 1" type="button" class="btn btn-sm btn-primary btn-round "
                                            @click="selectQuestion(question, 'Edit')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </h6>


                                <table class="table text-white">
                                    <thead>
                                    <tr>
                                        <th scope="col">Option Name</th>
                                        <th scope="col">Bet Amount</th>
                                        <th scope="col">Return Amount</th>
                                        <th scope="col">Min. Amount</th>
                                        <th scope="col">ratio</th>
                                        <th scope="col">status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="option in (question.options)">
                                        <th data-label="Option Name">{{option.option_name}}</th>
                                        <td data-label="Bet Amount">
                                            <span class="text-success">{{option.predict_amount}}</span>
                                        </td>
                                        <td data-label="Return Amount">
                                            <span class="text-info">{{option.interest_amount}}</span>

                                        </td>

                                        <td data-label="Min. Amount">{{option.minimum_amount}}</td>
                                        <td data-label="ratio">{{option.ratio}}</td>
                                        <td data-label="status"><span :class="option.status_color">{{option.status_text}}</span></td>
                                        <td data-label="Action">
                                            <button v-if="question.result !=1" type="button" class="btn btn-sm btn-info btn-round "
                                                    @click="selectOption(option, 'Edit')">
                                                <i class="fas fa-edit"></i>
                                            </button>

                                            <span v-else>-</span>

                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
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
                            <label>Match</label>
                            <select v-model="questionForm.match_id" class="form-control">
                                <option v-for="lib in adminMatches" v-bind:value="lib.id">
                                    {{lib.name}}
                                </option>
                            </select>
                            <span class="text-danger" v-if="errors.match_id">{{errors.match_id[0]}}</span>
                        </div>
                        <div class="form-group">
                            <label>End Date </label>
                            <datetime format="YYYY-MM-DD H:i:s" width="300px" typeable="true" v-model="questionForm.end"></datetime>
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


        <!--Option Modal Start-->
        <div v-if="optionModal" @close="optionModal = false" class="modal sport-modal" id="optionModal"
             style="display: block;overflow-y:auto;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog  ">
                <div class="modal-content darcula-bg ">
                    <div class="modal-header">
                        <h5 class="modal-title">{{optionForm.type}} Option </h5>
                        <button type="button" class="close" @click="optionModal = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <div class="form-group">
                            <label>Option Name</label>
                            <input type="text" class="form-control" v-model="optionForm.option_name"
                                   placeholder="Option Name">
                            <span class="text-danger" v-if="errors.option_name">{{errors.option_name[0]}}</span>
                        </div>


                        <div class="form-group">
                            <label>Question</label>
                            <select v-model="optionForm.question_id" class="form-control">
                                <option v-for="lib in (match.questions)" v-bind:value="lib.id">
                                    {{lib.name}}
                                </option>
                            </select>
                            <span class="text-danger" v-if="errors.question_id">{{errors.question_id[0]}}</span>
                        </div>

                        <div class="form-group">
                            <label>Minimum Bet amount</label>
                            <input type="text" class="form-control" v-model="optionForm.minimum_amount"
                                   placeholder="Minimum Bet amount">
                            <span class="text-danger" v-if="errors.minimum_amount">{{errors.minimum_amount[0]}}</span>
                        </div>
                        <div class="form-group">
                            <label>Ratio</label>
                            <input type="text" class="form-control" v-model="optionForm.ratio"
                                   placeholder="Ratio">
                            <span class="text-danger" v-if="errors.ratio">{{errors.ratio[0]}}</span>
                        </div>


                        <div class="form-group">
                            <label>Status</label>
                            <select v-model="optionForm.status" class="form-control">
                                <option v-for="status in statuses" v-bind:value="status.value">
                                    {{status.text}}
                                </option>
                            </select>

                            <span class="text-danger" v-if="errors.status">{{errors.status[0]}}</span>
                        </div>

                    </div>

                    <div class="modal-footer p-3">
                        <button class="modal-sport-place mt-0" type="button"
                                @click.prevent="saveOptionForm(optionForm)">
                            Save
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
                title: 'heeraexchange.in | Manage Matches',
            }
        },
        data() {
            return {
                editModal: false,
                matchInfoModal: false,
                questionModal: false,
                optionModal: false,
                form: {
                    id: '',
                    team1: '',
                    team2: '',
                    name: '',
                    category_id: '',
                    event_id: '',
                    status: '',
                    start: '',
                    end: '',
                    type: 'add'
                },
                statuses: [
                    {text: 'Active', value: 1},
                    {text: 'DeActive', value: 0}
                ],
                categoryEvents: [],
                questionForm: {
                    id: '',
                    match_id: '',
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
                optionForm: {
                    id: '',
                    match_id: '',
                    question_id: '',
                    option_name: '',
                    minimum_amount: '',
                    ratio: '',
                    status: '',
                    type: 'Add'
                },
            }
        },
        computed: {
            ...mapState(['adminCategories', 'adminMatches', 'pageLinks', 'pageMeta', 'match', 'question']),
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/adminMatches')
                .then(res => {

                    store.dispatch("setAdminCategoriesData", res.data.categories);
                    store.dispatch("setBasicData", res.data.basic);
                    store.dispatch("setAdminMatchesData", res.data.matches.data);
                    store.dispatch("setPageLinksData", res.data.matches.links);

                    let meta = {
                        per_page: res.data.matches.per_page,
                        current_page: res.data.matches.current_page,
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
                const {basic, categories, matches} = await this.$axios.$get(key);
                this.$store.dispatch('setAdminMatchesData', matches.data);
                this.$store.dispatch('setPageLinksData', matches.links);
                let meta = {
                    per_page: matches.per_page,
                    current_page: matches.current_page
                };
                this.$store.dispatch('setPageMetaData', meta);
            },
            getEvents(categoryId) {
                var _this = this;
                var list = this.adminCategories;
                var result = list.filter((obj) => {
                    if (obj.id === categoryId) {
                        _this.categoryEvents = obj.events
                    }
                });
            },
            matchName() {
                return this.form.name = `${this.form.team1} Vs ${this.form.team2}`
            },
            selectItem(item, type) {
                this.form.id = item.id;
                this.form.team1 = item.team1;
                this.form.team2 = item.team2;
                this.form.name = item.name;
                this.form.category_id = item.category_id;
                this.form.event_id = item.event_id;
                this.form.status = item.status;
                this.form.start = item.start;
                this.form.end = item.end;
                this.form.type = type;
                this.getEvents(item.category_id);
                this.editModal = true;
            },
            addItem(item, type) {
                this.form.id = '';
                this.form.team1 = '';
                this.form.team2 = '';
                this.form.name = '';
                this.form.category_id = '';
                this.form.event_id = '';
                this.form.status = 1;
                this.form.start = item.start;
                this.form.end = item.end;
                this.form.type = type;
                this.getEvents(this.form.category_id);
                this.editModal = true;
            },
            async saveMatchForm(form) {
                await this.$axios.$post('/matchUpdate', form)
                    .then(res => {
                        this.editModal = false;
                        Vue.$toast.open({
                            message: 'Saved Successfully',
                            type: 'success',
                            position: 'top-right'
                        });
                        var list = this.adminMatches;
                        if (form.type == "Edit") {
                            const result = list.map(function (obj) {
                                if (obj.id == res.id) {
                                    obj = res
                                }
                                return obj
                            });
                            this.$store.dispatch('setAdminMatchesData', result);
                        } else if (form.type == "Add") {
                            list.unshift(res);
                            this.$store.dispatch('setAdminMatchesData', list);
                        }
                    })
                    .catch(err => {
                    })
            },

            selectMatch(match) {
                this.$store.dispatch('setMatchData', match);
                this.matchInfoModal = true;
            },

            selectQuestion(item, type) {
                this.$store.dispatch('setQuestionData', item);
                this.questionForm.id = item.id;
                this.questionForm.match_id = item.match_id;
                this.questionForm.name = item.name;
                this.questionForm.status = item.status;
                this.questionForm.end = item.end_date;
                this.questionForm.type = type;
                this.questionModal = true;
                this.matchInfoModal = false;
            },

            addQuestion(match, type) {
                this.questionForm.id = '';
                this.questionForm.match_id = match.id;
                this.questionForm.name = '';
                this.questionForm.status = 1;
                this.questionForm.end = match.end_date;
                this.questionForm.type = type;
                this.questionModal = true;
                this.matchInfoModal = false;
            },
            async saveQuestionForm(questionForm) {
                var _this = this;
                await this.$axios.$post('/questionUpdate', questionForm)
                    .then(res => {
                        this.questionModal = false;
                        Vue.$toast.open({
                            message: 'Saved Successfully',
                            type: 'success',
                            position: 'top-right'
                        });
                        var list = this.adminMatches;
                        const result = list.map(function (obj) {
                            if (obj.id == res.id) {
                                obj = res
                            }
                            return obj
                        });
                        this.$store.dispatch('setAdminMatchesData', result);

                        _this.selectMatch(res)
                    })
                    .catch(err => {
                    })
            },

            selectOption(option, type) {
                this.matchInfoModal = false;
                this.optionModal = true;
                this.optionForm.id = option.id;
                this.optionForm.match_id = option.match_id;
                this.optionForm.question_id = option.question_id;
                this.optionForm.option_name = option.option_name;
                this.optionForm.minimum_amount = option.minimum_amount;
                this.optionForm.ratio = option.ratio;
                this.optionForm.status = option.status;
                this.optionForm.type = 'Edit'

            },
            addOption(match, type) {
                this.matchInfoModal = false;
                this.optionModal = true;
                this.optionForm.id = '';
                this.optionForm.match_id = match.id;
                this.optionForm.question_id = '';
                this.optionForm.option_name = '';
                this.optionForm.minimum_amount = 20;
                this.optionForm.ratio = 1.5;
                this.optionForm.status = 1;
                this.optionForm.type = type
            },
            async saveOptionForm(optionForm) {
                var _this = this;
                await this.$axios.$post('/optionUpdate', optionForm)
                    .then(res => {
                        this.optionModal = false;
                        Vue.$toast.open({
                            message: 'Saved Successfully',
                            type: 'success',
                            position: 'top-right'
                        });

                        var list = this.adminMatches;
                        const result = list.map(function (obj) {
                            if (obj.id == res.id) {
                                obj = res
                            }
                            return obj
                        });


                        this.$store.dispatch('setAdminMatchesData', result);

                        _this.selectMatch(res)
                    })
                    .catch(err => {
                    })
            },


        }

    }
</script>
