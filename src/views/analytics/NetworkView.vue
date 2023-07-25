<template>
    <div class="analysis-network-view">
        <div class="row" id="network-analysis-mini-links">
            <router-link :to='{ name: "network_explorer" }'>

                <div class="sub-nav-link">
                    <p>Explore Criminal Network</p>
                </div>
            </router-link>

            <div class="sub-nav-link">
                <p>Identify Dominant Criminal</p>
            </div>

            <div class="sub-nav-link">

            </div>
        </div>

        <router-view/>
    </div>
</template>

<script>

export default{
    components:{
    }

}
</script>