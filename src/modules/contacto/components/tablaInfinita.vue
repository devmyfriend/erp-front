
<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import ScrollInfinito from './ScrollInfinito.vue'
    import Card from './Card.vue'
    const {Lista,value}=defineProps({
      Lista:Array,
      value:Number
    })
    let items = ref([])
    let limit = ref(10)
    let offset = ref(0)

    console.log("Lista",Lista)
    //Seccion temporal en lo que se realiza el back de obtener contacto paginado
   


    const generaContacto = (limit,offset,delay = 1000) =>{
      
        const parte =  Lista.slice(offset.value,offset.value+limit.value)
        offset.value = limit.value + 1
        limit = limit.value + offset.value
       
        return parte

      /* return new Promise((resolve) =>{
          const newData = Array(limit)
          .fill(0)
          .map((_,index) => index + offset * limit +1)
       
          setTimeout(resolve,delay,newData)
         
   
         })*/
        }
    const loadItems = async() =>{
     
      console.log('List',Lista.length)
       if(limit.value <= Lista.length){
        
        const newItems = await generaContacto(limit,offset)
        console.log('newItems',newItems)
        items.value =[...items.value, ...newItems];
        console.log('items',items.value)
       
        
       }
       if (offset.value >= Lista.length) {
          console.log('Ya hemos cargado todos los elementos de Lista.');
          return;
        } 
      
    }

  /*props: {
    Lista: Array,
  }
 
    const data = ref([1, 2, 3, 4, 5, 6])

function onLoadMore() {
  console.log('entree')
  const length = data.value.length + 1
  data.value.push(...Array.from({ length: 5 }, (_, i) => length + i))
}
    /*const scrollComponent = ref(null);
    const loading = ref(false);
    const cantidadLista = 3; // Número de elementos a cargar en cada carga
    const filteredList = ref([])
    const tempIndex = ref(0)
    const tamanioLista = props.Lista.length
    // Función para cargar más elementos
    
   

    const obtenerSeccionContacto = (inicio,fin) =>{
      
        let c = props.Lista.slice(inicio,fin);  
        tempIndex.value = fin
     
        console.log("tempIndex actual",tempIndex.value)
        
        return c


    }
   
    
    const contactos = ref(obtenerSeccionContacto(tempIndex.value,tempIndex.value + cantidadLista));


    const loadMoreItems = () => {
      
      if(tempIndex.value + cantidadLista < tamanioLista){
            console.log("entre suma ",tempIndex.value + cantidadLista)
            console.log("tamaño ",tamanioLista)
        loading.value = true;
   
            setTimeout(() => {
                // Simula una carga asíncrona (puedes reemplazar esto con tu lógica de carga real)
            
                contactos.value.push(...props.Lista.slice(tempIndex.value, tempIndex.value + cantidadLista));
                console.log("contacto",contactos.value);
                tempIndex.value = tempIndex.value + cantidadLista
                console.log("tempIndex actual en loadItems",tempIndex.value)
                loading.value = false;
            }, 1000); // Simula una demora de 1 segundo (ajusta según tus necesidades)

                }
      
    };

    
    
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
      let element = scrollComponent.value;
      
            if (element.getBoundingClientRect().bottom < window.innerHeight) {
                loadMoreItems()
            }

    };

*/




</script>
<template>
 <!--  <ScrollInfinito class="cards" @infinite = "loadItems">
    
   <Card v-for="item in items" :value="item" :key="item"></Card>
  


  </ScrollInfinito>
 -->
  <table class="table">
    <thead>
    
    </thead>
    <tbody >

      <ScrollInfinito class="td" @infinite = "loadItems">

        <tr
          v-for="lc in items"
          :key="lc.ContactoId"
          @click="obtenerTelefonoCorreo(lc.ContactoId)"
         
        >
         
          <td>{{ lc.ContactoId }}</td>
                <td>{{ lc.Nombres }}</td>
                <td>{{ lc.Puesto }}</td>
                <td>
                  <span>
                    <img @click="m_actualizarContacto(lc.ContactoId)" class="icono " src="@/assets/img/edit-icon.png" />
                  </span>
                  <span>
                    <img @click="eliminarContacto(lc.ContactoId)" class="icono ms-3" src="@/assets/img/remove-icon.png" />
                  </span>
                </td>
        </tr>

      </ScrollInfinito>

        
   
 
    </tbody>
  </table>


</template>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';


.td tr td{
  width:10%;
}
.icono {
  width: 1.5rem;
}

.contenedor {
  align-items: right;
  width: 40.93rem;


  padding: 1.5rem 1.5rem 0rem 1.5rem;
  text-align: left;

}

h1 {

  font-size: 2rem;
  text-align: left;
}

h5,
h4 {
  color: black;

}
td{
    width: 2.18rem
}
</style>