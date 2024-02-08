<template>
    <div>
        <buttom class="btn item">
            <img src="../../../assets/img/favico/hamburguesas.svg" />
        </buttom>
    </div>
    <div class="menu">
        <button v-for="item in items" class="btn subitems">
            <center>
                <img :src="item.icono" @click="goTo(item.pathname)">
            </center>
        </button>
        <button class="btn subitems">
            <center>
                <img src="../../../assets/img/favico/UnidadMedida.svg">
            </center>
        </button>
        <!--<button class="btn subitems">
            <center>
                <img src="../../../assets/img/favico/UnidadMedida.svg">
            </center>
        </button> -->
        <!-- <button class="btn subitems">
            <center>
                <img src="../../../assets/img/favico/conversiones.svg">
            </center>
        </button>
        <button class="btn subitems">
            <center>
                <img src="../../../assets/img/favico/ListaPrecios.svg">
            </center>
        </button>
        <button class="btn subitems">
            <center>
                <img src="../../../assets/img/favico/SAT.svg">
            </center>
        </button> -->
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    export default{
        name:'FabIcon',
        props:{
            items:{
                type: Array
            }
        },
        setup( props ){
            const items = ref( props.items)

            const router = useRouter()

            const goTo = ( path )=>{
                router.push( { name: path } )
            }

            return{
                items,
                goTo
            }
        }
    }

</script>

<style lang="scss" scoped>

    .menu{
        width: 3.125em;
        position: absolute;
        right: 2.5em;
        bottom: 2.625em;
        margin-bottom: 3.625em;
    }
    .subitems{
        width: 3.125em;
        height: 3.125em;
        background-color: #999999;
        color: #000;
        border-radius: 100%;
        margin-bottom: 1em;
        // position:sticky;
        // bottom: 2.625em;
        // right: 2.5em;
    }
    .item{
        width: 3.125em;
        height: 3.125em;
        background-color: #999999;
        color: #000;
        border-radius: 100%;
        position: absolute;
        bottom: 2.625em;
        right: 2.5em;
        
    }
    .item:hover{
        width: 3.125em;
        height: 3.125em;
        background-color: #999999;
        color: #fff;
        border-radius: 100%;
        position: absolute;
        bottom: 2.625em;
        right: 2.5em;

        img:hover{
            color: #fff;
        }
    }
    

</style>