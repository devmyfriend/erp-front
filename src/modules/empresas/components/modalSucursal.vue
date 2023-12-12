<template>
    <div class="modal-background">
        <div class="modal-container">
            <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal-background{
        align-items: flex-start;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        height: 100vh;
        justify-content: flex-end;
        margin: 0rem 0rem 0rem -1rem ;
        padding: 0rem 0rem 0rem 0rem;
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .modal-container{
        background-color:#999999;
        height: 50.75rem;
        justify-content: flex-start;
        width: 40.84375rem;
        animation: abrirmodal ease 1s backwards ;
        margin: auto;
        z-index: 100;

        @keyframes abrirmodal {
            from{
                width: 0rem;
            }
            to{
                width: 40.84375rem;
            }
        }
        
    }
</style>