<template>
    <div id="#app">
        <div>
            <h2>Facade app</h2>
            <div class="text-xsmall">wcore stateful module:</div>
            <pre class="p">{{ mfState }}</pre>
            <form class="inline-gaps mar-bot-l1" @submit.prevent="loadLibrary">
                <input
                    class="input input-small mar-right-2"
                    type="text"
                    placeholder="url"
                    v-model="state.library.name"
                    style="width: 8rem"
                />
                <input
                    class="input input-small mar-right-2"
                    type="text"
                    placeholder="component"
                    v-model="state.library.url"
                    style="width: 14rem"
                />
                <button class="btn btn-primary btn-small">load library</button>
                <button class="btn btn-secondary btn-small" v-if="state.library.ready" @click="log">log</button>
            </form>

            <div class="mar-bot-l1" v-if="state.library.loading || state.library.error">
                <div class="preloader" v-if="state.library.loading"></div>
                <div class="alert alert-error text-small pad-l1" v-if="state.library.error">
                    {{ state.library.error }}
                </div>
            </div>

            <template v-if="state.library.ready">
                <div class="inline-gaps mar-bot-l1" @submit.prevent="loadLibrary">
                    <select class="select select-small" v-model="state.preview.type" style="min-width: 10rem">
                        <option v-for="name in state.preview.types" :value="name" :key="name">{{ name }}</option>
                    </select>
                    <button class="btn btn-primary btn-small" :disabled="!state.preview.type" @click="resolve">
                        create component
                    </button>
                    <button
                        class="btn btn-primary btn-small"
                        :disabled="!state.preview.type"
                        @click="resolveCustomElement"
                    >
                        create customElement
                    </button>
                </div>

                <div class="sandbox">
                    <div>
                        <code class="text-xsmall">vue</code>
                        <div class="preview">
                            <component :is="state.preview.component" v-if="state.preview.component"></component>
                        </div>
                    </div>
                    <div>
                        <code class="text-xsmall">custom-element</code>
                        <div class="preview">
                            <div ref="manager" v-html="state.preview.customElementHtml"></div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue';
import { reverse } from 'lodash';
import { fetchLibrary } from './federation';
import { foo, bar } from 'wcore';
import { getState } from 'wcore/utils';

export default {
    setup() {
        const state = reactive({
            library: { name: 'myLibrary', url: 'http://localhost:4173/', loading: false, ready: false, error: null },
            preview: { type: '', types: [], component: null, customElementHtml: '' },
        });
        /** @type {import('./federation/index').RemoteLibraryRecord} */
        let libraryRecord = null;

        const log = () => {
            console.log(libraryRecord);
        };

        const loadLibrary = async () => {
            const { library, preview } = state;
            const { name, url } = library;
            library.loading = true;
            library.error = null;
            try {
                libraryRecord = await fetchLibrary({ name, url });
                library.error = null;
                library.ready = true;
                preview.types = [...libraryRecord.types];
            } catch (error) {
                library.error = error;
            } finally {
                library.loading = false;
            }
        };

        const resolve = () => {
            const { preview } = state;
            const { type } = preview;
            preview.component = libraryRecord.resolve({ type });
        };

        const resolveCustomElement = async () => {
            const { preview } = state;
            const { type } = preview;
            const ceName = await libraryRecord.resolveCustomElement({ type });
            preview.customElementHtml = `<${ceName}></${ceName}>`;
        };

        // just need to use lodash
        reverse([foo, bar]);

        return { state, mfState: getState(), loadLibrary, resolve, resolveCustomElement, log };
    },
};
</script>
<style>
html,
body {
    height: 100%;
}
#app {
    display: grid;
    height: 100vh;
    place-items: center;
}
.sandbox {
    display: grid;
    gap: 1rem;
}
.inline-gaps {
    display: flex;
    gap: 1rem;
}
.preview {
    padding: 1rem;
    border: 1px solid var(--color-border);
}
</style>
