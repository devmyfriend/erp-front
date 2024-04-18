<script setup>
import { ref } from 'vue'

const props = defineProps({ titleText: String, bodyText: String, footerText: String, footerLink: String })

const titleText = ref( props.titleText || 'Lorem')
const bodyText = ref( props.bodyText || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, quia temporibus doloremque ex nam quod? Quas maiores reiciendis iure libero id, corporis et. Voluptatum eaque hic minima a voluptatem fugit.')
const footerText = ref( props.footerText || 'Ir a Módulo')
const footerLink = ref( props.footerLink || 'Menu')

</script>

<template>
    <div class="mainContainerItem">
        <slot name="Tittle">
            <h3> 
                {{ titleText }} 
            </h3>
        </slot>

        <slot name="Content">
            <div class="textContainer">
                <span> {{ bodyText }} </span>
            </div>
        </slot>
        <slot name="">
            <div class="footerContainer">
                <router-link :to="{name: `${footerLink}`}"> {{ footerText }}</router-link>
            </div>
        </slot>
    </div>
</template>

<style scoped>
*{
    color: #fff;
}
.mainContainerItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 17.5rem;
    width: 20rem;
    background-color: #232323;
    border-radius: 1rem;
    border: 1px solid #fff;
}

h3{
    text-transform: uppercase;
    font-size: 1.25rem;
    font-weight: 700;
    width: 100%;
    margin-top: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #fff;
}

.textContainer{
    margin-top: 0.5rem;
    flex-grow: 1;
    padding: 0rem 1.25rem;
    overflow-y: scroll;
    scrollbar-width: 0%;
    text-align: justify;
}

.textContainer::-webkit-scrollbar{
    width: 0%;
    height: 0%;
}

span{
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.25rem;
    text-align: justify;
}

.footerContainer{
    width: 100%;
    height: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0rem 0.5rem;
    font-weight: 600;
    letter-spacing: 0.25rem;
    align-items: center;
    justify-content: center;
    display: flex;
}

a{
    display: flex;
    color: #F16136;
    text-decoration: none;
    border: 1px solid #F16136;
    border-radius: 1rem;
    padding: 0.25rem 1rem;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 90%;
}
</style>