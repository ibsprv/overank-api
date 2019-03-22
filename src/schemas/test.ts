import { get, find, maxBy } from 'lodash';
import { gql } from 'apollo-server-express';

interface IExt {
    note: string;
    flag: boolean;
}

interface IUser {
    id: string;
    username: string;
    ext?: IExt;
}

const users: IUser[] = [
    {
        id: '1',
        username: 'Nazar Kulyk',
        ext: {
            note: 'test',
            flag: false,
        },
    },
    {
        id: '2',
        username: 'Lukas Käser',
        ext: {
            note: 'test2',
            flag: true,
        },
    },
    {
        id: '3',
        username: 'Steffen Karch',
    },
];

const schema = gql`
    type Query {
        users: [User!]
        me: User
        user(id: ID!): User
    }

    type Mutation {
        createUser(username: String!): User!
    }

    type User {
        id: ID!
        username: String!
        ext: Ext
    }

    type Ext {
        note: String!
        flag: Boolean!
    }
`;

const getNewId = () => get(maxBy(users, 'id'), 'id') + 1;

const resolvers = {
    Query: {
        me: () => find<IUser>(users, { id: '1' }),
        user: (parent: any, args: Partial<IUser>) => find<IUser>(users, args),
        users: () => [...users],
    },
    User: {
        ext: (user: IUser) => get(find(users, { id: user.id }), 'ext'),
    },
    Mutation: {
        createUser: (parent: any, { username }: { username: string }) => {
            const newUser: IUser = {
                username,
                id: getNewId(),
            };

            users.push(newUser);
            return newUser;
        },
    },
};

export const Test = { schema, resolvers };
