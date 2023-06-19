import { getPEPList } from "../src/services/pep";

describe('getPepList', () => {
    test('should return success true with data list', async () => {
        const result = await getPEPList();

        expect(result.success).toStrictEqual(true);
    });
})