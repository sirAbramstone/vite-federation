import dayjs from 'dayjs';

const state = {
    counter: 0,
};

export const getState = () => {
    state.counter++;
    return JSON.stringify(state);
};

export const now = () => dayjs().format();
