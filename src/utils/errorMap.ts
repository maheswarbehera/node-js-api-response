import * as CustomErrors from '../error/HttpErrorSubClass';
import ErrorDefinitions from '../utils/constants/error.constants';

type CustomErrorClass = new (...args: any[]) => Error;

export const errorCodeToClassMap: Record<string, CustomErrorClass> = {};

for (const key in ErrorDefinitions) {
    const errorCode = ErrorDefinitions[key].errorCode;
    const className = `${key
        .toLowerCase()
        .replace(/(?:^|_)(\w)/g, (_, c) => c.toUpperCase())}Error`;
    if ((CustomErrors as Record<string, CustomErrorClass>)[className]) {
        errorCodeToClassMap[errorCode] = (CustomErrors as Record<string, CustomErrorClass>)[className];
    }
}