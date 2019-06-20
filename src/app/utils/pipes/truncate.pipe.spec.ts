import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
    const pipe = new TruncatePipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('should return a string with ellipsis ', () => {
        const actual = pipe.transform('este es un dato corto', ['10']);
        expect(actual).toEqual('este es un...');
    });
    it('should return a string without ellipsis ', () => {
        const actual = pipe.transform('este es un dato cort', []);
        expect(actual).toEqual('este es un dato cort');
    });

});
