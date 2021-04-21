export const strict = false;

export const state = () => ({
    betSlip: [],
    basic: {},
    runningMatches: 0,
    notices: [],
    listener: [],
    categories: [],
    adminCategories: [],
    adminMatches: {},
    allSports: [],
    upcomingSports: [],
    match: {},
    question: {},
    pageLinks: [],
    pageMeta: [],
    clubs: [],
    adminUsers: [],
    adminClubs: [],
    adminSingleUser: [],
    awaitingQuestions: [],
    awaitingSingleQuestion: {},
    awaitingSingleQuestionByOptions: {},
    questionInvestors: {},
    betInvestors: {},
    withdrawMethodList: [],
    gatewayCurrency: [],
    depositPayment: {},
    withdrawPayment: {},
    deposits: [],
    withdraws: [],
    adminGateway: [],
    adminDashboard: {},
    mailTemplate: '',
});


//getters
export const getters = {
    authenticated(state) {
        return state.auth.loggedIn;
    },
    user(state) {
        return state.auth.user;
    },
    clubs(state) {
        return state.clubs;
    },

    betSlip(state) {
        return state.betSlip;
    },
    notices(state) {
        return state.notices;
    },
    listener(state) {
        return state.listener;
    },
    categories(state) {
        return state.categories;
    },

    runningMatches(state) {
        return state.runningMatches;
    },
    allSports(state) {
        return state.allSports;
    },
    upcomingSports(state) {
        return state.upcomingSports;
    },

    basic(state) {
        return state.basic
    },
    match(state) {
        return state.match
    },
    question(state) {
        return state.question
    },
    pageLinks(state) {
        return state.pageLinks
    },
    pageMeta(state) {
        return state.pageMeta
    },
    adminCategories(state) {
        return state.adminCategories;
    },
    adminMatches(state) {
        return state.adminMatches;
    },
    adminUsers(state) {
        return state.adminUsers;
    },
    adminClubs(state) {
        return state.adminClubs;
    },
    adminSingleUser(state) {
        return state.adminSingleUser;
    },
    awaitingQuestions(state) {
        return state.awaitingQuestions;
    },

    awaitingSingleQuestion(state) {
        return state.awaitingSingleQuestion;
    },
    awaitingSingleQuestionByOptions(state) {
        return state.awaitingSingleQuestionByOptions;
    },
    questionInvestors(state) {
        return state.questionInvestors;
    },
    betInvestors(state) {
        return state.betInvestors;
    },


    // gatewayCurrency
    gatewayCurrency(state) {
        return state.gatewayCurrency;
    },
    depositPayment(state) {
        return state.depositPayment;
    },
    withdrawPayment(state) {
        return state.withdrawPayment;
    },

    deposits(state) {
        return state.deposits;
    },
    withdraws(state) {
        return state.withdraws;
    },
    adminGateway(state) {
        return state.adminGateway;
    },
    withdrawMethodList(state) {
        return state.withdrawMethodList;
    },
    adminDashboard(state) {
        return state.adminDashboard;
    },
    mailTemplate(state) {
        return state.mailTemplate;
    },


};


// mutations
export const mutations = {
    SET_BASIC_DATA(state, basic) {
        state.basic = basic
    },
    SET_CLUBS_DATA(state, clubs) {
        state.clubs = clubs
    },
    SET_BET_SLIP_DATA(state, betSlip) {
        state.betSlip = betSlip
    },


    UPDATE_USER_DATA(state, user) {
        state.auth.user = user;
    },
    SET_CATEGORIES_DATA(state, categories) {
        state.categories = categories
    },
    SET_ALL_SPORTS_DATA(state, allSports) {
        state.allSports = allSports
    },
    SET_UPCOMING_SPORTS_DATA(state, upcomingSports) {
        state.upcomingSports = upcomingSports
    },

    SET_RUNNING_MATCHES_DATA(state, runningMatches) {
        state.runningMatches = runningMatches
    },
    SET_NOTICES_DATA(state, notices) {
        state.notices = notices
    },
    SET_LISTENER_DATA(state, listener) {
        state.listener = listener
    },

    SET_MATCH_DATA(state, match) {
        state.match = match
    },
    SET_QUESTION_DATA(state, question) {
        state.question = question
    },

    SET_PAGE_LINKS_DATA(state, pageLinks) {
        state.pageLinks = pageLinks
    },
    SET_PAGE_META_DATA(state, pageMeta) {
        state.pageMeta = pageMeta
    },
    SET_ADMIN_CATEGORIES_DATA(state, adminCategories) {
        state.adminCategories = adminCategories
    },
    SET_ADMIN_MATCHES_DATA(state, adminMatches) {
        state.adminMatches = adminMatches
    },
    SET_ADMIN_USERS_DATA(state, adminUsers) {
        state.adminUsers = adminUsers
    },
    SET_ADMIN_CLUBS_DATA(state, adminClubs) {
        state.adminClubs = adminClubs
    },
    SET_ADMIN_SINGLE_USER_DATA(state, adminSingleUser) {
        state.adminSingleUser = adminSingleUser
    },

    SET_AWAITING_QUESTIONS_DATA(state, awaitingQuestions) {
        state.awaitingQuestions = awaitingQuestions
    },

    SET_AWAITING_SINGLE_QUESTION_DATA(state, awaitingSingleQuestion) {
        state.awaitingSingleQuestion = awaitingSingleQuestion
    },

    SET_AWAITING_SINGLE_QUESTION_BY_OPTIONS_DATA(state, awaitingSingleQuestionByOptions) {
        state.awaitingSingleQuestionByOptions = awaitingSingleQuestionByOptions
    },

    SET_QUESTION_INVESTORS_DATA(state, questionInvestors) {
        state.questionInvestors = questionInvestors
    },
    SET_BET_INVESTORS_DATA(state, betInvestors) {
        state.betInvestors = betInvestors
    },

    SET_GATEWAYCURRENCY_DATA(state, gatewayCurrency) {
        state.gatewayCurrency = gatewayCurrency;
    },
    SET_DEPOSITPAYMENT_DATA(state, depositPayment) {
        state.depositPayment = depositPayment;
    },
    SET_WITHDRAWPAYMENT_DATA(state, withdrawPayment) {
        state.withdrawPayment = withdrawPayment;
    },

    SET_DEPOSITS_DATA(state, deposits) {
        state.deposits = deposits;
    },
    SET_WITHDRAWS_DATA(state, withdraws) {
        state.withdraws = withdraws;
    },
    SET_ADMIN_GATEWAY_DATA(state, adminGateway) {
        state.adminGateway = adminGateway;
    },
    SET_WITHDRAW_METHOD_LIST_DATA(state, withdrawMethodList) {
        state.withdrawMethodList = withdrawMethodList;
    },

    SET_ADMIN_DASHBOARD_DATA(state, adminDashboard) {
        state.adminDashboard = adminDashboard;
    },

    SET_MAIL_TEMPLATE_DATA(state, mailTemplate) {
        state.mailTemplate = mailTemplate;
    },


};


// actions
export const actions = {

    setBasicData({commit}, basic) {
        commit("SET_BASIC_DATA", basic)
    },
    setBetSlipData({commit}, betSlip) {
        commit("SET_BET_SLIP_DATA", betSlip)
    },
    setClubsData({commit}, clubs) {
        commit("SET_CLUBS_DATA", clubs)
    },

    updateUserData({commit}, user) {
        commit("UPDATE_USER_DATA", user)
    },
    setCategoriesData({commit}, categories) {
        commit("SET_CATEGORIES_DATA", categories)
    },
    setAllSportsData({commit}, allSports) {
        commit("SET_ALL_SPORTS_DATA", allSports)
    },
    setUpcomingSportsData({commit}, upcomingSports) {
        commit("SET_UPCOMING_SPORTS_DATA", upcomingSports)
    },

    setRunningMatchesData({commit}, runningMatches) {
        commit("SET_RUNNING_MATCHES_DATA", runningMatches)
    },
    setMatchData({commit}, match) {
        commit("SET_MATCH_DATA", match)
    },
    setQuestionData({commit}, question) {
        commit("SET_QUESTION_DATA", question)
    },


    /// Paginate Meta & links
    setPageLinksData({commit}, pageLinks) {
        commit("SET_PAGE_LINKS_DATA", pageLinks)
    },
    setPageMetaData({commit}, pageMeta) {
        commit("SET_PAGE_META_DATA", pageMeta)
    },


    setAdminCategoriesData({commit}, adminCategories) {
        commit("SET_ADMIN_CATEGORIES_DATA", adminCategories)
    },

    setAdminMatchesData({commit}, adminMatches) {
        commit("SET_ADMIN_MATCHES_DATA", adminMatches)
    },
    setAdminUsersData({commit}, adminUsers) {
        commit("SET_ADMIN_USERS_DATA", adminUsers)
    },
    setAdminClubsData({commit}, adminClubs) {
        commit("SET_ADMIN_CLUBS_DATA", adminClubs)
    },
    setAdminSingleUserData({commit}, adminSingleUser) {
        commit("SET_ADMIN_SINGLE_USER_DATA", adminSingleUser)
    },


    setAwaitingQuestionsData({commit}, awaitingQuestions) {
        commit("SET_AWAITING_QUESTIONS_DATA", awaitingQuestions)
    },


    setAwaitingSingleQuestionData({commit}, awaitingSingleQuestion) {
        commit("SET_AWAITING_SINGLE_QUESTION_DATA", awaitingSingleQuestion)
    },
    setAwaitingSingleQuestionByOptionsData({commit}, awaitingSingleQuestionByOptions) {
        commit("SET_AWAITING_SINGLE_QUESTION_BY_OPTIONS_DATA", awaitingSingleQuestionByOptions)
    },
    setQuestionInvestorsData({commit}, questionInvestors) {
        commit("SET_QUESTION_INVESTORS_DATA", questionInvestors)
    },
    setBetInvestorsData({commit}, betInvestors) {
        commit("SET_BET_INVESTORS_DATA", betInvestors)
    },

    setGatewayCurrencyData({commit}, gatewayCurrency) {
        commit('SET_GATEWAYCURRENCY_DATA', gatewayCurrency)
    },
    setDepositPaymentData({commit}, depositPayment) {
        commit('SET_DEPOSITPAYMENT_DATA', depositPayment)
    },
    setWithdrawPaymentData({commit}, withdrawPayment) {
        commit('SET_WITHDRAWPAYMENT_DATA', withdrawPayment)
    },

    setDepositsData({commit}, deposits) {
        commit('SET_DEPOSITS_DATA', deposits)
    },
    setWithdrawsData({commit}, withdraws) {
        commit('SET_WITHDRAWS_DATA', withdraws)
    },

    setAdminGatewayData({commit}, adminGateway) {
        commit('SET_ADMIN_GATEWAY_DATA', adminGateway)
    },
    setWithdrawMethodListData({commit}, withdrawMethodList) {
        commit('SET_WITHDRAW_METHOD_LIST_DATA', withdrawMethodList)
    },
    setAdminDashboardData({commit}, adminDashboard) {
        commit("SET_ADMIN_DASHBOARD_DATA", adminDashboard)
    },
    setMailTemplateData({commit}, mailTemplate) {
        commit("SET_MAIL_TEMPLATE_DATA", mailTemplate)
    },
    setNoticesData({commit}, notices) {
        commit("SET_NOTICES_DATA", notices)
    },
    setListenerData({commit}, listener) {
        commit("SET_LISTENER_DATA", listener)
    },

};

