<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Manage Event </h2>


                        <button type="button" class="btn btn-sm btn-success btn-round text-right" @click="addItem(form, 'Add')">
                            <i class="fa fa-plus"></i> Add
                        </button>

                    </div>

                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in events">
                            <th data-label="#">{{ (meta.per_page * (meta.current_page - 1)) + (++index)}}</th>
                            <td data-label="Name">{{item.name}}</td>
                            <td data-label="Icon" v-html="item.category.name"></td>
                            <td data-label="Status"><span :class="item.status_color">{{item.status_text}}</span> </td>
                            <td data-label="Action">
                                <button type="button" class="btn btn-primary btn-round" @click="selectItem(item, 'Edit')">
                                    <i class="fa fa-edit"></i>
                                </button>
                            </td>
                        </tr>


                        </tbody>
                    </table>



                    <nav class="my-4  justify-content-between align-items-start d-flex " aria-label="Page navigation example">
                        <ul class="pagination  mr-auto " >
                            <li class="page-item" v-for="(key, value) in meta.links" :class="{disabled: key.url == null, active: key.active == true}">
                                <a  href="javascript:void(0)"  @click="loadMore(key.url)" class="page-link" v-html="key.label"></a>
                            </li>
                        </ul>
                    </nav>




                </div>
            </div>
        </div>




        <div  v-if="editModal" @close="editModal = false" class="modal sport-modal" id="myModal" style="display: block;" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content darcula-bg">
                    <div class="modal-header">
                        <h5 class="modal-title">{{form.type}} Event </h5>
                        <button type="button" class="close" @click="editModal = false" data-dismiss="modal"> <i class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">

                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="form.name"  placeholder="Name">
                            <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
                        </div>

                        <div class="form-group">
                            <label>Category</label>
                            <select v-model="form.category_id" class="form-control">
                                <option v-for="lib in adminCategories" v-bind:value="lib.id" >
                                    {{lib.name}}
                                </option>
                            </select>

                            <span class="text-danger" v-if="errors.category_id">{{errors.category_id[0]}}</span>
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
                        <button class="modal-sport-place mt-0" type="button"  @click.prevent="submitCategoryForm(form)">Save</button>
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
                title: 'heeraexchange.in | Manage Event',
            }
        },
        data() {
            return {
                editModal:false,
                form:{
                    id:'',
                    name:'',
                    category_id:'',
                    status:'',
                    type:'add',
                },
                statuses: [
                    { text: 'Active', value: 1 },
                    { text: 'DeActive', value: 0 }
                ],

                events: [],
                links: [],
                meta: [],
                selectedItem:{}
            }
        },

        beforeMount() {
            this.getEvents();
        },
        computed:{
            ...mapState(['adminCategories'])
        },
        async asyncData({$axios, store, redirect}) {
            var _this = this;
            await $axios.get('/activeCategory')
                .then(res => {
                    store.dispatch("setAdminCategoriesData", res.data.categories);
                    store.dispatch("setBasicData", res.data.basic);
                })
                .catch(err => {
                });
        },
        methods: {
            async getEvents(){
                let {data} = await this.$axios.get('/events');
                this.events= data.data;
                this.links= data.links;
                this.meta= data.meta
            },

            async loadMore(key) {
                let {data, links, meta} = await this.$axios.$get(key);
                this.events = data;
                this.links = links;
                this.meta = meta;
            },
            selectItem(item, type){
                this.form.id = item.id;
                this.form.name = item.name;
                this.form.category_id = item.category_id;
                this.form.status = item.status;
                this.form.type = type;
                this.editModal = true;
            },
            addItem(item, type){
                this.form.id = '';
                this.form.name = '';
                this.form.category_id = '';
                this.form.status = 1;
                this.form.type = type;
                this.editModal = true;
            },
            async submitCategoryForm(form){
                var _this = this;

                await this.$axios.$post('/eventUpdate', form)
                    .then(res => {
                        this.editModal = false;
                        Vue.$toast.open({
                            message: ''+res.success,
                            type: 'success',
                            position: 'top-right'
                        });
                        this.getEvents();
                    })
                    .catch(err =>{
                    })
            }

        }

    }
</script>