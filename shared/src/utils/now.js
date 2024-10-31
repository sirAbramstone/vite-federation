import { foo } from 'shared/circ';

export const now = () => {
    foo();
    return new Date().toISOString();
};
