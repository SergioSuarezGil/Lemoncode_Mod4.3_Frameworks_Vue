<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const navBaseClass =
  'rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-[0.04em] transition'

const navLinkClass = (path) => {
  if (route.path === path) {
    return `${navBaseClass} border-slate-900 bg-slate-900 text-white`
  }

  return `${navBaseClass} border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900`
}
</script>

<template>
  <div class="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
    <header class="mb-6 flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
      <h1 class="text-3xl font-bold tracking-tight text-slate-800">Meal Planner App</h1>

      <nav class="flex flex-wrap gap-2">
        <RouterLink to="/" :class="navLinkClass('/')"> Plan semanal </RouterLink>
        <RouterLink to="/favoritos" :class="navLinkClass('/favoritos')">
          Platos favoritos
        </RouterLink>
      </nav>
    </header>

    <main class="flex flex-col">
      <RouterView />
    </main>
  </div>
</template>
