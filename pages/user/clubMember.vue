<template>
    <div>
        <Breadcrumb title="Club Member"></Breadcrumb>

        <section class="contact-section-two" >
            <div class="chancer-container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="section-title p-4 justify-content-between media">
                            <h2 class="title">Club Member</h2>
                        </div>

                        <table class="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Joined At</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(trans, index) in users">
                                <th data-label="#">
                                    {{ (meta.per_page * (meta.current_page - 1)) + (++index)}}</th>

                                <td data-label="Username">
                                    {{trans.username}}
                                </td>
                                <td data-label="Joined At">{{trans.joined_at}}</td>
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
                title: 'heeraexchange.in  | Club Member',
            }
        },
        data(){
            return {
                users: [],
                links: [],
                meta: []
            }
        },
        async asyncData({$axios, store}){
            let {data} = await $axios.get('/clubMemberList');
            return {
                users: data.data,
                links: data.links,
                meta: data.meta
            }
        },
        methods:{
            async loadMore(key){
                let {data, links, meta} = await this.$axios.$get(key);
                this.users = data;
                this.links = links;
                this.meta = meta;
            }
        }
    }
</script>
