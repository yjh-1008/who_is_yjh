<template>
  <v-card :loading="loading" class="mx-auto my-12" width="70%" height="40vh">
    <v-container>
      <v-row>
        <v-col>
          <v-img
            cover
            height="40vh"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
        </v-col>
        <v-col class="mt-4">
          <v-card-item>
            <v-card-title
              ><div class="text-h3">Cafe Badilico</div></v-card-title
            >

            <v-card-subtitle>
              <span class="me-1">Local Favorite</span>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

            <div>
              Small plates, salads & sandwiches - an intimate setting with 12
              indoor seats plus patio seating.
            </div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-title>Tonight's availability</v-card-title>

          <div class="px-4">
            <v-chip-group v-model="selection">
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
const loading: Ref<boolean> = ref(false);
const selection: Ref<number> = ref(1);
// const height: Ref<number> = ref("40vh");
</script>
