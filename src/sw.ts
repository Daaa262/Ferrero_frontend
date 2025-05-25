/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST || [])

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())

self.addEventListener('fetch', function (event) {
  console.log('fetch event for ', event)
})

self.addEventListener('message', function (event) {
  console.log('message event for ', event)
})

self.addEventListener('push', function (event) {
  console.log('push event for ', event)
})

self.addEventListener('sync', function (event) {
  console.log('sync event for ', event)
})

self.addEventListener('notificationclick', function (event) {
  console.log('notificationclick event for ', event)
})

self.addEventListener('notificationclose', function (event) {
  console.log('notificationclose event for ', event)
})

self.addEventListener('sync', function (event) {
  console.log('sync event for ', event)
})
