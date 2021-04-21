<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Manage Notice</h2>


                        <button type="button" class="btn btn-sm btn-success btn-round text-right" @click="addItem(form, 'Add')">
                            <i class="fa fa-plus"></i> Add
                        </button>

                    </div>

                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Details</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in categories">
                            <th data-label="#">{{ (meta.per_page * (meta.current_page - 1)) + (++index)}}</th>
                            <td data-label="Details">{{item.details}}</td>
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
                                <a  href="javascript:void(0)"  @click="loadMore(key.url)"  class="page-link" v-html="key.label"></a>
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
                        <h5 class="modal-title">{{form.type}} Notice </h5>
                        <button type="button" class="close" @click="editModal = false" data-dismiss="modal"> <i class="fal fa-times"></i></button>

                    </div>
                    <div class="modal-body text-left">
                        <div class="form-group">
                            <label>Details</label>
                            <textarea v-model="form.details" id="" class="form-control" rows="4"></textarea>
                            <span class="text-danger" v-if="errors.details">{{errors.details[0]}}</span>
                        </div>
                    </div>

                    <div class="modal-footer p-3 media">
                        <div class="row">
                            <div class="col-md-6" v-if="form.type =='Edit'">
                                <button class="btn btn-danger" type="button"  @click.prevent="deleteForm(form)">Delete</button>
                            </div>
                            <div class="col-md-6">
                                <button class="btn btn-warning  text-white" type="button"  @click.prevent="submitForm(form)">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import Vue from 'vue'
    export default {
        layout: 'admin',
        head() {
            return {
                title: 'heeraexchange.in | Manage Notice',
            }
        },
        data() {
            return {
                editModal:false,
                form:{
                    id:'',
                    details:'',
                    type:'add',
                },

                categories: [],
                links: [],
                meta: [],
                selectedItem:{}
            }
        },

        beforeMount() {
            this.getCategories();
        },

        methods: {
            async getCategories(){
                let {data} = await this.$axios.get('/notices');

                this.categories= data.data;
                this.links= data.links;
                this.meta= data.meta
            },
            async loadMore(key) {
                let {data, links, meta} = await this.$axios.$get(key);
                this.categories = data;
                this.links = links;
                this.meta = meta;
            },
            selectItem(item, type){
                this.form.id = item.id;
                this.form.details = item.details;
                this.form.type = type;
                this.editModal = true;
            },
            addItem(item, type){
                this.form.id = '';
                this.form.details = '';
                this.form.type = type;
                this.editModal = true;
            },
            async submitForm(form){
                var _this = this;

                await this.$axios.$post('/noticeUpdate', form)
                    .then(res => {
                        this.editModal = false;
                        Vue.$toast.open({
                            message: ''+res.success,
                            type: 'success',
                            position: 'top-right'
                        });
                        this.getCategories();
                    })
                    .catch(err =>{
                    })
            },
            async deleteForm(form){
                var _this = this;

                await this.$axios.$post('/noticeDelete', form)
                    .then(res => {
                        this.editModal = false;
                        Vue.$toast.open({
                            message: ''+res.success,
                            type: 'success',
                            position: 'top-right'
                        });
                        this.getCategories();
                    })
                    .catch(err =>{
                    })
            }

        }

    }
</script>