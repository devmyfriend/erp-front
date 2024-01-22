<template>
    <ScrollInfinito class="td" :Lista="Lista" @UpdateScroll="loadItems">
    <table class="table table-bordered border-2 border-dark rounded text-start">
      <thead>
        <tr>
          <th v-for="(encabezado, indice) in encabezados" :key="indice">
            {{ encabezado }}
          </th>
          <th>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.EntidadNegocioId">
            <td class="fila1">{{ item.NombreOficial }}</td>
            <td class="fila2">{{ item.RFC }}</td>
            <td class="fila3">{{ item.Telefono }}</td>
            <td class="fila4">{{ item.Direccion }}</td>
            <td class="Acciones text-center">
              <a class="mx-2 icono" @click="console.log('Actualizar ID: ' + item.EntidadNegocioId)"><img src="@/assets/img/edit.svg" alt="Editar"></a>
              <a class="mx-2 icono" @click="console.log('Borrar ID: ' + item.EntidadNegocioId)"><img src="@/assets/img/trash.svg" alt="Borrar"></a>          
            </td>
          </tr>
        </tbody>
      </table>
    </ScrollInfinito>
</template>

<script setup>
import ScrollInfinito from './ScrollInfinito.vue';
import { ref, toRefs, defineProps, onMounted } from 'vue';

const encabezados = ref([]);
/* const { Lista } = defineProps({
  Lista: Array,
}); */

const Lista = ref([
  {
    "EntidadNegocioId": "00000000001",
    "NombreOficial": "The fit gym",
    "RFC": "string",
    "esPropietaria": 1,
    "Telefono": "7854216843",
    "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
    "EntidadNegocioId": "00000000004",
    "NombreOficial": "Corporativo MyFriend",
    "RFC": "1594684534512",
    "esPropietaria": 1,
    "Telefono": "7854216843",
    "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
    "EntidadNegocioId": "00000000005",
    "NombreOficial": "The Fit Bar",
    "RFC": "7568491543268",
    "esPropietaria": 1,
    "Telefono": "7854216843",
    "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
    "EntidadNegocioId": "00000000006",
    "NombreOficial": "Empacadora de Frutos y Jugos",
    "RFC": "7564891643468",
    "esPropietaria": 0,
    "Telefono": "7854216843",
    "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
    "EntidadNegocioId": "00000000007",
    "NombreOficial": "Grupo Herdez, S.A.B. de C.V.",
    "RFC": "8765213496485",
    "esPropietaria": 0,
    "Telefono": "7854216843",
    "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
      "EntidadNegocioId": "00000000008",
      "NombreOficial": "Active Lifestyle Center",
      "RFC": "987654321",
      "esPropietaria": 1,
      "Telefono": "7854321098",
      "Direccion": "123 Fitness Street"
  },
  {
      "EntidadNegocioId": "00000000009",
      "NombreOficial": "Wellness Oasis",
      "RFC": "123456789",
      "esPropietaria": 1,
      "Telefono": "7854765432",
      "Direccion": "456 Health Avenue"
  },
  {
      "EntidadNegocioId": "00000000010",
      "NombreOficial": "Revitalize Hub",
      "RFC": "564738291",
      "esPropietaria": 0,
      "Telefono": "7854901234",
      "Direccion": "789 Vitality Lane"
  },
  {
      "EntidadNegocioId": "00000000011",
      "NombreOficial": "Purely Fresh",
      "RFC": "192837465",
      "esPropietaria": 0,
      "Telefono": "7854034567",
      "Direccion": "234 Freshness Boulevard"
  },
  {
      "EntidadNegocioId": "00000000012",
      "NombreOficial": "Energize Café",
      "RFC": "394857162",
      "esPropietaria": 1,
      "Telefono": "7854678901",
      "Direccion": "567 Energy Drive"
  },
  {
      "EntidadNegocioId": "00000000013",
      "NombreOficial": "FitFusion Express",
      "RFC": "928374651",
      "esPropietaria": 1,
      "Telefono": "7854012345",
      "Direccion": "890 Fitness Plaza"
  },
  {
      "EntidadNegocioId": "00000000014",
      "NombreOficial": "Organic Squeeze",
      "RFC": "837465192",
      "esPropietaria": 0,
      "Telefono": "7854456789",
      "Direccion": "123 Organic Avenue"
  },
  {
      "EntidadNegocioId": "00000000015",
      "NombreOficial": "Vitamin Boost",
      "RFC": "746192835",
      "esPropietaria": 0,
      "Telefono": "7854890123",
      "Direccion": "456 Vitamin Lane"
  },
  {
      "EntidadNegocioId": "00000000016",
      "NombreOficial": "Zen Wellness",
      "RFC": "384756291",
      "esPropietaria": 1,
      "Telefono": "7854035678",
      "Direccion": "789 Serenity Street"
  },
  {
      "EntidadNegocioId": "00000000017",
      "NombreOficial": "Nature's Bounty",
      "RFC": "384756291",
      "esPropietaria": 1,
      "Telefono": "7854012890",
      "Direccion": "234 Nature Road"
  },
  {
      "EntidadNegocioId": "00000000001",
      "NombreOficial": "The fit gym",
      "RFC": "string",
      "esPropietaria": 1,
      "Telefono": "7854216843",
      "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
      "EntidadNegocioId": "00000000004",
      "NombreOficial": "Corporativo MyFriend",
      "RFC": "1594684534512",
      "esPropietaria": 1,
      "Telefono": "7854216843",
      "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
      "EntidadNegocioId": "00000000005",
      "NombreOficial": "The Fit Bar",
      "RFC": "7568491543268",
      "esPropietaria": 1,
      "Telefono": "7854216843",
      "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
      "EntidadNegocioId": "00000000006",
      "NombreOficial": "Empacadora de Frutos y Jugos",
      "RFC": "7564891643468",
      "esPropietaria": 0,
      "Telefono": "7854216843",
      "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
      "EntidadNegocioId": "00000000007",
      "NombreOficial": "Grupo Herdez, S.A.B. de C.V.",
      "RFC": "8765213496485",
      "esPropietaria": 0,
      "Telefono": "7854216843",
      "Direccion": "alksjdalksdj aslñd asñldk aasd"
  },
  {
        "EntidadNegocioId": "00000000008",
        "NombreOficial": "Active Lifestyle Center",
        "RFC": "987654321",
        "esPropietaria": 1,
        "Telefono": "7854321098",
        "Direccion": "123 Fitness Street"
  },
  {
        "EntidadNegocioId": "00000000009",
        "NombreOficial": "Wellness Oasis",
        "RFC": "123456789",
        "esPropietaria": 1,
        "Telefono": "7854765432",
        "Direccion": "456 Health Avenue"
  },
  {
        "EntidadNegocioId": "00000000010",
        "NombreOficial": "Revitalize Hub",
        "RFC": "564738291",
        "esPropietaria": 0,
        "Telefono": "7854901234",
        "Direccion": "789 Vitality Lane"
  },
  {
        "EntidadNegocioId": "00000000011",
        "NombreOficial": "Purely Fresh",
        "RFC": "192837465",
        "esPropietaria": 0,
        "Telefono": "7854034567",
        "Direccion": "234 Freshness Boulevard"
  },
  {
        "EntidadNegocioId": "00000000012",
        "NombreOficial": "Energize Café",
        "RFC": "394857162",
        "esPropietaria": 1,
        "Telefono": "7854678901",
        "Direccion": "567 Energy Drive"
  },
  {
        "EntidadNegocioId": "00000000013",
        "NombreOficial": "FitFusion Express",
        "RFC": "928374651",
        "esPropietaria": 1,
        "Telefono": "7854012345",
        "Direccion": "890 Fitness Plaza"
  },
  {
        "EntidadNegocioId": "00000000014",
        "NombreOficial": "Organic Squeeze",
        "RFC": "837465192",
        "esPropietaria": 0,
        "Telefono": "7854456789",
        "Direccion": "123 Organic Avenue"
  },
  {
        "EntidadNegocioId": "00000000015",
        "NombreOficial": "Vitamin Boost",
        "RFC": "746192835",
        "esPropietaria": 0,
        "Telefono": "7854890123",
        "Direccion": "456 Vitamin Lane"
  },
  {
        "EntidadNegocioId": "00000000016",
        "NombreOficial": "Zen Wellness",
        "RFC": "384756291",
        "esPropietaria": 1,
        "Telefono": "7854035678",
        "Direccion": "789 Serenity Street"
  },
  {
        "EntidadNegocioId": "00000000017",
        "NombreOficial": "Nature's Bounty",
        "RFC": "384756291",
        "esPropietaria": 1,
        "Telefono": "7854012890",
        "Direccion": "234 Nature Road"
  }])

const { items, limit, offset } = toRefs({
  items: ref([]),
  limit: ref(7),
  offset: ref(0),
});

const getNewData = () => {
  const parte = Lista.value.slice(offset.value, offset.value + limit.value);
  offset.value = offset.value + limit.value;
  return parte;
};

const loadItems = async () => {
  if (limit.value <= Lista.value.length) {
    const newItems = await getNewData();
    items.value = [...items.value, ...newItems];
  }
  if (offset.value >= Lista.value.length) {
    return;
  }
};

const test = () => {
  loadItems();
};

onMounted(() => {
  encabezados.value = Object.keys(Lista.value[0]).filter((campo, indice) => indice > 0) || 0;
  encabezados.value.splice(2,1);
});

</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';

.icono {
  width: 1.5rem;
  cursor: pointer;
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
.td tr td {
  width: 10%;
}
th, td{
  padding: 0.5rem 0.5rem; 
  word-break: break-all;
  font-size: 0.75rem;
  height: 2.1875rem;
}
th{
  background-color: #999999;
  color: #FFFFFF;
  font-weight: normal; 
  text-align: center;
  vertical-align: middle;
}
td{
  background-color: #FFFFFF;
  color: #999999;
}


</style>