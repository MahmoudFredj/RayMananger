const DbAccess = require('./dbAccess');
const customeParse = (data) => {
    const keys = Object.keys(data);
    const values = []
    for (let i = 0; i < keys.length; i++) values.push(data[keys[i]]);

    return { keys, values }
}

const parseKeysToString = (keys) => {
    if (!keys) return { names: null, exclamations: null };
    let names = '';
    let exclamations = '';
    for (let i = 0; i < keys.length - 1; i++) {
        names += ` ${keys[i]} , `;
        exclamations += ` ? , `;
    };

    names += `  ${keys[keys.length - 1]} `;
    exclamations += ` ? `;
    return { names, exclamations }
}

const operationParseKeysToString = (keys, op) => {
    let result = ''
    for (let i = 0; i < keys.length - 1; i++) result += ` ${keys[i]} = ? ${op} `;
    result += ` ${keys[keys.length - 1]} = ?`;
    return result;
}
class QueryManager extends DbAccess {
    constructor(tableName) {
        super();

        this.tableName = tableName;
    }

    selectAll = async () => {
        const query = `select * from ${this.tableName}`;
        try {
            const result = await this.offlineOperation(query);
            return result;
        } catch (e) {
            return false;
        }
    }

    selectFiltered = async (filters, selection) => {
        try {
            const parsed = customeParse(filters);
            const { names } = parseKeysToString(selection);
            let selectionNames = names;
            const filterNames = operationParseKeysToString(parsed.keys, 'and');
            let query = `select ${selection ? selectionNames : '*'} from ${this.tableName} where ${filterNames}`;
            const result = await this.onlineOperation(query, parsed.values);
            return result;
        } catch (e) {
            return false;
        }
    }

    insert = async (values) => {
        try {
            const parsed = customeParse(values);
            const { names, exclamations } = parseKeysToString(parsed.keys);
            let query = `insert into ${this.tableName} (${names} ) values ( ${exclamations} )`;

            const result = await this.onlineOperation(query, parsed.values);
            return result;
        } catch (e) {
            return false;
        }
    }

    update = async (values, filter) => {
        try {
            const parsedValues = customeParse(values);
            const parsedFilters = customeParse(filter);
            const valueSets = operationParseKeysToString(parsedValues.keys, ',');
            const filterSets = operationParseKeysToString(parsedFilters.keys, 'and');
            let query = `update ${this.tableName} set ${valueSets} where ${filterSets}`;
            const allValues = parsedValues.values.concat(parsedFilters.values);
            const result = await this.onlineOperation(query, allValues);
            return result;
        } catch (e) {
            return false;
        }
    }

    delete = async (filter) => {
        try {
            const parsedFilters = customeParse(filter);
            const filterSets = operationParseKeysToString(parsedFilters.keys, 'and');
            let query = `delete ${this.tableName} where ${filterSets}`;
            const result = await this.onlineOperation(query, parsedFilters.values);
            return result;

        } catch (e) {
            return false;
        }
    }

}

module.exports = QueryManager;