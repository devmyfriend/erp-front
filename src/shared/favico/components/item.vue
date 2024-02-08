<template>
    <div>
        <buttom class="btn item"  @click="showMainMenu(showMenu)">
            <!-- <img src="../../../assets/img/favico/hamburguesas.svg" @click="showMainMenu(showMenu)" /> -->
            <img :src="menu.icono" />
        </buttom>
    </div>
    <div v-if="showMenu" class="menu">
        <div v-for="item in items">
            <button class="btn subitems" @click="goTo(item.pathname)">
                <center>
                    <img :src="item.icono" >
                </center>
            </button>
        </div>
        
    </div>
</template>

<script>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router'
    export default{
        name:'FabIcon',
        props:{
            menu:{
                type: Array
            },
            items:{
                type: Array
            }
        },
        setup( props ){
            const menu     = ref( props.menu )
            const items    = ref( props.items)

            const showMenu = ref( false )

            const router = useRouter()

            const showMainMenu = ( show )=>{
                showMenu.value = show === true? false : true
            }

            const goTo = ( path )=>{
                router.push( { name: path } )
            }

            return{
                items,
                showMenu,

                goTo,
                showMainMenu
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