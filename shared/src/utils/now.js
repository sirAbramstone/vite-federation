import { foo } from 'shared/circ.xxx';

export const now = () => {
    foo();
    return new Date().toISOString();
};
