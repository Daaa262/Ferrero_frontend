/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope

import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST || [])

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler)

registerRoute(navigationRoute)

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())

interface PushData {
  message?: string
}

self.addEventListener('push', (event: PushEvent) => {
  let data: PushData = {}

  if (event.data) {
    try {
      data = event.data.json()
    } catch (e) {
      data = { message: event.data.text() }
    }
  }

  const title = 'Powiadomienie'
  const options = {
    body: data.message || 'Masz nowe powiadomienie',
    icon: '/icon.png',
    badge: '/icon.png',
  }

  event.waitUntil(self.registration.showNotification(title, options))
})
