// ts-check
import { __federation_method_setRemote, __federation_method_getRemote } from '__federation__';
import { defineAsyncComponent, markRaw } from 'vue';
import ErrorState from './ErrorState.vue';
import LoadingState from './LoadingState.vue';

/** @type {Map<string, Promise<RemoteLibraryRecord>>} */
const remoteLibraryRegistry = new Map();

/**
 * @see https://github.com/originjs/vite-plugin-federation/discussions/193#discussioncomment-7182763
 */
/**
 * @typedef {object} RemoteLibraryRecord
 * @property {string} url
 * @property {string} name
 * @property {string[]} types
 * @property {({ type:string }) => import('vue').ComponentOptions} resolve
 * @property {({ type:string }) => string} resolveCustomElement
 * @property {{ components:Map<string, import('vue').AsyncComponentOptions>, customElements:Set<string> }} cache
 * @property {RemoteLibrary} library
 */
/**
 * @typedef {object} RemoteLibrary
 * @property {({ type:string }) => Promise<import('vue').Component>} resolve
 * @property {({ type:string }) => CustomElementConstructor} resolveCustomElement
 * @property {() => string[]} getTypes
 */

/** @type {CSSStyleSheet[]} */
let globalSheets = null;

const customElementsStylesheet = new CSSStyleSheet();
document.adoptedStyleSheets.push(customElementsStylesheet);

const CUSTOM_ELEMENT_PREFIX = 'widget';

/**
 * @param {ShadowRoot} shadowRoot
 */
const addGlobalStylesToShadowRoot = (shadowRoot) => {
    if (globalSheets === null) {
        globalSheets = Array.from(document.styleSheets).map((x) => {
            const sheet = new CSSStyleSheet();
            const css = Array.from(x.cssRules)
                .map((rule) => rule.cssText)
                .join(' ');
            sheet.replaceSync(css);
            return sheet;
        });
    }
    // @TODO проверять, если нет поддержки adoptedStyleSheets -> shadow.append() <style>
    shadowRoot.adoptedStyleSheets.push(...globalSheets);
};

/**
 * @param {CustomElementConstructor} Constructor
 * @return {CustomElementConstructor}
 */
const patchCustomElementConstructor = (Constructor) => {
    // shadow-dom говно, поэтому научим его в протекание global-css
    // https://github.com/WICG/webcomponents/issues/986
    // https://github.com/WICG/webcomponents/issues/909
    class ConstructorPatched extends Constructor {
        connectedCallback() {
            super.connectedCallback();
            addGlobalStylesToShadowRoot(this.shadowRoot);
        }
    }

    return ConstructorPatched;
};

/**
 * @param {{ name:string, url:string, library:RemoteLibrary }} options
 * @return {RemoteLibraryRecord}
 */
const createLibraryRecord = ({ name: libraryName, url, library }) => {
    const { resolve, resolveCustomElement, getTypes } = library;
    /** @type {Map<string, import('vue').AsyncComponentOptions>} */
    const components = new Map();
    const customElements = new Set();

    /** @type {RemoteLibraryRecord} */
    const record = {
        name: libraryName,
        url,
        types: getTypes(),
        resolve: ({ type }) => {
            if (components.has(type)) {
                return components.get(type);
            }
            const AsyncComp = markRaw(
                defineAsyncComponent({
                    loader: () => resolve({ type }),
                    loadingComponent: LoadingState,
                    errorComponent: ErrorState,
                    timeout: 5000,
                    delay: 0,
                })
            );
            components.set(type, AsyncComp);
            return AsyncComp;
        },
        resolveCustomElement: async ({ type }) => {
            const registry = window.customElements;
            const exportName = `${CUSTOM_ELEMENT_PREFIX}-${libraryName}-${type}`.toLocaleLowerCase();

            if (registry.get(exportName) != null) {
                return exportName;
            }

            const Constructor = await resolveCustomElement({ type });
            const ConstructorPatched = patchCustomElementConstructor(Constructor);
            registry.define(exportName, ConstructorPatched);
            customElements.add(exportName);
            customElementsStylesheet.insertRule(`${exportName} { display:contents !important; }`);
            return exportName;
        },
        cache: {
            components,
            customElements,
        },
        library,
    };

    return record;
};

/**
 * @param {{ name:string, url:string }} options
 * @return {Promise<RemoteLibraryRecord>}
 */
export const fetchLibrary = async ({ name = 'library', url }) => {
    const component = './exports';
    const urlPath = 'assets/remoteEntry.js';
    const urlFixed = url.includes(urlPath) ? url : [url, urlPath].join('');

    if (remoteLibraryRegistry.has(name)) {
        return remoteLibraryRegistry.get(name);
    }
    __federation_method_setRemote(name, {
        url: () => Promise.resolve(urlFixed), // http://localhost/assets/remoteEntry.js
        format: 'esm',
        from: 'vite',
    });

    const load = async () => {
        /** @type {RemoteLibrary} */
        const library = await __federation_method_getRemote(name, component); // esm-module пакета виджетов
        const record = createLibraryRecord({ name, url, library });
        return record;
    };

    remoteLibraryRegistry.set(name, load());

    return remoteLibraryRegistry.get(name);
};
