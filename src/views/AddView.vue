<script setup lang="ts">
import { ref } from 'vue'
import AddView from '../components/add-view.vue'
import MenuButton from '../components/menu-button.vue'
import axios from 'axios'
import { FetchStatus } from '../enums/status.ts'

const extinguisher = ref<string>('')
const expire = ref<string>('')
const fetchStatus = ref<FetchStatus>(FetchStatus.Loading)

function formatDate(dateStr: string): string | null {
  const parts = dateStr.split('.')
  if (parts.length !== 3) return null

  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)

  const date = new Date(year, month, day)

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null
  }

  return date.toISOString().slice(0, 10)
}

async function add() {
  const isoExpire = formatDate(expire.value)
  if (!isoExpire) {
    alert('Niepoprawny format daty. Użyj dd.mm.yyyy')
    return
  }

  try {
    if (extinguisher.value === '') {
      const response = await axios.post(
        `http://localhost:8080/api/add?expire=${isoExpire}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('JWTtoken')}`,
          },
        },
      )
      extinguisher.value = response.data
    } else {
      await axios.post(
        `http://localhost:8080/api/add?expire=${isoExpire}&customID=${extinguisher.value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('JWTtoken')}`,
          },
        },
      )
    }
    fetchStatus.value = FetchStatus.Success
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === axios.HttpStatusCode.Unauthorized) {
        fetchStatus.value = FetchStatus.Unauthorized
      } else if (error.response.status === axios.HttpStatusCode.BadRequest) {
        fetchStatus.value = FetchStatus.BadRequest
      }
    } else {
      fetchStatus.value = FetchStatus.Error
    }
  }
}
</script>

<template>
  <div class="form-section" v-if="fetchStatus === FetchStatus.Loading">
    <div class="form-row">
      <label>ID gaśnicy:</label>
      <label class="footnote">Pozostaw puste aby automatycznie przypisać kod</label>
      <input v-model="extinguisher" type="text" maxlength="10" />
    </div>
    <div class="form-row">
      <label>Data ważności:</label>
      <input v-model="expire" type="text" placeholder="dd.mm.yyyy" maxlength="10" />
    </div>
    <div class="button-row">
      <button @click="add">Dodaj</button>
    </div>
  </div>
  <AddView v-else :extinguisher="extinguisher" :expire="expire" :status="fetchStatus" />
  <MenuButton />
</template>

<style scoped>
.error {
  color: #ff0000;
}

.footnote {
  font-size: 2vh;
  color: #777777;
}

.form-section {
  margin-top: 2vh;
  font-size: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.form-section button {
  font-size: 6vh;
  cursor: pointer;
  border-width: 1vh;
  margin-top: 5vh;
  padding: 1vh 0;
  font-weight: bold;
}

.form-section input {
  font-size: 5vh;
  background-color: #ffffff;
  border-color: #000000;
  color: #000000;
  border-radius: 2vh;
  cursor: pointer;
  border-width: 1vh;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
  width: 40%;
}

.button-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
  text-align: center;
  justify-self: center;
  width: 30%;
}

@media (max-aspect-ratio: 1/1) {
  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 2vh;
    width: 80%;
  }

  .button-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 2vh;
    width: 80%;
  }
}
</style>
