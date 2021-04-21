<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Manage User</h2>

                        <form @submit.prevent="searchItem">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="form-outline">
                                        <input type="text" v-model.trim="form.search"
                                               class="form-control bg-transparent text-white"/>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-sm">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in adminUsers">
                            <th data-label="#">
                                {{ (pageMeta.per_page * (pageMeta.current_page - 1)) + (++index)}}

                            </th>
                            <td data-label="Name">
                                <p>{{item.name}}</p>
                            </td>
                            <td data-label="Username">
                                <p>{{item.username}}</p>
                            </td>
                            <td data-label="Email">
                                <p>{{item.email}}</p>
                            </td>
                            <td data-label="Mobile">
                                <p>{{item.mobile}}</p>
                            </td>

                            <td data-label="Balance">
                                <p>{{basic.currency_symbol}} {{item.balance}} </p>
                            </td>

                            <td data-label="Status">
                                <span v-text="item.status == 1 ? 'Active' : 'Blocked'"
                                      :class="item.status == 1 ? 'badge badge-success' : 'badge badge-danger'"></span>
                            </td>

                            <td data-label="Action">
                                <NuxtLink :to="{name: 'admin-user-id', params:{id: item.id }}"
                                          class="btn btn-primary btn-sm">
                                    <i class="fa fa-eye"></i>
                                </NuxtLink>
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


    </div>
</template>


<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'
    import {BootstrapVue} from 'bootstrap-vue'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import UserSidebar from '@/components/Admin/UserSidebar'


    export default {
        layout: 'admin',
		comments: {UserSidebar},
        head() {
            return {
                title: 'heeraexchange.in | Manage Users',
            }
        },
        data() {
            return {
                form: {
                    search: ''
                }
            }
        },
        computed: {
            ...mapState(['basic', 'adminUsers', 'pageLinks', 'pageMeta']),
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/adminUsers')
                .then(res => {
                    store.dispatch("setAdminUsersData", res.data.data);
                    store.dispatch("setPageLinksData", res.data.links);

                    let meta = {
                        per_page: res.data.per_page,
                        current_page: res.data.current_page,
                    };
                    store.dispatch('setPageMetaData', meta);
                })
                .catch(err => {
                });
        },
        methods: {
            async loadMore(key) {
                const res = await this.$axios.$get(key);
                this.$store.dispatch('setAdminUsersData', res.data);
                this.$store.dispatch('setPageLinksData', res.links);
                let meta = {
                    per_page: res.per_page,
                    current_page: res.current_page
                };
                this.$store.dispatch('setPageMetaData', meta);
            },
            async searchItem() {
                var _this = this;
                await this.$axios.$get('adminUsers?' + 'search=' + this.form.search, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        console.log(res);
                        _this.$store.dispatch("setAdminUsersData", res.data);
                        _this.$store.dispatch("setPageLinksData", res.links);

                        let meta = {
                            per_page: res.per_page,
                            current_page: res.current_page,
                        };
                        _this.$store.dispatch('setPageMetaData', meta);
                    })
                    .catch(err => {
                    })
            }
        }

    }
</script>