<template>
    <div>
        <ul class="list-group list-group-horizontal align-items-center text-center  text-white mb-2">
            <NuxtLink :to="{name: 'admin-user-id', params:{id: adminSingleUser.id }}" exact class="list-group-item darcula-bg">Profile
            </NuxtLink>
            <NuxtLink :to="{name: 'admin-user-bet-id', params:{id: adminSingleUser.id }}" exact class="list-group-item darcula-bg">Bet Log
            </NuxtLink>
            <NuxtLink :to="{name: 'admin-user-deposit-id', params:{id: adminSingleUser.id }}" exact class="list-group-item darcula-bg">Deposit Log
            </NuxtLink>
            <NuxtLink :to="{name: 'admin-user-withdraw-id', params:{id: adminSingleUser.id }}" exact class="list-group-item darcula-bg">Withdraw Log
            </NuxtLink>
            <NuxtLink :to="{name:'admin-user-commissionLog-id', params:{id: adminSingleUser.id }}" exact class="list-group-item darcula-bg">Commission Log
            </NuxtLink>
            <NuxtLink :to="{name: 'admin-user-transaction-id', params:{id: adminSingleUser.id }}" exact class="list-group-item darcula-bg">Transaction
            </NuxtLink>
        </ul>
    </div>
</template>
<style scoped>
    .list-group {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 100%;
    }
    .list-group-item {
        min-width: 200px;
    }
</style>
<script>
    import Vue from 'vue'
    export default {
        props: ['adminSingleUser'],
        data() {
            return {
                access: false
            }
        },
        methods: {}
    }
</script>