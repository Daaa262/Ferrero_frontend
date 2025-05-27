<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import HolidayView from '../components/holiday-view.vue'
import NamedayView from '../components/nameday-view.vue'
import { onMounted } from 'vue'

const username = ref('')
const password = ref('')

const router = useRouter()

async function login() {
  let response = null
  try {
    response = await axios.post('http://localhost:8080/api/login', {
      username: username.value,
      password: password.value,
    })
    if (response.data) {
      localStorage.setItem('JWTtoken', response.data)
      const decodedToken = JSON.parse(atob(response.data.split('.')[1]))

      if (Notification.permission === 'granted' && decodedToken.role >= 1) {
        const registration = await navigator.serviceWorker.ready
        const publicVapidKey = import.meta.env.VITE_PUBLIC_VAPID
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        })

        localStorage.setItem('subscriptionEndpoint', subscription.endpoint)

        await axios.post('http://localhost:8080/api/subscribe', subscription, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
      router.push('/main')
    }
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === axios.HttpStatusCode.Unauthorized
    ) {
      alert('Niepoprawne dane logowania')
    } else {
      alert('Wystąpił błąd podczas łączenia z bazą danych.')
    }
  }
}

onMounted(async () => {
  const token = localStorage.getItem('JWTtoken')
  if (!token) {
    if (localStorage.getItem('subscriptionEndpoint')) {
      await axios.post(
        'http://localhost:8080/api/unsubscribe',
        localStorage.getItem('subscriptionEndpoint'),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      localStorage.removeItem('subscriptionEndpoint')
    }
    return
  }
  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const expirationDate = new Date(decodedToken.exp * 1000)
  if (expirationDate < new Date()) {
    if (localStorage.getItem('subscriptionEndpoint')) {
      await axios.post(
        'http://localhost:8080/api/unsubscribe',
        localStorage.getItem('subscriptionEndpoint'),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      localStorage.removeItem('subscriptionEndpoint')
    }
    localStorage.removeItem('JWTtoken')
    return
  }
  router.push('/main')
})

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
</script>

<template>
  <div class="main-section">
    <div class="form-row">
      <label>Imie i nazwisko:</label>
      <input v-model="username" type="text" />
    </div>
    <div class="form-row">
      <label>Hasło:</label>
      <input v-model="password" type="password" />
    </div>
    <div class="button-row">
      <button @click="login">Zaloguj</button>
    </div>
    <br />
    <br />
    <HolidayView />
    <NamedayView />
  </div>
</template>

<style scoped>
.main-section {
  margin-top: 2vh;
  font-size: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.main-section button {
  font-size: 6vh;
  cursor: pointer;
  border-width: 1vh;
  margin-top: 5vh;
  padding: 1vh 0;
  font-weight: bold;
}

.main-section input {
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
