<template lang="es">
             <fieldset class="bg-dark p-2">
                  <select class="claveRegimenFiscal" name="claveRegimenFiscal" id="idClaveRegimenFiscal">
                      <option selected value="">Régimen Fiscal</option>
                      <option v-for="regimen in listaregimenes" :key="regimen.ClaveRegimenFiscal" :value="regimen.ClaveRegimenFiscal">{{regimen.Descripcion}}</option>
                  </select>
             </fieldset>

             <fieldset class="bg-dark p-2">
                  <select class="entidadNegocioId" name="entidadNegocioId" id="EntidadNegocioId">
                      <option selected value="">Empresas</option>
                      <option v-for="empresas in listaEmpresas" :key="empresas.EntidadNegocioId" :value="empresas.EntidadNegocioId">{{empresas.NombreOficial}}</option>
                  </select>
             </fieldset> 
</template>

<script>
import { ref, computed, onMounted } from 'vue'

const { useEmpresa } = require('../store/empresa')

export default {

  name: 'frmDatosGrenerales',

  setup( props ){
    const listaregimenes     = ref( [] )
    const listaEmpresas      = ref( [] )
    const pagActual = ref( 1 )
    const pagSig = ref( 2 )
    const pagAnt = ref( 1 )
    const pagUlt = ref( 1 )
    
      const store = useEmpresa()

      onMounted(() => {
          store.cargarRegimenes().then(() => {
              listaregimenes.value = store.listaPFisica
          }),
          store.cargarListadoEmpresas().then(() => {
            listaEmpresas.value = store.listaListadoEmpresas
          })
      })

      return{
          listaregimenes,
          listaEmpresas,
      }

  }

}

</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
h1 {
  color: #fff;
  font-size: 2rem;
  text-align: left;
}
fieldset {
  margin-top: .5rem;
  margin-bottom: .5rem;
}
.claveRegimenFiscal, .entidadNegocioId {
  border-radius: $radius;
  border: none;
  height: 2.02375rem;
  margin-right: .5rem;
  padding: $padding-input;
  width: 36.55rem;
  color:#999999
}
select{
  color: #999999
}

option {
  color: #999999;
}
</style>