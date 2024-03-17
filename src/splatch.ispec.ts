import { expect } from 'expect';
import { splatch } from './splatch';

describe('splatch', () => {
    it('should splatch email section on an object', () => {
        const entry = {
            name: 'Jane Doe',
            email: 'jane@doe.com',
            business: {
                businessEmail: 'biz@izzy.com'
            }
        };
        const configs = {
            email: {
                fields: ['email', 'businessEmail']
            }
        };

        const result = splatch({ entry, configs });

        expect(result).toEqual({
            name: 'Jane Doe',
            email: 'j**e@**e.com',
            business: {
                businessEmail: '***@i**y.com'
            }
        });
    });

    it('should splatch email section using regex for email', () => {
        const entry = {
            name: 'Jane Doe',
            email: 'jane@doe.com',
            business: {
                businessEmail: 'biz@izzy.com'
            }
        };
        const configs = {
            email: {
                fields: [/email/]
            }
        };

        const result = splatch({ entry, configs });

        expect(result).toEqual({
            name: 'Jane Doe',
            email: 'j**e@**e.com',
            business: {
                businessEmail: '***@i**y.com'
            }
        });
    });

    it('should splatch email with custom config', () => {
        const entry = {
            name: 'Jane Doe',
            email: 'jane@doe.com',
            business: {
                businessEmail: 'biz@izzy.com'
            }
        };
        const configs = {
            email: {
                fields: [/email/],
                config: {
                    local: {
                        start: 2
                    }
                }
            }
        };

        const result = splatch({ entry, configs });

        expect(result).toEqual({
            name: 'Jane Doe',
            email: 'ja*e@**e.com',
            business: {
                businessEmail: 'bi*@i**y.com'
            }
        });
    });

    it('should splatch a card', () => {
        const entry = {
            name: 'Jane Doe',
            credit: '1234-5678-8765-1234',
            business: {
                debit: '0000-1111-2222-3333'
            }
        };
        const configs = {
            card: {
                fields: [/credit/, 'debit']
            }
        };

        const result = splatch({ entry, configs });

        expect(result).toEqual({
            name: 'Jane Doe',
            credit: '****-****-****-1234',
            business: {
                debit: '****-****-****-3333'
            }
        });
    });

    it('should splatch a card with custom filters', () => {
        const entry = {
            name: 'Jane Doe',
            credit: '1234-5678-8765-1234',
            business: {
                debit: '0000-1111-2222-3333'
            }
        };
        const configs = {
            card: {
                fields: [/credit/, 'debit'],
                config: {
                    sections: [
                        {
                            index: 0,
                            config: { start: 4 }
                        },
                        {
                            index: 3,
                            config: { start: 4 }
                        }
                    ]
                }
            }
        };

        const result = splatch({ entry, configs });

        expect(result).toEqual({
            name: 'Jane Doe',
            credit: '1234-****-****-1234',
            business: {
                debit: '0000-****-****-3333'
            }
        });
    });

    it('should splatch tokens', () => {
        const entry = {
            name: 'Jane Doe',
            token: '123e4567-e89b-12d3-a456-426614174000'
        };
        const configs = {
            token: {
                fields: ['token']
            }
        };

        const result = splatch({ entry, configs });

        expect(result).toEqual({
            name: 'Jane Doe',
            token: '********-****-****-****-426614174000'
        });
    });
});