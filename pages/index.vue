<template>
    <div>
        <!--====== Sports Tab Start ======-->
        <section class="sports-type-tab py-2 py-lg-3">
            <div class="chancer-container">
                <div class="row justify-content-between align-items-center ">
                    <div class="col-sm-12 col-md-10">
                        <marquee v-if="0 < notices.length" width="100%" direction="left" height="100px">
                            <ul class="marqueeul">
                                <li v-for="(inform, index) in notices"><i
                                        class="fas fa-hand-point-right text-warning"></i> {{inform}}
                                </li>
                            </ul>
                        </marquee>
                    </div>

                    <div class="col-sm-12 col-md-2 ">
                        <button class="btn btn-sm btn-info float-right" @click="refresh"><i class="fa fa-sync"></i>
                            Refresh
                        </button>
                    </div>

                </div>

            </div>
            <div class="chancer-container">
                <no-ssr>
                    <VueSlickCarousel :dots="false" v-bind="settings"
                                      class="nav nav-tabs sports-type-nav sports-type-slider-xs">
                        <li class="nav-item">
                            <a class="nav-link" @click.prevent="setActive('all-sports')"
                               :class="{ active: isActive('all-sports') }"
                               href="#all-sports">
                                <span class="icon"> <i class="fal fa-trophy-alt"></i></span>
                                ALL SPORTS
                            </a>
                        </li>
                        <li class="nav-item" v-for="(category, index) in categories" @click="changeCategory(category)">

                            <a class="nav-link" @click.prevent="setActive('tennis-'+category.id)"
                               :class="{ active: isActive('tennis-'+category.id) }"
                               href="#tennis">
                                <span class="icon" v-html="category.icon">  </span>
                                {{category.name}}
                            </a>
                        </li>

                    </VueSlickCarousel>
                </no-ssr>

                <div class="tab-content py-3" id="amrTabContent">
                    <div class="tab-pane fade" :class="{ 'active show': isActive('all-sports') }" id="all-sports">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 mb-30">
                                <div class="live__matches">
                                    <h3 class="live__title">Live Matches</h3>
                                    <div v-for="(sports, index) in allSports" class="match__item "
                                         :class="(index == 0) ? 'open active' : ''">
                                        <div class="match__title">
                                            <div class="title__thumb"
                                                 v-html="(sports.category) ? sports.category.icon :''">
                                            </div>
                                            <div class="title__content">
                                                <div class="d-flex mb-1">
                                                    <span class="team__name">   {{sports.team1}}</span>
                                                    <span class="vs mx-2">vs</span>
                                                    <span class="team__name">{{sports.team2}}</span>
                                                </div>
                                                <div class="title__content__info"
                                                     v-html="(sports.event) ? sports.event.name :''">

                                                </div>
                                                <div class="title__content__info text-white" v-html="sports.start_date">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="match__body">
                                            <div v-for="(question, index) in sports.questions"
                                                 class="match__body__item">
                                                <h6 class="match__body__item__title">
                                                    {{question.name}} <span class="badge badge-success ml-2">Live</span>
                                                </h6>
                                                <ul class="match__prediction">
                                                    <li v-for="(option) in question.options">
                                                        <a href="javascript:void(0)"
                                                           @click="selectOption(option)">
                                                            {{option.option_name}} <span
                                                                class="odd">{{option.ratio}}</span></a>
                                                    </li>

                                                </ul>
                                            </div>

                                        </div>
                                    </div>


                                </div>
                            </div>


                            <div class="col-lg-6 mb-30">
                                <div class="live__matches">
                                    <h3 class="live__title">Upcoming Matches</h3>

                                    <div v-for="(sports, index) in upcomingSports" class="match__item "
                                         :class="(index == 0) ? 'open active' : ''">
                                        <div class="match__title">
                                            <div class="title__thumb" v-html="sports.category.icon">
                                            </div>
                                            <div class="title__content">
                                                <div class="d-flex mb-1">
                                                    <span class="team__name"> {{sports.team1}}</span>
                                                    <span class="vs mx-2">vs</span>
                                                    <span class="team__name">{{sports.team2}}</span>
                                                </div>
                                                <div class="title__content__info" v-html="sports.event.name">

                                                </div>
                                                <div class="title__content__info text-white" v-html="sports.start_date">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="match__body">
                                            <div v-for="(question, index) in sports.questions"
                                                 class="match__body__item">
                                                <h6 class="match__body__item__title">
                                                    {{question.name}} <span
                                                        class="badge badge-secondary ml-2">Upcoming</span>
                                                </h6>
                                                <ul class="match__prediction">
                                                    <li v-for="(option) in question.options">

                                                        <a href="javascript:void(0)"
                                                           @click="selectOption(option)">
                                                            {{option.option_name}} <span
                                                                class="odd">{{option.ratio}}</span></a>
                                                    </li>

                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div v-for="(category, index) in categories" class="tab-pane fade "
                         :class="{ 'active show': isActive('tennis-'+category.id) }" id="tennis">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 mb-30">
                                <div class="live__matches">
                                    <h3 class="live__title">Live Matches</h3>
                                    <div v-for="(sports, index) in allSports_filter" class="match__item "
                                         :class="(index == 0) ? 'open active' : ''">
                                        <div class="match__title">
                                            <div class="title__thumb"
                                                 v-html="(sports.category) ? sports.category.icon:''">
                                            </div>
                                            <div class="title__content">
                                                <div class="d-flex mb-1">
                                                    <span class="team__name">{{sports.team1}}</span>
                                                    <span class="vs mx-2">vs</span>
                                                    <span class="team__name">{{sports.team2}}</span>
                                                </div>
                                                <div class="title__content__info" v-html="sports.event.name">

                                                </div>
                                                <div class="title__content__info text-white" v-html="sports.start_date">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="match__body">
                                            <div v-for="(question, index) in sports.questions"
                                                 class="match__body__item">
                                                <h6 class="match__body__item__title">
                                                    {{question.name}} <span class="badge badge-success ml-2">Live</span>
                                                </h6>
                                                <ul class="match__prediction">
                                                    <li v-for="(option) in question.options">
                                                        <a href="javascript:void(0)"
                                                           @click="selectOption(option)">
                                                            {{option.option_name}} <span
                                                                class="odd">{{option.ratio}}</span></a>
                                                    </li>

                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div class="col-lg-6 mb-30">
                                <div class="live__matches">
                                    <h3 class="live__title">Upcoming Matches</h3>

                                    <div v-for="(sports, index) in upcoming_filter" class="match__item "
                                         :class="(index == 0) ? 'open active' : ''">
                                        <div class="match__title">
                                            <div class="title__thumb"
                                                 v-html="(sports.category) ? sports.category.icon:''">
                                            </div>
                                            <div class="title__content">
                                                <div class="d-flex mb-1">
                                                    <span class="team__name"> {{sports.team1}}</span>
                                                    <span class="vs mx-2">vs</span>
                                                    <span class="team__name">{{sports.team2}}</span>
                                                </div>
                                                <div class="title__content__info" v-html="sports.event.name">

                                                </div>
                                                <div class="title__content__info text-white" v-html="sports.start_date">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="match__body">
                                            <div v-for="(question, index) in sports.questions"
                                                 class="match__body__item">
                                                <h6 class="match__body__item__title">
                                                    {{question.name}} <span
                                                        class="badge badge-secondary ml-2">Upcoming</span>
                                                </h6>
                                                <ul class="match__prediction">
                                                    <li v-for="(option) in question.options">
                                                        <a href="javascript:void(0)"
                                                           @click="selectOption(option)">
                                                            {{option.option_name}} <span
                                                                class="odd">{{option.ratio}}</span></a>
                                                    </li>

                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </section>
        <!--====== Sports Tab End ======-->

        <div v-if="showModel" @close="showModel = false" class="modal sport-modal" id="myModal" style="display: block;"
             data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content ">
                    <div class="modal-header">
                        <h5 class="modal-title">Placing a bet</h5>
                        <button type="button" class="close" @click="showModel = false" data-dismiss="modal"><i
                                class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body" v-if="selectedData">
                        <p class="modal-sport-wager-title">
                            <span class="modal-sport-wager" v-html="selectedData.option_name"></span>
                            <span class="modal-sport-wager-count" v-html="selectedData.ratio"></span>
                        </p>
                        <p class="modal-sport-confrontation" v-html="selectedData.question_name"></p>
                        <div class="stepper-sport ">
                            <div class="stepper ctrl">
                                <div class="ctrl__counter">
                                    <input class="form-input stepper-input ctrl__counter-input" type="number"
                                           data-zeros="true" v-model="form.amount" @keyup="calc(form.amount)"
                                           :min="selectedData.minimum_amount"
                                           :max="999999">
                                </div>
                                <span class="stepper-arrow up  ctrl__button  ctrl__button--increment "
                                      @click="increment()"><i
                                        class="far fa-plus"></i></span>
                                <span class="stepper-arrow down ctrl__button ctrl__button--decrement"
                                      @click="decrement()"><i
                                        class="far fa-minus"></i></span>
                            </div>
                        </div>


                        <span class="text-danger" v-if="errors.requestAmount">{{errors.requestAmount[0]}}</span>
                        <span class="text-danger" v-if="errors.betOption">{{errors.betOption[0]}}</span>
                    </div>

                    <div class="modal-footer">
                        <p class="modal-sport-bets">
                            <span class="modal-sport-bets-left">Minimum Amount of Bet</span>
                            <span class="modal-sport-bets-right">{{minimumAmo}}{{basic.currency_symbol}}</span>
                        </p>

                        <p class="modal-sport-stake">
                            <span class="modal-sport-stake-left">Charge Apply <small> (IF YOU WIN) </small></span>
                            <span class="modal-sport-stake-right">{{basic.win_charge}}%</span>
                        </p>
                        <p class="modal-sport-win">
                            <span class="modal-sport-win-left">RETURN AMOUNT</span>
                            <span class="modal-sport-win-right">{{ratio}}{{basic.currency_symbol}}</span>
                        </p>


                        <button class="modal-sport-place" type="button" @click.prevent="submitPeriodForm(form)">place
                            bet
                        </button>


                        <button class="btn btn-dark btn-sm" type="button" @click.prevent="addToSlip(selectedData)">
                            <i class="fa fa-plus-circle"></i> Add To Slip
                        </button>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>
    .marqueeul {
        display: flex;
    }

    .marqueeul li {
        padding: 30px 0;
        margin: 0 10px;
        position: relative;
    }

</style>
<script>

    import Vue from 'vue'
    import {mapState, Store } from 'vuex'
    import VueSlickCarousel from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
    import backgroundImagePath from '~/assets/img/hero.jpg'

    import {BootstrapVue} from 'bootstrap-vue'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    Vue.use(BootstrapVue);


    import Pusher from 'pusher-js'


    export default {
        components: {VueSlickCarousel},
        data() {
            return {
                backgroundImagePath,
                showModel: false,
                activeItem: 'all-sports',
                activeCategoryName: 'all-sports',
                form: {
                    amount: '',
                },
                minimumAmo: '',
                ratio: 0,
                selectedData: {},
                allSports_filter: [],
                upcoming_filter: [],
                settings: {
                    "arrows": false,
                    "infinite": true,
                    "slidesToShow": 6,
                    "slidesToScroll": 1,
                    "speed": 500,
                    "responsive": [
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 2,
                                arrows: true
                            }
                        },
                        {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                arrows: true
                            }
                        },
                        {
                            breakpoint: 380,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: true
                            }
                        },
                    ]
                },
            }
        },
        computed: {
            ...mapState(['basic', 'categories', 'allSports', 'upcomingSports', 'notices', 'listener', 'betSlip']),
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/allSports')
                .then(res => {
                    store.dispatch("setCategoriesData", res.data.categories);
                    store.dispatch("setAllSportsData", res.data.list);
                    store.dispatch("setUpcomingSportsData", res.data.upcoming);
                    store.dispatch("setBasicData", res.data.basic);
                    store.dispatch("setNoticesData", res.data.notices);
                    store.dispatch("setListenerData", res.data.listener);
                })
                .catch(err => {
                });
        },
        mounted() {
            var _this = this;

            var pusher = new Pusher(_this.listener.APP_KEY, {
                cluster: _this.listener.APP_CLUSTER
            });

            var channel = pusher.subscribe('match-notification');
            channel.bind('App\\Events\\MatchNotification', function (data) {
                if (data && data.type == 'Edit') {
                    _this.updateEventData(data)
                } else if (data && data.type != 'Edit') {
                    _this.enlistedEventData(data)
                }
            });



        },
        methods: {
            refresh() {
                this.$router.app.refresh()
            },
            isActive(menuItem) {
                return this.activeItem === menuItem
            },
            setActive(menuItem) {
                this.activeItem = menuItem
            },

            changeCategory(category) {
                var _this = this;
                if (category === 'all-sports') {
                    result = _this.allSports;
                    upcomingResult = _this.upcomingSports;
                    _this.activeCategoryName = 'all-sports';
                } else {
                    const category_id = category.id;
                    _this.activeCategoryName = category.id;

                    var list = _this.allSports;
                    var result = list.filter((obj) => {
                        if (obj.category_id === category_id) {
                            return obj;
                        }
                    });
                    var upcomingList = _this.upcomingSports;
                    var upcomingResult = upcomingList.filter((obj) => {
                        if (obj.category_id === category_id) {
                            return obj;
                        }
                    });
                }
                _this.allSports_filter = result;
                _this.upcoming_filter = upcomingResult;
            },
            selectOption(option) {
                this.selectedData = option;
                this.form.amount = option.minimum_amount;
                this.ratio = parseFloat(option.minimum_amount * option.ratio).toFixed(2);
                this.minimumAmo = option.minimum_amount;
                this.showModel = true
            },
            decrement() {
                if (this.form.amount > this.minimumAmo) {
                    this.form.amount--;
                    this.ratio = parseFloat(this.form.amount * this.selectedData.ratio).toFixed(2);
                    return 0;
                }
                return 1;
            },
            increment() {
                this.form.amount++;
                this.ratio = parseFloat(this.form.amount * this.selectedData.ratio).toFixed(2);
                return 0;
            },
            calc(val) {
                if (isNaN(val)) {
                    val = 0
                }
                if (0 >= val) {
                    val = 0;
                }
                this.ratio = parseFloat(val * this.selectedData.ratio).toFixed(2);
            },
            async submitPeriodForm(form) {
                var _this = this;
                _this.showModel = false;
                await this.$axios.$post('/betNow', {
                    requestAmount: form.amount,
                    betOption: this.selectedData,
                })
                    .then(data => {

                        if (data.errors) {
                            Vue.$toast.open({
                                message: '' + data.errors,
                                type: 'error',
                                position: 'top-right'
                            });
                        }


                        if (data.success) {
                            Vue.$toast.open({
                                message: '' + data.success,
                                type: 'success',
                                position: 'top-right'
                            });
                            this.$auth.setUser(data.user);
                        }
                    })
                    .catch(err => {
                    });
            },

            updateEventData(data) {
                var _this = this;
                var list = this.allSports;
                const result = list.map(function (obj) {
                    if (obj.id == data.match.id) {
                        obj = data.match
                    }
                    return obj
                });
                this.$store.dispatch('setAllSportsData', result);

                var allSportsfilterList = this.allSports_filter;
                if (0 < allSportsfilterList.length) {
                    var filterResult = allSportsfilterList.map((obj) => {
                        if (obj.id == data.match.id) {
                            obj = data.match;
                        }
                        return obj
                    });
                    _this.allSports_filter = filterResult
                }

                var upcomingList = this.upcomingSports;
                const upcomingResult = upcomingList.map(function (obj) {
                    if (obj.id == data.match.id) {
                        obj = data.match
                    }
                    return obj
                });
                this.$store.dispatch('setUpcomingSportsData', upcomingResult);

                var upcommingFilterList = this.upcoming_filter;
                if (0 < upcommingFilterList.length) {
                    var upcommingFilterResult = upcommingFilterList.map((obj) => {
                        if (obj.id == data.match.id) {
                            obj = data.match;
                        }
                        return obj
                    });
                    _this.upcoming_filter = upcommingFilterResult
                }
            },


            enlistedEventData(data) {
                var _this = this;
                if (data && data.type == 'Enlisted') {
                    var list = _this.allSports;
                    list.push(data.match);
                    _this.$store.dispatch('setAllSportsData', list);
                }
                if (data && data.type == 'UpcomingList') {
                    var upcomingList = _this.upcomingSports;
                    upcomingList.push(data.match);
                    _this.$store.dispatch('setUpcomingSportsData', upcomingList);
                }
            },

            addToSlip(data) {
                var _this = this;

                _this.showModel = false;
                _this.$store.state.betSlip.push(data);
                var betSlipLog = _this.$store.getters.betSlip;
                var newSlip = betSlipLog.filter((v, i, a) => a.findIndex(t => (t.question_id  === v.question_id )) === i)
                localStorage.setItem("newBetSlip", JSON.stringify(newSlip) );

                Vue.$toast.open({
                    message: 'Added to Bet Slip',
                    type: 'success',
                    position: 'top-right'
                });

            },

        }
    }
</script>
