import { ParsedField } from './ParsedField';
export class ParsedData {
    get jsonString() {
        return this._jsonString;
    }
    get fields() {
        return this._fields;
    }
    get fieldsByName() {
        return this._fieldsByName;
    }
    static fromJSON(json) {
        const data = new ParsedData();
        data._jsonString = JSON.stringify(json);
        data._fields = json.map(ParsedField.fromJSON);
        data._fieldsByName = data._fields.reduce((fieldsByName, field) => {
            fieldsByName[field.name] = field;
            return fieldsByName;
        }, {});
        return data;
    }
}
//# sourceMappingURL=ParsedData.js.map