import { defineCustomElement } from 'vue';
// это не прокатило { shadowRoot:false } не работают слоты
// https://github.com/EranGrin/vue-web-component-wrapper?tab=readme-ov-file#usage-1
// import { defineCustomElementSFC } from 'vue-web-component-wrapper';

/**
 * @param {{ name:string }} options
 * @return {Pomise<import('vue').Component>}
 */
export const resolve = ({ type }) => import(`./src/components/${type}.vue`);

/**
 * @param {{ name:string }} options
 * @return {Promise<CustomElementConstructor>}
 */
export const resolveCustomElement = async ({ type }) => {
    const compModule = await import(`./src/components/${type}.vue`);
    /** @type {import('vue').ComponentOptions} */
    const compOpts = compModule?.default ?? compModule;

    return defineCustomElement(compOpts);
};

/**
 * @return {string[]}
 */
export const getTypes = () => ['Button', 'Tile'];
