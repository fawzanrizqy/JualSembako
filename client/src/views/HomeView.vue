<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { mapActions, mapState } from 'pinia'
import { Bar } from 'vue-chartjs'
import { useDashboardStore } from '../stores/dashboardstore.js'
import { useItemStore } from '../stores/itemstore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default{
name: 'HomeView',
components: {
    Bar
  },
  computed:
  {
	...mapState(useDashboardStore,['initial']),
	...mapState(useItemStore,['itemList']),
	chartData() { return this.initial },
  },
  methods:
  {
 	...mapActions(useDashboardStore,['initialView','byItem']),
 	...mapActions(useItemStore,['fetchItem']),
	changeSelect(val)
	{
		this.byItem(val)
	}
  },
  data() {
    return {
      data: {
        selectedItem:""
      },
      options: {
        responsive: true,	
      }
    }
  },
  created()
  {
    // this.initialView();
    this.fetchItem();
  }

}
</script>

<template>
 <div class="page-header">
	<h2 class="text-left text-white">Dashboard</h2>
	<div class="form-group col-2 mt-2 mb-2">
		<label class="text-light mb-1">Sort By: </label>
		<select class="form-control" style="z-index: 100;" v-model="selectedItem" @change="changeSelect(selectedItem)">
			<option v-for="item in itemList" :key="item.id">{{ item.itemName }}</option>
		</select>
	</div>
	</div>
	
	<div class="container bg-light" >
		<Bar :data="chartData" :options="options" />
	</div>
	
</template>

<style scoped>

</style>