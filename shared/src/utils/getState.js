const state = {
    counter: 0,
};

export const getState = () => {
    state.counter++;
    return JSON.stringify(state);
};
