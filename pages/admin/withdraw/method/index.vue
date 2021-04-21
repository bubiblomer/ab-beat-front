<template>
    <div>
        <div class="chancer-container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section-title mt-2 mb-30 justify-content-between media">
                        <h2 class="title">Withdraw Method</h2>


                        <nuxt-link to="/admin/withdraw/method/add" class="btn btn-sm btn-success btn-round text-right">
                            <i class="fa fa-plus"></i> Add
                        </nuxt-link>

                    </div>


                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Gateway</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in gateways">
                            <td>
                                <img :src="item.logoPath" alt="..." class="img-logo">
                            </td>
                            <td data-label="Gateway">{{item.name}}</td>
                            <td data-label="Status">
                                <span class="badge"  :class="{'badge-success': (item.status ==1), 'badge-danger': (item.status ==0)  }">{{(item.status ==1) ? 'Active' : 'DeActive'}}</span>
                            </td>
                            <td data-label="Action">
                                <nuxt-link :to="{name: 'admin-withdraw-method-edit-id',params:{id: item.id }}" type="button"
                                           class="btn btn-primary btn-round">
                                    <i class="fa fa-edit"></i>
                                </nuxt-link>
                            </td>
                        </tr>


                        </tbody>
                    </table>


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
                title: 'heeraexchange.in | Withdraw Method',
            }
        },
        data() {
            return {
                gateways: [],
                selectedFile: null
            }
        },

        beforeMount() {
            this.getMethods();
        },

        methods: {
            async getMethods() {
                let {data} = await this.$axios.get('/methods');
                this.gateways = data;
            }
        }

    }
</script>

<style scoped>
    .img-logo {
        max-width: 120px;
    }
</style>